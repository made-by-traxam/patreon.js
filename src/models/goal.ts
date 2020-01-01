import { PatreonAPI } from "../patreonApi";

/**
 * A goal data object.
 */
export class Goal {
  /**
   * The api class used to fetch this campaign.
   */
  api: PatreonAPI;
  /**
   * The type of a Goal object is `goal`.
   */
  readonly type: string = 'goal';
  /**
   * Identifying number of this Goal.
   */
  id: string;
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
   * Parses a ReST data API object into a Goal object.
   * @param source rest data API object.
   * @param api the api instance.
   */
  static parse(data: any, api: PatreonAPI): Goal {
    const att: any = data.attributes;
    var goal: Goal = new Goal();
    goal.api = api;
    goal.id = data.id;
    goal.title = att.title;
    goal.description = att.description;
    goal.amount = att.amount_cents;
    goal.currency = att.currency;
    goal.progress = att.completed_percentage;
    goal.createdAt = new Date(att.created_at);
    goal.reachedAt = att.reached_at === null ? null : new Date(att.reached_at);
    return goal;
  }
}