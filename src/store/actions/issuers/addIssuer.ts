import { IStore } from "store/reducers/index.interface";
import { IMeta } from "store/reducers/issuers.interface";

import { ThunkActionWithArguments } from "./../index.interface";
import { ADD_ISSUER_INFO } from "../../types/issuers";
import httpClient from "services/httpClient";
import config from "config";

interface IDocFileInfo {
    description?: string;
    homepage_url?: string;
    source_url?: string;
}


export const addIssuer: ThunkActionWithArguments = (asset: string, isHttp = false) => async (
    dispatch,
    getState,
    socket
) => {
    const state = getState() as IStore;
    const docFileInfo: IDocFileInfo = {};

    const { issuers } = state;

    if (!issuers[asset] || ((issuers[asset].ts + 1000 * 60 * 24 * 7) < Date.now())) { // a week

        try {
            let author;

            if (isHttp) {
                author = await httpClient.getJoint(asset).then((joint: any) => joint.unit?.authors[0]?.address);
            } else {
                author = await socket.api.getJoint(asset).then((data: any) => data.joint.unit?.authors[0]?.address);
            }

            if (author) {
                let definition;

                if (isHttp) {
                    definition = await httpClient.getDefinition(author);
                } else {
                    definition = await socket.api.getDefinition(author);
                }

                let meta: IMeta = {};
                let getDocFileGetter = null;

                if (definition[0] && definition[0] === "autonomous agent") {
                    let address: string = author;

                    const baseAa = definition[1].base_aa;

                    if (definition[1]?.doc_url) {
                        getDocFileGetter = fetch(definition[1]?.doc_url).then((res) => res.json()).catch(() => null);
                    } else if (baseAa) {
                        let baseAaDefinition;

                        if (isHttp) {
                            baseAaDefinition = await httpClient.getDefinition(baseAa);
                        } else {
                            baseAaDefinition = await socket.api.getDefinition(baseAa);
                        }

                        if (baseAaDefinition[0] && baseAaDefinition[0] === "autonomous agent" && baseAaDefinition[1]?.doc_url) {
                            getDocFileGetter = fetch(baseAaDefinition[1]?.doc_url)
                                .then((res) => res.json())
                                .catch(() => null);

                            address = baseAa;
                        }
                    }

                    const metaGetters = [];

                    if (config.PREDICTION_MARKET_BASE_AAS.includes(baseAa) && !config.TESTNET) {

                        metaGetters.push(
                            fetch(`https://prophet.ooo/api/market/${author}`)
                                .then(async (data) => {
                                    const marketData = await data.json();

                                    meta.viewLink = marketData.marketUrl;
                                    meta.viewLabel = `Prophet prediction markets: ${marketData.eventText}`;
                                })
                                .catch(() => null)
                        );
                    }

                    const [docFile] = await Promise.all([getDocFileGetter, ...metaGetters]);

                    if (docFile) {
                        docFileInfo.description = docFile.description;
                        docFileInfo.homepage_url = docFile.homepage_url;
                        docFileInfo.source_url = docFile.source_url;

                        dispatch({
                            type: ADD_ISSUER_INFO,
                            payload: { asset, ts: Date.now(), issuerInfo: { address, homepage_url: docFile.homepage_url, description: docFile.description, source_url: docFile.source_url, meta, isAa: true } },
                        });
                    }
                } else {
                    dispatch({
                        type: ADD_ISSUER_INFO,
                        payload: { asset, issuerInfo: { address: author, isAa: false }, ts: Date.now() },
                    });
                }
            }

        } catch (err) {
            console.log("Error: ", err);
        }
    }
};
