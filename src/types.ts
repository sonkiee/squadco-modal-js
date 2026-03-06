/**
 * Parameters to initialize a Squad payment transaction
 */
export interface SquadParameters {
  /** Squad public key */
  key: string;

  /** Customer email (required) */
  email: string;

  /** Customer full name (optional) */
  customer_name?: string;

  /** Amount to debit in the smallest currency unit (required) */
  amount: number;

  /** Currency code (required) */
  currency_code: "NGN" | "USD";

  /** Optional transaction reference. If not passed, Squad will generate one */
  transaction_ref?: string;

  /** Optional array of allowed payment channels */
  payment_channels?: Array<"card" | "bank" | "ussd" | "transfer">;

  /** Optional callback URL */
  callback_url?: string;

  /** Optional metadata object for custom fields */
  metadata?: Record<string, any>;

  /** Whether to pass charge to customer. Default is false */
  pass_charge?: boolean;

  /** Callback when modal successfully loads */
  onLoad?: () => void;

  /** Callback when payment is successful */
  onSuccess?: (data: SquadCheckoutResponse) => void;

  /** Callback when modal closes without payment */
  onClose?: () => void;
}

/**
 * Response returned on payment success
 */
export interface SquadCheckoutResponse {
  transaction_ref: string;
  status: "success" | "failed" | "pending";
  [key: string]: any; // includes additional metadata or returned fields
}
