import Web3 from "web3";
import { ENS } from "web3-eth-ens";

/**
 * Ethereum Api
 * @dev 이더리움 계열 같이 사용 (폴리곤, 아비트럼, 옵티미즘 등)
 * @dev provider: https://chainlist.org에서 rpc 확인
 */
class EthereumApi {
  private lcd: Web3;

  constructor(provider: string) {
    this.lcd = new Web3(provider);
  }

  /**
   * 최신 블록넘버를 가져온다.
   * @returns 
   */
  public async getLatestBlockNumber(): Promise<string> {
    const block = await this.lcd.eth.getBlockNumber();

    return block.toString();
  }

  /**
   * 트랜잭션 정보를 가져온다.
   * @param txHash
   * @returns
   */
  public async getTxInfo(txHash: string) {
    const txInfo = await this.lcd.eth.getTransaction(txHash);

    return txInfo;
  }

  /**
   * 블록정보를 가져온다.
   * @param height
   * @returns
   */
  public async getBlockInfo(height: number) {
    const blockInfo = await this.lcd.eth.getBlock(height);

    return blockInfo;
  }

  /**
   * (폴리곤) 트랜잭션에 해당하는 익스플로어 링크를 가져온다.
   * @param txHash
   * @returns explorer link
   */
  public getTxLinkForPolygon(txHash: string): string {
    return `https://polygonscan.com/tx/${txHash}`;
  }

  /**
   * ens주소를 일반주소로 변환한다.
   * @param provider
   * @param address
   * @returns
   */
  public async convertEnsToAddress(provider: string, address: string) {
    const ens = new ENS(undefined, provider);
    const account = await ens.getAddress(address);

    return account;
  }
}

export default EthereumApi;
