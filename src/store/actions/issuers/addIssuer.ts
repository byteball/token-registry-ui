import { IStore } from "store/reducers/index.interface";
import { ThunkActionWithArguments } from "./../index.interface";
import { ADD_ISSUER_INFO } from "../../types/issuers";

interface IDocFileInfo {
    description?: string;
    homepage_url?: string;
    source_url?: string;
}


export const addIssuer: ThunkActionWithArguments = (asset: string) => async (
    dispatch,
    getState,
    socket
) => {
    const state = getState() as IStore;
    const docFileInfo: IDocFileInfo = {};

    const { issuers } = state;

    if (!issuers[asset] || ((issuers[asset].ts + 1000 * 60 * 24 * 7) < Date.now())) { // a week

        try {
            const author = await socket.api.getJoint(asset).then((data: any) => data.joint.unit?.authors[0]?.address);

            if (author) {
                const definition = await socket.api.getDefinition(author);
                let docFile;


                if (definition[0] && definition[0] === "autonomous agent") {
                    let address: string = author;

                    const baseAa = definition[1].base_aa;

                    if (definition[1]?.doc_url) {
                        docFile = await fetch(definition[1]?.doc_url).then((res) => res.json()).catch(() => null);
                    } else if (baseAa) {
                        const baseAaDefinition = await socket.api.getDefinition(baseAa);

                        if (baseAaDefinition[0] && baseAaDefinition[0] === "autonomous agent" && baseAaDefinition[1]?.doc_url) {
                            docFile = await fetch(baseAaDefinition[1]?.doc_url).then((res) => res.json()).catch(() => null);
                            address = baseAa;
                        }
                    }

                    if (docFile) {
                        docFileInfo.description = docFile.description;
                        docFileInfo.homepage_url = docFile.homepage_url;
                        docFileInfo.source_url = docFile.source_url;

                        dispatch({
                            type: ADD_ISSUER_INFO,
                            payload: { asset, ts: Date.now(), issuerInfo: { address, homepage_url: docFile.homepage_url, description: docFile.description, source_url: docFile.source_url, isAa: true } },
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