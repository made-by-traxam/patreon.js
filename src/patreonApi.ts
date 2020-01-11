import * as request from 'request';
import { User } from './models/user';
import { Campaign } from './models/campaign';
import { Pledge } from './models/pledge';
import { Page } from './page';
import { DataStore } from './dataStore';
import { PatreonAPIError } from './patreonAPIError';

/**
 * Wrapper for the Patreon API.
 * @see https://docs.patreon.com/ API documentation
 */
export class PatreonAPI {
  /**
   * The base URL of the Patreon OAuth2 API without a slash in the end.
   */
  static readonly BASE_URL: string = 'https://www.patreon.com/api/oauth2/api';
  /**
   * The access token used to authorize API requests.
   */
  accessToken: string;

  /**
   * Creates a new Patreon API wrapper instance.
   * @param accessToken the token to use for API request authorization.
   */
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Fetches the current user.
   */
  async getCurrentUser(): Promise<User> {
    const body: any = await this.requestApiResource('/current_user');
    return <User> this._parseResponse(body);
  }

  /**
   * Fetches the current user's campaigns.
   */
  async getCurrentUserCampaigns(): Promise<Campaign[]> {
    const body: any = await this.requestApiResource('/current_user/campaigns');
    const data: Array<any> = body.data;
    return <Campaign[]> this._parseResponse(body);
  }

  /**
   * Fetches pledges for a given campaign.
   * @param campaignId the id of the campaign to fetch pledges for.
   */
  getCampaignPledges(campaignId: string): Promise<Page<Pledge>> {
    return this._getCampaignPledges(PatreonAPI.BASE_URL + `/campaigns/${campaignId}/pledges`);
  }

  private async _getCampaignPledges(url: string): Promise<Page<Pledge>> {
    const api = this;
    const body: any = await this._requestApiResourceFullyQualified(url);
    const data: Array<any> = body.data;
    const pledges = <Pledge[]> this._parseResponse(body);
    const nextUrl: string = body.links.next;
    return {
      contents: pledges,
      async getNext() {
        return await api._getCampaignPledges(nextUrl);
      },
      hasNext() {
        return nextUrl !== undefined;
      }
    }
  }

  /**
   * Executes a request.
   * @param route API endpoint, must start with a `/`
   */
  private requestApiResource(route: string): Promise<object> {
    return this._requestApiResourceFullyQualified(PatreonAPI.BASE_URL + route);
  }

  private _requestApiResourceFullyQualified(url: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      request({
        url: url,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      }, (err, res, body) => {
        if (err) {
          reject(err);
        } else if (res.statusCode !== 200) {
          reject(PatreonAPIError.parse(JSON.parse(body)));
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  private _parseResponse(response: any) {
    const dataStore = new DataStore(this);
    dataStore.parseResponse(response);
    return dataStore.primaryObject;
  }
}