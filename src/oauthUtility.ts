import * as querystring from "querystring";

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
}
