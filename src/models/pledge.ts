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
  /**
   * The amount of this pledge in cents.
   */
  amount: number;
  /**
   * Datetime this pledge was created.
   */
  createdAt: Date;
  /**
   * Indicates the date of the most recent payment if it failed, or `null` if
   * the most recent payment succeeded. A pledge with a non-null declined_since
   * should be treated as invalid.
   */
  declinedSince?: Date;
  /**
   * Pledge cap in cents.
   */
  pledgeCap: number;
  patronPaysFees: boolean;
  /**
   * Indicates the lifetime value this patron has paid to the campaign,
   * in cents.
   * 
   * Is null if this value was not requested explicitly.
   */
  totalHistoricalAmount?: number;
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

  /**
   * Parses a ReST data API object into a Pledge object.
   * @param source rest data API object.
   */
  static parse(data: any): Pledge {
    var att = data.attributes;
    
    const pledge = new Pledge();
    pledge.id = data.id;
    pledge.amount = att.amount_cents;
    pledge.createdAt = new Date(att.created_at);
    pledge.declinedSince = att.declined_since === null ?
      null : new Date(att.declined_since);
    pledge.pledgeCap = att.pledge_cap_cents;
    pledge.patronPaysFees = att.patron_pays_fees;
    pledge.totalHistoricalAmount = att.total_historical_amount_cents;
    pledge.isPaused = att.is_paused === undefined ?
      null : att.is_paused,
    pledge.hasShippingAddress = att.has_shipping_address === undefined ?
      null : att.has_shipping_address;
    pledge.patron = null; // todo
    pledge.reward = null; // todo
    pledge.creator = null; //todo
    pledge.address = null; // todo
    
    return pledge;
  }
}