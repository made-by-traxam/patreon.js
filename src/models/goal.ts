import { PatreonAPI } from "../patreonApi";
import { PatreonObject } from "../patreonObject";
import { DataStore } from "../dataStore";

/**
 * A goal data object.
 */
export class Goal extends PatreonObject {
  /**
   * Title for this Goal.
   */
  title: string;
  /**
   * Description for this Goal, might contain HTML.
   */
  description: string;
  /**
   * The amount to be reached for this goal in USD cents.
   * @see currency
   */
  amount: number;
  /**
   * The currency of the `amount`. This field is not described in the
   * [API v2 Goal docs](https://docs.patreon.com/#goal).
   * @see amount
   */
  currency: string;
  /**
   * The progress for this goal in percent
   * This value is equal to `(pledgeSum/amount)*100`.
   */
  progress: number;
  /**
   * When this goal was created.
   */
  createdAt: Date;
  /**
   * When this goal was reached. Null if the goal was not reached yet.
   */
  reachedAt?: Date;

  /**
   * Constructs a new goal object.
   * @param api the api instance used for previous and further interaction with
   *            the Patreon API.
   * @param id identifying number of this object.
   */
  constructor(api: PatreonAPI, id: string) {
    super(api, 'goal', id);
  }

  parse(data: {attributes: any, relationships: any},
      dataStore: DataStore): void {
    const att = data.attributes;

    this.title = att.title;
    this.description = att.description;
    this.amount = att.amount_cents;
    this.currency = att.currency;
    this.progress = att.completed_percentage;
    this.createdAt = new Date(att.created_at);
    this.reachedAt = att.reached_at === null ? null : new Date(att.reached_at);
  }
}