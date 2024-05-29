class Client {
    hubAddress: string;
    request: (path: string, body: any) => Promise<any>;
    witnesses: string[] | null;
    
    constructor({ hubAddress, testnet = false }: { hubAddress?: string, testnet?: boolean }) {
        if (hubAddress) {
            this.hubAddress = hubAddress;
        } else {
            if (testnet) {
                this.hubAddress = "https://testnet.obyte.org/api";
            } else {
                this.hubAddress = "https://obyte.org/api";
            }
        }

        this.witnesses = null;

        this.request = async (path: string, body = {}) => {
            const response = await fetch(`${this.hubAddress}/${path}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "post",
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorBody = await response.text();
                let errorObject: any = {};

                try {
                    errorObject = errorBody && JSON.parse(errorBody);
                } catch { }

                if (errorObject && ("error" in errorObject)) {
                    throw new Error(errorObject.error);
                } else {
                    throw new Error("unknown error");
                }
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            } else {
                return data?.data;
            }
        };
    }

    async getJoint(unit: string) {
        const { joint } = await this.request("get_joint", {
            unit
        });
        return joint;
    }

    async getDefinition(address: string) {
        return await this.request("get_definition", { address });
    }

    async getAaStateVars(address: string, var_prefix?: string, var_prefix_from?: string) {
        return await this.request("get_aa_state_vars", { address, var_prefix, var_prefix_from });
    }
}


export default new Client({
  testnet: false
});