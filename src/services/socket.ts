import obyte from "obyte";
import config from "../config";
import { store } from "../index";
import { getData } from "store/actions/data/getData";

const client: obyte.Client = new obyte.Client(
  `wss://obyte.org/bb${config.TESTNET ? "-test" : ""}`,
  {
    testnet: config.TESTNET,
    reconnect: true,
  }
);

client.onConnect(() => {
  store.dispatch(openConnection());

  store.dispatch(getData(true));
  const heartbeat = setInterval(function () {
    client?.api.heartbeat();
  }, 10 * 1000);

  const updateData = setInterval(() => store.dispatch(getData()), 1000 * 60);

  client?.client?.ws?.addEventListener("close", () => {
    store.dispatch(closeConnection());
    clearInterval(heartbeat);
    clearInterval(updateData);
  });
});

const openConnection = () => ({ type: "OPEN_CONNECTION" });
const closeConnection = () => ({ type: "CLOSE_CONNECTION" });

export default client;
