/**
 * React hook to open Squad checkout
 */

import { checkout } from "./checkout";
import { SquadCheckoutResponse, SquadParameters } from "./types";

export function useSquadCheckout() {
  const pay = async (
    config: SquadParameters,
  ): Promise<SquadCheckoutResponse> => {
    return await checkout(config);
  };

  return { pay };
}
