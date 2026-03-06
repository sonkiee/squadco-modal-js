const SCRIPT_URL = "https://checkout.squadco.com/widget/squad.min.js";

let loading: Promise<void> | null = null;

/**
 * Dynamically load Squad checkout script
 */
export function loadSquadScript(): Promise<void> {
  // Already loaded
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    if ((window as any).squad) return resolve();

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;

    script.onload = () => {
      console.log("Script loaded, waiting for squad constructor...");
      // Poll for Squad to exist
      const start = Date.now();
      const interval = setInterval(() => {
        if ((window as any).squad) {
          clearInterval(interval);
          console.log("'squad' constructor found:", (window as any).squad);
          resolve();
        } else if (Date.now() - start > 5000) {
          clearInterval(interval);
          reject(new Error("Squad did not initialize after script load"));
        }
      }, 50);
    };

    script.onerror = () => reject(new Error("Failed to load Squad script"));
    document.body.appendChild(script);
  });
  return loading;
}
