require("dotenv").config();
import EthereumApi from "./ethereum/ethereum-api";
import {
  exportBopNft,
  exportTxByKlaytn,
  exportTxByPolygon,
  exportTxByWemix,
  exportTxByXpla,
} from "./export-tx";

async function main() {
  // exportTxByXpla();
  // exportTxByPolygon();
  // exportTxByKlaytn();
  // exportTxByWemix();
  // exportBopNft()
}

main();
