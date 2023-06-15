import * as querystring from 'querystring';
import * as request from 'request';
import { PatreonAPIError } from './patreonAPIError';

export interface RawTokens {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

/**
 * Utility functions for the Patreon OAuth authorization flow.
 * @see https://docs.patreon.com/#oauth
 */
export class PatreonOAuthUtility {
  static readonly OAUTH_BASE_URL = 'https://www.patreon.com/api/oauth2';

  static buildAuthorizationUrl (clientId: string, redirectUri: string): string {
    const query = {
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri
    };
    const queryString = querystring.stringify(query);
    return `https://www.patreon.com/oauth2/authorize?${queryString}`;
  }

  /**
     * Parses the query string of an OAuth redirect into a code and a state.
     * @param redirectQueryString the query string to parse, without the leading
     *                            '?' character.
     * @see Docs: [Step 3](https://docs.patreon.com/#step-3-handling-oauth-redirect)
     *            of the OAuth authorization flow documentation.
     * @see `parseRedirectUrl(string)`: for full-url-parsing.
     */
  static parseRedirectQuery (redirectQueryString: string):
            {code: string, state?: string} {
    const query = querystring.parse(redirectQueryString);
    return {
      code: <string> query.code,
      state: <string | undefined> query.state
    };
  }

  /**
     * Parses the url of an OAuth redirect into a code and a state.
     * @param redirectUrl the url to parse, including it's query string.
     * @see Docs: [Step 3](https://docs.patreon.com/#step-3-handling-oauth-redirect)
     *            of the OAuth authorization flow documentation.
     * @see `parseRedirectQuery(string)`: for query-string parsing.
     */
  static parseRedirectUrl (redirectUrl: string):
            {code: string, state?: string} {
    const queryString = redirectUrl.substring(redirectUrl.indexOf('?') + 1);
    return this.parseRedirectQuery(queryString);
  }

  /**
     * Exchanges a grant code by a set of access tokens.
     * @param clientId id of the client requesting a token.
     * @param clientSecret secret of the client requesting a token.
     * @param redirectUri the redirect URI used to get the code.
     * @param code the code passed to the redirect URI.
     * @see Docs: [Step 4](https://docs.patreon.com/#step-4-validating-receipt-of-the-oauth-token)
     *            of the OAuth authorization flow documentation.
     */
  static getToken (clientId: string, clientSecret: string, redirectUri: string,
    code: string): Promise<Tokens> {
    return this._requestToken(clientId, clientId, {
      code,
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirectUri
    });
  }

  /**
     * Exchanges a refresh token by a new set of access tokens.
     * @param clientId id of the client requesting a token.
     * @param clientSecret secret of the client requesting a token.
     * @param refreshToken the refresh token from the last token retrival.
     * @see Docs: [Step 6](https://docs.patreon.com/#step-6-resolving-the-oauth-redirect)
     *            of the OAuth authorization flow documentation.
     */
  static refreshToken (clientId: string, clientSecret: string,
    refreshToken: string | Tokens): Promise<Tokens> {
    if (typeof refreshToken !== 'string') { refreshToken = refreshToken.refreshToken; }
    return this._requestToken(clientId, clientId, {
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken
    });
  }

  private static _requestToken (clientId: string, clientSecret: string,
    qs: object): Promise<Tokens> {
    const url = PatreonOAuthUtility.OAUTH_BASE_URL + '/token';
    return new Promise<Tokens>((resolve, reject) => {
      request({
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        qs
      }, (err, res, body) => {
        if (err) {
          reject(err);
        } else if (res.statusCode !== 200) {
          reject(PatreonAPIError.parse(JSON.parse(body)));
        } else {
          const rawTokens = JSON.parse(body);
          resolve(PatreonOAuthUtility.parseTokens(rawTokens));
        }
      });
    });
  }

  /**
     * Parses a token response into a set of tokens
     * @param raw the token reponse.
     */
  static parseTokens (raw: RawTokens): Tokens {
    return {
      accessToken: raw.access_token,
      refreshToken: raw.refresh_token,
      expiresIn: raw.expires_in
    };
  }
}
