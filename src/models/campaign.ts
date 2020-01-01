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

  /**
   * Fetches pledges for this campaign.
   * @see PatreonAPI.getCampaignPledges
   */
  public getPledges(): Promise<Page<Pledge>> {
    return this.api.getCampaignPledges(this.id);
  }

  /**
   * Fetches all pledges for this campaign. This request might take a long time
   * if your campaign has a lot of pledges.
   */
  public async getAllPledges(): Promise<Pledge[]> {
    var pledges: Pledge[] = [];
    var currentPage: Page<Pledge> = await this.getPledges();
    pledges.push(...currentPage.contents);
    while (currentPage.hasNext()) {
      currentPage = await currentPage.getNext();
      pledges.push(...currentPage.contents);
    }
    return pledges;
  }

  /**
   * Parses a ReST data API object into a Pledge object.
   * @param source rest data API object.
   */
  static parse(data: any, api: PatreonAPI): Campaign {
    const att: any = data.attributes;
    const campaign = new Campaign();
    Object.assign(campaign, {
      api: api,
      id: data.id,
      summary: att.summary,
      creationName: att.creation_name,
      payPerName: att.pay_per_name,
      oneLiner: att.one_liner,
      mainVideoEmbed: att.main_video_embed,
      mainVideoUrl: att.main_video_url,
      imageUrl: att.image_url,
      smallImageUrl: att.image_small_url,
      thanksVideoUrl: att.thanks_video_url,
      thanksEmbed: att.thanks_embed,
      thanksMessage: att.thanks_msg,
      isMonthly: att.is_monthly,
      isNSFW: att.is_nsfw,
      createdAt: new Date(att.created_at),
      publishedAt: new Date(att.published_at),
      pledgeUrl: att.pledge_url,
      pledgeSum: att.pledge_sum,
      patronCount: att.patron_count,
      creationCount: att.creation_count,
      outstandingPaymentAmountCents: att.outstanding_payment_amount_cents,
    });
    return campaign;
  }
}