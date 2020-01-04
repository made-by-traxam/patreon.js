import { PatreonObject } from '../patreonObject';
import { DataStore } from '../dataStore';
import { PatreonAPI } from '../patreonApi';
import { RawPatreonObject } from '../rawPatreonObject';

/**
 * A reward data object.
 */
export class Reward extends PatreonObject {
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

  /**
   * Constructs a new reward object.
   * @param api the api instance used for previous and further interaction with
   *            the Patreon API.
   * @param id identifying number of this object.
   */
  constructor(api: PatreonAPI, id: string) {
    super(api, 'reward', id);
  }

  parse(data: RawPatreonObject, dataStore: DataStore): void {
    const att = data.attributes;
    
    this.amount = att.amount_cents,
    this.userLimit = att.user_limit,
    this.remaining = att.remaining,
    this.description = att.description,
    this.requiresShipping = att.requires_shipping,
    this.createdAt = new Date(att.created_at),
    this.url = att.url,
    this.patronCount = att.patron_count,
    this.postCount = att.post_count,
    this.discordRoleIds = att.discord_role_ids,
    this.title = att.title,
    this.imageUrl = att.image_url,
    this.editedAt = new Date(att.edited_at),
    this.published = att.published,
    this.publishedAt = att.published_at === null ?
      null : new Date(att.published_at),
    this.unpublishedAt = att.unpublished_at === null ?
      null : new Date(att.unpublished_at)
  }
}