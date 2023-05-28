import { User } from "./user";
import { PatreonObject } from "../patreonObject";
import { DataStore } from "../dataStore";
import { PatreonAPI } from "../patreonApi";
import { Reward } from "./reward";
import { Address } from "./address";
import { RawPatreonObject } from "../rawPatreonObject";

/**
 * A pledge data object.
 * 
 * @see https://docs.patreon.com/#pledge API documentation
 */
export class Pledge extends PatreonObject {
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
  /**
   * Seems to be `null` sometimes.
   */
  reward: Reward | null;
  creator: User;
  address: Address;

  /**
   * Constructs a new pledge object.
   * @param api the api instance used for previous and further interaction with
   *            the Patreon API.
   * @param id identifying number of this object.
   */
  constructor(api: PatreonAPI, id: string) {
    super(api, 'pledge', id);
  }

  /**
   * Checks if the pledge is invalid.
   * @returns `true` if the most recent payment was declined and `false` otherwise.
   */
  isInvalid(): boolean {
    return this.declinedSince !== null;
  }

  parse(data: RawPatreonObject, dataStore: DataStore): void {
    const att = data.attributes;
    const rel = data.relationships;
    
    this.amount = att.amount_cents;
    this.createdAt = new Date(att.created_at);
    this.declinedSince = att.declined_since === null ?
      null : new Date(att.declined_since);
    this.pledgeCap = att.pledge_cap_cents;
    this.patronPaysFees = att.patron_pays_fees;
    this.totalHistoricalAmount = att.total_historical_amount_cents === undefined
      ? null : att.total_historical_amount_cents;
    this.isPaused = att.is_paused === undefined ?
      null : att.is_paused,
    this.hasShippingAddress = att.has_shipping_address === undefined ?
      null : att.has_shipping_address;
    
    this.patron = dataStore.getUser(rel.patron);
    this.reward = dataStore.getReward(rel.reward);
    this.creator = dataStore.getUser(rel.creator);
    this.address = dataStore.getAddress(rel.address);
  }
}