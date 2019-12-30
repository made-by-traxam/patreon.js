import { User } from "./user";
import { Pledge } from "./pledge";

/**
 * A campaign data object.
 * 
 * @see https://docs.patreon.com/#campaign API documentation
 */
export class Campaign {
  /**
   * The type of Campaign objects is 'campaign'.
   */
  readonly type: string = 'campaign';
  /**
   * Identifying number of this campaign.
   */
  id: string;
  /**
   * The creator's summary of their campaign.
   */
  summary?: string;
  /**
   * The type of content the creator is creating, as in "`vanity` is
   * creating `creationName`".
   */
  creationName?: string;
  /**
   * The thing which patrons are paying per, as in "`vanity` is making $1000 per
   * `payPerName`".
   */
  payPerName?: string;
  /**
   * Short one-liner description for this campaign, displayed on the creator
   * page.
   */
  oneLiner?: string;
  mainVideoEmbed?: string;
  mainVideoUrl?: string;
  /**
   * Banner image URL for this campaign.
   */
  imageUrl: string;
  /**
   * Image url for this campaign's profile picture.
   */
  smallImageUrl: string;
  /**
   * URL for the video shown to patrons after they pledge to this campaign.
   */
  thanksVideoUrl?: string;
  thanksEmbed?: string;
  /**
   * Thank you message shown to patrons after they pledge to this campaign.
   */
  thanksMessage?: string;
  /**
   * `true` if the campaign charges per month, `false` if the campaign charges
   * per-post.
   */
  isMonthly: boolean;
  /**
   * `true` if the creator has marked the campaign as containing
   * Not-Safe-For-Work content.
   */
  isNSFW: boolean;
  /**
   * Datetime that the creator first began the campaign creation process.
   * @see publishedAt
   */
  createdAt: Date;
  /**
   * Datetime that the creator most recently published (made publicly visible)
   * the campaign.
   */
  publishedAt?: Date;
  /**
   * Relative (to patreon.com) URL for the pledge checkout flow for this
   * campaign.
   */
  pledgeUrl: string;
  pledgeSum: number;
  /**
   * Number of patrons pledging to this creator.
   */
  patronCount: number;
  creationCount: number;
  outstandingPaymentAmountCents: number;
  /**
   * The campaign owner.
   */
  creator: User;
  rewards: unknown[];
  /**
   * The campaign's goals
   */
  goals: unknown[];
  pledges: Pledge[];
}