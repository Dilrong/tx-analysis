import axios from "axios";

/**
 * Wemix Api
 * @dev provider: 메인넷(https://explorerapi.wemix.com), 테스트넷(https://explorerapi.test.wemix.com)
 */
class WemixApi {
  private baseUrl: string;
  private apiKey = process.env.WEMIX_API_KEY;

  constructor(provider: string) {
    this.baseUrl = provider;
  }
}

export default WemixApi;
