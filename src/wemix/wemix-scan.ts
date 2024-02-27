import axios from "axios";

/**
 * Wemix Scan
 * @dev provider: 메인넷(https://explorerapi.wemix.com), 테스트넷(https://explorerapi.test.wemix.com)
 */
class WemixScan {
  private baseUrl: string;
  private apiKey = process.env.WEMIX_SCAN_API_KEY;

  constructor(provider: string) {
    this.baseUrl = provider;
  }

  /**
   * 계정의 내부 트랜잭션을 가져온다.
   * @param address
   * @returns
   */
  public async getInternalTxInfoByAccount(address: string) {
    const url = `${this.baseUrl}/v1/accounts/${address}/internal-transactions`;
    const res = await axios.get(url);

    return res.data.results;
  }

  /**
   * 계정의 토큰 이동 내역을 가져온다.
   * @param address
   * @returns
   */
  public async getTokenTransferByAccount(address: string) {
    const url = `${this.baseUrl}/v1/accounts/${address}/token-transfer/erc20`;
    const res = await axios.get(url);

    return res.data.results;
  }

  /**
   * 계정의 NFT 이동 내역을 가져온다.
   * @param address
   * @returns
   */
  public async getNftTransferByAccount(address: string) {
    const url = `${this.baseUrl}/v1/accounts/${address}/token-transfer/erc721`;
    const res = await axios.get(url);

    return res.data.results;
  }

  /**
   * 내부 트랜잭션을 가져온다.
   * @param txHash
   * @returns
   */
  public async getInternalTxInfo(txHash: string) {
    const url = `${this.baseUrl}/v1/transactions/${txHash}/internal-transactions`;
    const res = await axios.get(url);

    return res.data.results;
  }
}

export default WemixScan;
