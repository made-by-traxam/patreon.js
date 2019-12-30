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
  creationTime: Date;
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

  static parse(data: any): Campaign {
    var attributes: any = data.attributes;
    return {
      type: 'campaign',
      id: data.id,
      summary: attributes.summary,
      creationName: attributes.creation_name,
      payPerName: attributes.pay_per_name,
      oneLiner: attributes.one_liner,
      mainVideoEmbed: attributes.main_video_embed,
      mainVideoUrl: attributes.main_video_url,
      smallImageUrl: attributes.image_small_url,
      imageUrl: attributes.image_url,
      thanksVideoUrl: attributes.thanks_video_url,
      thanksEmbed: attributes.thanks_embed,
      thanksMessage: attributes.thanks_msg,
      isMonthly: attributes.is_monthly,
      isNSFW: attributes.is_nsfw,
      creationTime: new Date(attributes.created_at),
      publishedAt: new Date(attributes.published_at),
      pledgeUrl: attributes.pledge_url,
      pledgeSum: attributes.pledge_sum,
      patronCount: attributes.patron_count,
      creationCount: attributes.creation_count,
      outstandingPaymentAmountCents:
        attributes.outstanding_payment_amount_cents,
      creator: null, //todo
      goals: [], //todo
      pledges: [], //todo
      rewards: [], //todo
    };
  }
}