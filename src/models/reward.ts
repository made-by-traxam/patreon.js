import { PatreonAPI } from '../patreonApi';

/**
 * A reward data object.
 */
export class Reward {
  /**
   * The api instance used to fetch this reward.
   */
  api: PatreonAPI;
  /**
   * The type of a Reward object is 'reward'.
   */
  readonly type: string = 'reward';
  /**
   * Identifying number of this Reward.
   */
  id: string;
  /**
   * Monetary amount necessary to unlock this reward, in USD cents.
   */
  amount: number;
  /**
   * The maximum number of patreons this Reward is limited to. Is null if this
   * reward is not limited.
   */
  userLimit: number;
  /**
   * Remaining number of patrons who may subscribe, if there is a `userLimit`.
   * Is null if there is no limit.
   */
  remaining: number;
  /**
   * Reward display description, might contain HTML.
   */
  description: string;
  /**
   * Whether this Reward requires a shipping address from patrons.
   */
  requiresShipping: boolean;
  /**
   * Datetime this Reward was created.
   */
  createdAt: Date;
  /**
   * Fully qualified URL associated with this reward.
   */
  url: string;
  /**
   * Number of patrons currently registered for this reward.
   */
  patronCount: number;
  /**
   * Number of posts published to this reward. Can be null.
   */
  postCount: number;
  /**
   * The discord role IDs granted by this reward. Can be null.
   */
  discordRoleIds: object;
  /**
   * Reward display title.
   */
  title: string;
  /**
   * TODO. Can be null.
   */
  imageUrl: string;
  /**
   * Datetime reward was last modified.
   */
  editedAt: Date;
  /**
   * Whether this reward is currently published.
   */
  published: boolean;
  /**
   * Datetime this reward was last published. Can be null.
   */
  publishedAt: Date;
  /**
   * Datetime this reward was unpublished, while applicable. Can be null.
   */
  unpublishedAt: Date;
}