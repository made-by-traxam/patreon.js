import { User } from "./user";
import { Pledge } from "./pledge";
import { PatreonAPI } from "../patreonApi";
import { Page } from "../page";

/**
 * A campaign data object.
 * 
 * @see https://docs.patreon.com/#campaign API documentation
 */
export class Campaign {
  constructor(api: PatreonAPI,
    id: string,
    summary: string,
    creationName: string,
    payPerName: string,
    oneLiner: string,
    mainVideoEmbed: string,
    mainVideoUrl: string,
    imageUrl: string,
    smallImageUrl: string,
    thanksVideoUrl: string,
    thanksEmbed: string,
    thanksMessage: string,
    isMonthly: boolean,
    isNSFW: boolean,
    creationTime: Date,
    publishedAt: Date,
    pledgeUrl: string,
    pledgeSum: number,
    patronCount: number,
    creationCount: number,
    outstandingPaymentAmountCents: number,
    creator: User,
    rewards: unknown[],
    goals: unknown[],
    pledges: Pledge[]) {
      this.api = api;
      this.type = 'pledge';
      this.id = id;
      this.summary = summary;
      this.creationName = creationName;
      this.payPerName = payPerName;
      this.oneLiner = oneLiner;
      this.mainVideoEmbed = mainVideoEmbed;
      this.mainVideoUrl = mainVideoUrl;
      this.imageUrl = imageUrl;
      this.smallImageUrl = smallImageUrl;
      this.thanksVideoUrl = thanksVideoUrl;
      this.thanksEmbed = thanksEmbed;
      this.thanksMessage = thanksMessage;
      this.isMonthly = isMonthly;
      this.isNSFW = isNSFW;
      this.creationTime = creationTime;
      this.publishedAt = publishedAt;
      this.pledgeUrl = pledgeUrl;
      this.pledgeSum = pledgeSum;
      this.patronCount = patronCount;
      this.creationCount = creationCount;
      this.outstandingPaymentAmountCents = outstandingPaymentAmountCents;
      this.creator = creator;
      this.rewards = rewards;
      this.goals = goals;
      this.pledges = pledges;
    }

    
  /**
   * The api class used to fetch this campaign.
   */
  api: PatreonAPI;
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

  /**
   * Fetches pledges for this campaign.
   * @see PatreonAPI.getCampaignPledges
   */
  public getPledges(): Promise<Page<Pledge>> {
    return this.api.getCampaignPledges(this.id);
  }

  /**
   * Parses a ReST data API object into a Pledge object.
   * @param source rest data API object.
   */
  static parse(data: any, api: PatreonAPI): Campaign {
    var attributes: any = data.attributes;
    return new Campaign(api,
      data.id,
      attributes.summary,
      attributes.creation_name,
      attributes.pay_per_name,
      attributes.one_liner,
      attributes.main_video_embed,
      attributes.main_video_url,
      attributes.image_url,
      attributes.image_small_url,
      attributes.thanks_video_url,
      attributes.thanks_embed,
      attributes.thanks_msg,
      attributes.is_monthly,
      attributes.is_nsfw,
      new Date(attributes.created_at),
      new Date(attributes.published_at),
      attributes.pledge_url,
      attributes.pledge_sum,
      attributes.patron_count,
      attributes.creation_count,
      attributes.outstanding_payment_amount_cents,
      null, //todo
      [], //todo
      [], //todo
      [] //todo
    );
  }
}