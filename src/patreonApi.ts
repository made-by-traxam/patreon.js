import * as request from 'request';
import { User } from './models/user';
import { Campaign } from './models/campaign';

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
    return User.parse(body.data);
  }

  /**
   * Fetches the current user's campaigns.
   */
  async getCurrentUserCampaigns(): Promise<Campaign[]> {
    const body: any = await this.requestApiResource('/current_user/campaigns');
    const data: Array<any> = body.data;
    return data.map((val, index, array) => Campaign.parse(val));
  }

  /**
   * Executes a request.
   * @param route API endpoint, must start with a `/`
   */
  private requestApiResource(route: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      request({
        url: this.BASE_URL + route,
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