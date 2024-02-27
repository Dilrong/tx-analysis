import axios from "axios";
import Caver, { Block, TransactionForRPC } from "caver-js";

/**
 * KlaytnApi
 * @dev provider: 메인넷(https://public-en-cypress.klaytn.net), 테스트넷(https://public-en-baobab.klaytn.net)
 */
class KlaytnApi {
  private lcd: Caver;

  constructor(provider: string) {
    this.lcd = new Caver(provider);
  }

  /**
   * 가스가격을 가져온다.
   * @returns string
   */
  public async getGasPrices(): Promise<string> {
    const gasPrice = await this.lcd.rpc.klay.getGasPrice();

    return gasPrice;
  }

  /**
   * 트랜잭션 정보를 가져온다.
   * @param txHash
   * @returns
   */
  public async getTxInfo(txHash: string): Promise<TransactionForRPC> {
    const txInfo = await this.lcd.rpc.klay.getTransactionByHash(txHash);

    return txInfo!;
  }

  /**
   * 블록정보를 가져온다.
   * @param height
   * @returns Block
   */
  public async getBlockInfo(height: number): Promise<Block> {
    const blockInfo = await this.lcd.rpc.klay.getBlockByNumber(height);

    return blockInfo;
  }

  /**
   * 트랜잭션에 해당하는 익스플로어 링크를 가져온다.
   * @param txHash
   * @returns explorer link
   */
  public getTxLink(txHash: string): string {
    return `https://klaytnscope.com/tx/${txHash}`;
  }

  /**
   * 계정(컨트랙트 포함)에 해당하는 트랜잭션 정보를 가져온다.
   * @param baseUrl 메인넷(https://api-cypress.klaytnscope.com)
   * @param address
   * @param page
   */
  public async getTxListByAccount(
    baseUrl: string,
    address: string,
    page: number = 1
  ): Promise<any[]> {
    const url = `${baseUrl}/v2/accounts/${address}/txs?page=${page}`;
    const txList = await axios.get(url);

    // TODO: interface 만들기
    return txList.data.result;
  }
}

export default KlaytnApi;
