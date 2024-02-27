require("dotenv").config();
import axios from "axios";
import {
  BlockInfo,
  CodeInfo,
  Coins,
  ContractInfo,
  LCDClient,
  TxInfo,
} from "@xpla/xpla.js";

/**
 * Xpla Api
 * @dev url: 메인넷(https://dimension-lcd.xpla.dev), 테스트넷(https://cube-lcd.xpla.dev)
 * @dev chainId: 메인넷(dimension_37-1), 테스트넷(cube_47-5)
 */
class XplaApi {
  private lcd: LCDClient;

  constructor(
    url: string = process.env.XPLA_URL!,
    chainId: string = process.env.XPLA_CHAIN_ID!,
    gasPricesCoins: Coins.Input = process.env.XPLA_GAS_PRICES_COINS!,
    gasAdjustment: string = process.env.XPLA_GAS_ADJUSTMENT!
  ) {
    this.lcd = new LCDClient({
      URL: url,
      chainID: chainId,
      gasPrices: gasPricesCoins,
      gasAdjustment: gasAdjustment,
    });
  }

  /**
   * 가스 가격을 가져온다.
   * @returns Coins
   */
  public async getGasPrices(): Promise<Coins> {
    const gasPrices = await axios.get(
      "https://cube-fcd.xpla.dev/v1/txs/gas_prices"
    );
    const gasPricesJson = await gasPrices.data.json();
    const gasPricesCoins = new Coins(gasPricesJson);

    return gasPricesCoins;
  }

  /**
   * 트랜잭션 정보를 가져온다.
   * @param txHash
   * @returns txInfo
   */
  public async getTxInfo(txHash: string): Promise<TxInfo> {
    const txInfo = await this.lcd.tx.txInfo(txHash);

    return txInfo;
  }

  /**
   * 블록에 담긴 트랜잭션 정보를 가져온다.
   * @param height 블록높이
   * @returns TxInfo[]
   */
  public async getTxInfosByBlock(height: number): Promise<TxInfo[]> {
    const txInfoList = await this.lcd.tx.txInfosByHeight(height);

    return txInfoList;
  }

  /**
   * 블록정보를 가져온다.
   * @param height 높이
   * @returns BlockInfo
   */
  public async getBlockInfo(height: number): Promise<BlockInfo> {
    const block = await this.lcd.tendermint.blockInfo(height);

    return block;
  }

  /**
   * 트랜잭션에 해당하는 익스플로어 링크를 가져온다.
   * @param txHash
   * @param chainId
   * @returns explorer link
   */
  public getTxLink(txHash: string, chainId: string): string {
    return `https://explorer.xpla.io/${chainId}/tx/${txHash}`;
  }

  /**
   * 코드정보를 가져온다.
   * @param codeId
   * @returns CodeInfo
   */
  public async getCodeId(codeId: number): Promise<CodeInfo> {
    const codeInfo = this.lcd.wasm.codeInfo(codeId);

    return codeInfo;
  }

  /**
   * 컨트랙트 정보를 가져온다.
   * @param address
   * @returns ContractInfo
   */
  public async getContractInfo(address: string): Promise<ContractInfo> {
    const contractInfo = await this.lcd.wasm.contractInfo(address);

    return contractInfo;
  }

  /**
   * 계정(컨트랙트 포함)에 해당하는 트랜잭션 정보를 가져온다.
   * @param baseUrl
   * @param chainId
   * @param address
   * @param page
   * @param limit
   * @param order
   * @param isEvm
   * @returns
   */
  public async getTxListByAccount(
    address: string,
    page: number = 1,
    limit: number = 25,
    order: "DESC" | "ASC" = "DESC",
    isEvm: boolean = false
  ): Promise<any[]> {
    const url = `${process.env.XPLA_FCD_URL}/v1/tx_page?chainId=${process.env.XPLA_CHAIN_ID}&account=${address}&page=${page}&limit=${limit}&order=${order}&evm=${isEvm}`;
    const txList = await axios.get(url);

    // TODO: interface 만들기
    return txList.data.txs;
  }
}

export default XplaApi;
