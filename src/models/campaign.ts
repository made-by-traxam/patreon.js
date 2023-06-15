import { User } from './user';
import { Pledge } from './pledge';
import { PatreonAPI } from '../patreonApi';
import { Page } from '../page';
import { PatreonObject } from '../patreonObject';
import { Goal } from './goal';
import { Reward } from './reward';
import { DataStore } from '../dataStore';
import { RawPatreonObject } from '../rawPatreonObject';

/**
 * A campaign data object.
 *
 * @see https://docs.patreon.com/#campaign API documentation
 */
export class Campaign extends PatreonObject {
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
  rewards: Reward[];
  /**
   * The campaign's goals
   */
  goals: Goal[];

  /**
   * Constructs a new campaign object.
   * @param api the api instance used for previous and further interaction with
   *            the Patreon API.
   * @param id identifying number of this object.
   */
  constructor (api: PatreonAPI, id: string) {
    super(api, 'campaign', id);
  }

  /**
   * Fetches pledges for this campaign.
   * @see PatreonAPI.getCampaignPledges
   */
  public getPledges (): Promise<Page<Pledge>> {
    return this.api.getCampaignPledges(this.id);
  }

  /**
   * Fetches all pledges for this campaign. This request might take a long time
   * if your campaign has a lot of pledges.
   */
  public async getAllPledges (): Promise<Pledge[]> {
    const pledges: Pledge[] = [];
    let currentPage: Page<Pledge> = await this.getPledges();
    pledges.push(...currentPage.contents);
    while (currentPage.hasNext()) {
      currentPage = await currentPage.getNext();
      pledges.push(...currentPage.contents);
    }
    return pledges;
  }

  /**
   * @internal
   */
  parse (data: RawPatreonObject, dataStore: DataStore): void {
    const att = data.attributes;
    const rel = data.relationships;

    this.summary = att.summary;
    this.creationName = att.creation_name;
    this.payPerName = att.pay_per_name;
    this.oneLiner = att.one_liner;
    this.mainVideoEmbed = att.main_video_embed;
    this.mainVideoUrl = att.main_video_url;
    this.imageUrl = att.image_url;
    this.smallImageUrl = att.image_small_url;
    this.thanksVideoUrl = att.thanks_video_url;
    this.thanksEmbed = att.thanks_embed;
    this.thanksMessage = att.thanks_msg;
    this.isMonthly = att.is_monthly;
    this.isNSFW = att.is_nsfw;
    this.createdAt = new Date(att.created_at);
    this.publishedAt = new Date(att.published_at);
    this.pledgeUrl = att.pledge_url;
    this.pledgeSum = att.pledge_sum;
    this.patronCount = att.patron_count;
    this.creationCount = att.creation_count;
    this.outstandingPaymentAmountCents = att.outstanding_payment_amount_cents;

    this.creator = dataStore.getUser(rel.creator);
    this.rewards = dataStore.getRewards(rel.rewards);
    this.goals = dataStore.getGoals(rel.goals);
  }
}
