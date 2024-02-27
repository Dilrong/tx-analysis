import { Coins, LCDClient } from "@xpla/xpla.js";
import { AllNftInfoResponse } from "./interface/xpla-nft.interface";
import {
  BalanceResponse,
  TokenInfoResponse,
} from "./interface/xpla-token.interface";

/**
 * Xpla Token
 * @dev url: 메인넷(https://dimension-lcd.xpla.dev), 테스트넷(https://cube-lcd.xpla.dev)
 * @dev chainId: 메인넷(dimension_37-1), 테스트넷(cube_47-5)
 */
class XplaToken {
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
   * 주소가 가지고 있는 토큰 수량을 가져온다.
   * @param contractAddress 
   * @param accAddress 
   * @returns BalanceResponse
   */
  public async getBalance(
    contractAddress: string,
    accAddress: string
  ): Promise<BalanceResponse> {
    const query = {
      balance: {
        address: accAddress,
      },
    };

    return await this.lcd.wasm.contractQuery(contractAddress, query);
  }

  /**
   * 토큰 정보를 가져온다.
   * @param contractAddress 
   * @returns TokenInfoResponse
   */
  public async getTokenInfo(
    contractAddress: string
  ): Promise<TokenInfoResponse> {
    const query = {
      token_info: {},
    };

    return await this.lcd.wasm.contractQuery(contractAddress, query);
  }
}

export default XplaToken;
