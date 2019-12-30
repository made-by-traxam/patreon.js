/**
 * A user data object.
 *
 * @see https://docs.patreon.com/#user API documentation
 */
export class User {
  /**
   * The type of User objects is 'user'.
   */
  readonly type: string = 'user';
  /**
   * Identifying number of this user.
   */
  id: string;
  /**
   * Email address of this user.
   */
  email: string;
  /**
   * First name of this user.
   */
  firstName?: string;
  /**
   * Last name of this user.
   */
  lastName?: string;
  /**
   * Vanity username of this user, used i.e. in user's URL. May be null if the
   * user has not set a vanity username (common for non-creators).
   * @deprecated from API v2 on. Use campaign's vanity instead.
   */
  vanity?: string;
  /**
   * A short description of this user.
   */
  about?: string;
  /**
   * URL to the profile picture of this user with a 400x400px resolution.
   * @see thumbUrl for a low-res-version.
   */
  imageUrl: string;
  /**
   * URL to the profile picture of this user with a 100x100px resolution.
   * @see imageUrl for a high-res-version.
   */
  thumbUrl: string;
  /**
   * Datetime of this account's creation.
   */
  created: Date;
  /**
   * URL of this user's creator or patron profile.
   */
  url: string;
  /**
   * Number of posts this user has liked.
   * 
   * Is null if this value was not requested explicitly.
   */
  likeCount?: number;
  /**
   * Number of comments by this user.
   * 
   * Is null if this value was not requested explicitly.
   */
  commentCount?: number;
  /**
   * Social network profiles linked to this user.
   */
  socialConnections: SocialConnections;
}

/**
 * Social network profiles that are linked to a user.
 */
export class SocialConnections {
  /**
   * The user who owns these profiles.
   */
  user: User;
  /**
   * TODO: purpose/content unknown
   */
  facebookId?: string;
  /**
   * TODO: purpose/content unknown
   */
  facebook?: string;
  /**
   * TODO: purpose/content unknown
   */
  twitter?: string;
  /**
   * TODO: purpose/content unknown
   */
  youtube?: string;
}
