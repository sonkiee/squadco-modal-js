import { emitter } from "./events";
import { loadSquadScript } from "./loader";
import { SquadCheckoutResponse, SquadParameters } from "./types";

/**
 * Opens Squad payment modal
 */
export async function checkout(
  config: SquadParameters,
): Promise<SquadCheckoutResponse> {
  // Ensure script is loaded and SquadPay is available
  await loadSquadScript();
  console.log("Window after load:", window);
  console.log("Squad:", (window as any).squad);

  // Detect the constructor exposed by the script

  const SquadConstructor = (window as any).squad;
  if (!SquadConstructor) {
    throw new Error("Squad constructor is not available");
  }

  return new Promise((resolve, reject) => {
    try {
      const instance = new SquadConstructor({
        ...config,
        onLoad: () => {
          config.onLoad?.();
          emitter.emit("payment.loaded");
        },
        onClose: () => {
          config.onClose?.();
          emitter.emit("payment.closed");
          reject(new Error("Payment closed"));
        },

        callback: (data: any) => {
          config.onSuccess?.(data);
          emitter.emit("payment.success", data);
          resolve(data);
        },
      });

      instance.setup();
      instance.open();
    } catch (error) {
      reject(error);
    }
  });
}
