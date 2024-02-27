import axios from "axios";

/**
 * Ethereum Scan
 * @dev provider: 메인넷(https://api.polygonscan.com/api
 */
class EthereumScan {
  private baseUrl: string;
  private apiKey: string;

  constructor(provider: string, apiKey: string) {
    this.baseUrl = provider;
    this.apiKey = apiKey;
  }

  /**
   * 계정의 트랜잭션을 가져온다.
   * @param address
   * @param startBlock
   * @param endBlock
   * @param page
   * @param offset
   * @param sort
   * @returns
   */
  public async getTxListByAccount(
    address: string,
    startBlock: number,
    endBlock: number,
    page: number,
    offset: number,
    sort: "DESC" | "ASC"
  ) {
    const url = `${this.baseUrl}?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;

    const res = await axios.get(url);

    return res.data.result;
  }

  /**
   * 계정의 내부 트랜잭션을 가져온다.
   * @param address
   * @param startblock
   * @param endblock
   * @param page
   * @param offset
   * @param sort
   * @returns
   */
  public async getInternalTxInfoByAccount(
    address: string,
    startblock: number,
    endblock: number,
    page: number,
    offset: number,
    sort: "DESC" | "ASC"
  ) {
    const url = `${this.baseUrl}?module=account&action=txlistinternal&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;
    const res = await axios.get(url);

    return res.data.result;
  }

  /**
   * txHash의 내부 트랜잭션을 가져온다.
   * @param txHash
   * @returns
   */
  public async getInternalTxInfoByTxHash(txHash: string) {
    const url = `${this.baseUrl}?module=account
    &action=txlistinternal
    &txhash=${txHash}
    &apikey=${this.apiKey}`;
    const res = await axios.get(url);

    return res.data.result;
  }

  /**
   * 계정의 토큰 전송 내역을 가져온다.
   * @param contract
   * @param account
   * @param page
   * @param offset
   * @param startBlock
   * @param endBlock
   * @param sort
   * @returns
   */
  public async getTokenTx(
    contract: string,
    account: string,
    page: number,
    offset: number,
    startBlock: number,
    endBlock: number,
    sort: "DESC" | "ASC"
  ) {
    const url = `${this.baseUrl}?module=account&action=tokentx&contractaddress=${contract}&address=${account}&page=${page}&offset=${offset}&startblock=${startBlock}&endblock=${endBlock}&sort=${sort}&apikey=${this.apiKey}`;
    const res = await axios.get(url);

    return res.data.result;
  }
}

export default EthereumScan;
