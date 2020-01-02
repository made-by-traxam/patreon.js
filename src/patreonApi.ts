import * as request from 'request';
import { User } from './models/user';
import { Campaign } from './models/campaign';
import { Pledge } from './models/pledge';
import { Page } from './page';
import { DataStore } from './dataStore';

/**
 * Wrapper for the Patreon API.
 * @see https://docs.patreon.com/ API documentation
 */
export class PatreonAPI {
  readonly BASE_URL: string = 'https://www.patreon.com/api/oauth2/api';
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
    return <User> new DataStore(body).primaryObject;
  }

  /**
   * Fetches the current user's campaigns.
   */
  async getCurrentUserCampaigns(): Promise<Campaign[]> {
    const body: any = await this.requestApiResource('/current_user/campaigns');
    const data: Array<any> = body.data;
    return <Campaign[]> new DataStore(body).primaryObject;
  }

  /**
   * Fetches pledges for a given campaign.
   * @param campaignId the id of the campaign to fetch pledges for.
   */
  getCampaignPledges(campaignId: string): Promise<Page<Pledge>> {
    return this._getCampaignPledges(this.BASE_URL + `/campaigns/${campaignId}/pledges`);
  }

  private async _getCampaignPledges(url: string): Promise<Page<Pledge>> {
    const api = this;
    const body: any = await this._requestApiResourceFullyQualified(url);
    const data: Array<any> = body.data;
    const pledges = <Pledge[]> new DataStore(body).primaryObject;
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
    return this._requestApiResourceFullyQualified(this.BASE_URL + route);
  }

  private _requestApiResourceFullyQualified(url: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      request({
        url: url,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      }, (err, res, body) => {
        if (!err && res.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          reject(err);
        }
      });
    });
  }
}