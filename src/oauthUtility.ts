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

    /**
     * Parses the query string of an OAuth redirect into a code and a state.
     * @see docs [Step 3](https://docs.patreon.com/#step-3-handling-oauth-redirect)
     *           of the OAuth authorization flow documentation. 
     */
    static parseRedirect(redirectQueryString: string):
            {code: string, state?: string} {
        let query = querystring.parse(redirectQueryString);
        return {
            code: <string> query.code,
            state: <string | undefined> query.state
        };
    }
}
