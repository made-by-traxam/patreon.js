import { User } from "./user";

/**
 * A pledge data object.
 * 
 * @see https://docs.patreon.com/#pledge API documentation
 */
export class Pledge {
  constructor(id: string,
      amountCents: number,
      creationTime: Date,
      declinedSince: Date,
      pledgeCapCents: number,
      patronPaysFees: boolean,
      totalHistoricalAmountCents: number,
      isPaused: boolean,
      hasShippingAddress: boolean,
      patron: User,
      reward: unknown,
      creator: User,
      address: unknown) {
    this.id = id;
    this.amountCents = amountCents;
    this.creationTime = creationTime;
    this.declinedSince = declinedSince;
    this.pledgeCapCents = pledgeCapCents;
    this.patronPaysFees = patronPaysFees;
    this.totalHistoricalAmountCents = totalHistoricalAmountCents;
    this.isPaused = isPaused;
    this.hasShippingAddress = hasShippingAddress;
    this.patron = patron;
    this.reward = reward;
    this.creator = creator;
    this.address = address;
  }
  /**
   * The type of Pledge objects is `pledge`. 
   */
  readonly type: string = 'pledge';
  /**
   * Identifying number of this pledge.
   */
  id: string;
  amountCents: number;
  creationTime: Date;
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
  totalHistoricalAmountCents?: number;
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
    var attributes = data.attributes;
    return new Pledge(
      data.id,
      attributes.amount_cents,
      new Date(attributes.created_at),
      attributes.declined_since === null ? null : new Date(attributes.declined_since),
      attributes.pledge_cap_cents,
      attributes.patron_pays_fees,
      attributes.total_historical_amount_cents,
      attributes.is_paused === undefined ? null : attributes.is_paused,
      attributes.has_shipping_address === undefined ? null : attributes.has_shipping_address,
      null, // todo
      null, // todo
      null, //todo
      null // todo
    );
  }
}