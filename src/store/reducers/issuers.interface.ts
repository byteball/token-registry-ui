export interface IIssuersStore {
    [key: string]: IIssuersStoreItem;
}

export interface IMeta {
    issuerLink?: string;
    issuerLabel?: string;
}

export interface IIssuersStoreItem extends IIssuer {
    ts: number;
}

export interface IIssuer {
    address: string;
    isAa: boolean;
    description?: string;
    homepage_url?: string;
    source_url?: string;
    meta?: IMeta;
}
