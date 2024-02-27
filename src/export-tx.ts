import fs from "fs";
import XplaApi from "./xpla/xpla-api";
import EthereumApi from "./ethereum/ethereum-api";
import EthereumScan from "./ethereum/ethereum-scan";
import timeStampToDate from "./utils/timestamp-to-date";
import KlaytnApi from "./klaytn/klaytn-api";
import WemixScan from "./wemix/wemix-scan";
import XplaNft from "./xpla/xpla-nft";

interface IExportTx {
  txHash: string;
  height: string;
  timestamp: Date;
  msg: string;
}

/**
 * xpla Tx를 json 형태로 내보낸다.
 * @dev `./exports/xpla-txs.json`으로 생성된다.
 */
export async function exportTxByXpla(): Promise<void> {
  const xplaApi = new XplaApi();

  const marketAddress = process.env.XPLA_DEX_ADDRESS;
  const txList = await xplaApi.getTxListByAccount(marketAddress!, 1, 100);

  const exportTxList: IExportTx[] = [];
  txList.map((tx, index) => {
    const data = {
      txHash: tx.txhash,
      height: tx.height,
      timestamp: timeStampToDate(tx.timestamp),
      msg: JSON.stringify(tx.tx.body.messages[0].msg),
    };

    exportTxList.push(data);
  });

  const jsonString = JSON.stringify(exportTxList, null, 2);
  fs.writeFileSync("./exports/xpla-txs.json", jsonString, "utf-8");
}

/**
 * polygon Tx를 json 형태로 내보낸다.
 * @dev `./exports/polygon-txs.json`으로 생성된다.
 */
export async function exportTxByPolygon(): Promise<void> {
  const polygonApi = new EthereumApi(process.env.POLYGON_PROVIDER!);
  const polygonScan = new EthereumScan(process.env.POLYGON_SCAN!, process.env.POLYGON_API_KEY!);
  
  const blockNumber = await polygonApi.getLatestBlockNumber();
  const address = process.env.POLYGON_COSMOS_ADDRESS;
  const txList = await polygonScan.getTxListByAccount(address!, 0, parseInt(blockNumber), 1, 100, 'DESC') as any[];

  const exportTxList: IExportTx[] = [];
  txList.map((tx, index) => {
    const data = {
      txHash: tx.hash,
      height: tx.blockNumber,
      timestamp: timeStampToDate(tx.timeStamp),
      msg: tx.functionName
    };

    exportTxList.push(data);
  })

  const jsonString = JSON.stringify(exportTxList, null, 2);
  fs.writeFileSync("./exports/polygon-txs.json", jsonString, "utf-8");
}

/**
 * klaytn Tx를 json 형태로 내보낸다.
 * @dev `./exports/klaytn-txs.json`으로 생성된다.
 */
export async function exportTxByKlaytn(): Promise<void> {
  const klaytnApi = new KlaytnApi(process.env.KLAYTN_PROVIDER!);

  const address = process.env.KLAYTN_CONRACT_ADDRESS;
  const txList = await klaytnApi.getTxListByAccount(process.env.KLAYTN_SCAN!, address!)

  const exportTxList: IExportTx[] = [];
  for (const tx of txList) {
    const data = {
      txHash: tx.txHash,
      height: tx.blockNumber,
      timestamp: timeStampToDate(tx.createdAt),
      msg: JSON.stringify(tx.methodName),
    };

    exportTxList.push(data);
  }

  const jsonString = JSON.stringify(exportTxList, null, 2);
  fs.writeFileSync("./exports/klaytn-txs.json", jsonString, "utf-8");
}

/**
 * XPLA 붕어빵 NFT Tx를 json 형태로 내보낸다.
 * @dev `./exports/bop-txs.json`으로 생성된다.
 */
export async function exportBopNft() {
  
  const xplaNft = new XplaNft();

  // @dev: 리빌 붕어빵(3_BungoPangR_#${i})
  // @dev: 미리빌 붕어빵(3_BungoPang_#${i})
  const exportTxList: any[] = [];
  for (let i = 0; i < 10001; i++) {
    try {
      const getAllNftInfo = await xplaNft.getAllNftInfo(process.env.XPLA_BOP_ADDRESS!, `3_BungoPang_#${i}`);
      const data = {
        serial: `3_BungoPang_#${i}`,
        owner: `${getAllNftInfo.access.owner}`
      }
      exportTxList.push(data);
    } catch(e) {
    }
  }

  const jsonString = JSON.stringify(exportTxList, null, 2);
  fs.writeFileSync("./exports/bop-txs.json", jsonString, "utf-8");
}