import { Coins, LCDClient } from "@xpla/xpla.js";
import { AllNftInfoResponse } from "./interface/xpla-nft.interface";

/**
 * Xpla Nft
 * @dev url: 메인넷(https://dimension-lcd.xpla.dev), 테스트넷(https://cube-lcd.xpla.dev)
 * @dev chainId: 메인넷(dimension_37-1), 테스트넷(cube_47-5)
 */
class XplaNft {
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
   * NFT에 대한 모든 정보를 가져온다.
   * @param contractAddress 
   * @param tokenId 
   * @returns AllNftInfoResponse
   */
  public async getAllNftInfo(
    contractAddress: string,
    tokenId: string
  ): Promise<AllNftInfoResponse> {
    const query = {
      all_nft_info: {
        token_id: tokenId,
      },
    };

    return await this.lcd.wasm.contractQuery(contractAddress, query);
  }
}

export default XplaNft;
