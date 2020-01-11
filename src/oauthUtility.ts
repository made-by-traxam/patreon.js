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
     * @param redirectQueryString the query string to parse, without the leading
     *                            '?' character.
     * @see Docs: [Step 3](https://docs.patreon.com/#step-3-handling-oauth-redirect)
     *            of the OAuth authorization flow documentation.
     * @see `parseRedirectUrl(string)`: for full-url-parsing.
     */
    static parseRedirectQuery(redirectQueryString: string):
            {code: string, state?: string} {
        let query = querystring.parse(redirectQueryString);
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
    static parseRedirectUrl(redirectUrl: string):
            {code: string, state?: string} {
        let queryString = redirectUrl.substring(redirectUrl.indexOf('?') + 1);
        return this.parseRedirectQuery(queryString);
    }
}
