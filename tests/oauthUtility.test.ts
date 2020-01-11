import { PatreonOAuthUtility, Tokens } from "../src/oauthUtility";

test('build basic authorization url', () => {
    const clientId = '00000';
    const redirectUri = 'http://localhost:3000/auth/patreon'
    const expectedOutput = 'https://www.patreon.com/oauth2/authorize?' +
        'response_type=code&' +
        'client_id=00000&' +
        'redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fpatreon';
    
    expect(PatreonOAuthUtility.buildAuthorizationUrl(clientId, redirectUri))
        .toBe(expectedOutput);
});

test('parse redirect query string', () => {
    const redirectQueryString = 'code=secret&state=abc123';
    const expectedResult = {
        code: 'secret',
        state: 'abc123'
    };

    expect(PatreonOAuthUtility.parseRedirectQuery(redirectQueryString))
        .toEqual(expectedResult);
});

test('parse redirect url', () => {
    const redirectUrl = 'http://localhost:3000/auth/patreon?' +
        'code=secret&state=abc123';
    const expectedResult = {
        code: 'secret',
        state: 'abc123'
    };

    expect(PatreonOAuthUtility.parseRedirectUrl(redirectUrl))
        .toEqual(expectedResult);
});

test('parse token set', () => {
    const input = {
        access_token: 'this is an access token',
        refresh_token: 'this is a refresh token',
        expires_in: 60 * 60 * 24 * 30, // 30 days
        scope: 'users pledges-to-me my-campaign',
        token_type: 'Bearer'
    };
    const expectedResult: Tokens = {
        accessToken: 'this is an access token',
        refreshToken: 'this is a refresh token',
        expiresIn: 60 * 60 * 24 * 30
    };

    expect(PatreonOAuthUtility.parseTokens(input)).toEqual(expectedResult);
});
