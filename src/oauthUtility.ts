import * as querystring from "querystring";

/**
 * Utility functions for the Patreon OAuth authorization flow.
 * @see https://docs.patreon.com/#oauth
 */
export class PatreonOAuthUtility {
    static buildAuthorizationUrl(clientId: string, redirectUri: string): string {
        let query = {
            'response_type': 'code',
            'client_id': clientId,
            'redirect_uri': redirectUri
        };
        let queryString = querystring.stringify(query);
        return `https://www.patreon.com/oauth2/authorize?${queryString}`;
    }

    static parseRedirect(redirectQueryString: string):
            {code: string, state?: string} {
        let query = querystring.parse(redirectQueryString);
        return {
            code: <string> query.code,
            state: <string | undefined> query.state
        };
    }
}
