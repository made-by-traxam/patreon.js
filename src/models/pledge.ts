import { User } from "./user";

/**
 * A pledge data object.
 * 
 * @see https://docs.patreon.com/#pledge API documentation
 */
export class Pledge {
  /**
   * The type of Pledge objects is `pledge`. 
   */
  readonly type: string = 'pledge';
  /**
   * Identifying number of this pledge.
   */
  id: string;
  amountCents: number;
  createdAt: Date;
  /**
   * Indicates the date of the most recent payment if it failed, or `null` if
   * the most recent payment succeeded. A pledge with a non-null declined_since
   * should be treated as invalid.
   */
  declinedSince?: Date;
  pledgeCapCents: number;
  patronPaysFees: boolean;
  /**
   * Indicates the lifetime value this patron has paid to the campaign.
   * 
   * Is null if this value was not requested explicitly.
   */
  totalHistoricAmountCents?: number;
  /**
   * Is null if this value was not requested explicitly.
   */
  isPaused?: boolean;
  /**
   * Is null if this value was not requested explicitly.
   */
  hasShippingAddress?: boolean;

  patron: User;
  reward: unknown;
  creator: User;
  address: unknown;

  /**
   * Checks if the pledge is invalid.
   * @returns `true` if the most recent payment was declined and `false` otherwise.
   */
  isInvalid(): boolean {
    return this.declinedSince !== null;
  }
}