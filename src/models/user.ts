import { PatreonObject } from '../patreonObject';
import { DataStore } from '../dataStore';
import { PatreonAPI } from '../patreonApi';
import { RawPatreonObject } from '../rawPatreonObject';

/**
 * Social network profiles that are linked to a user.
 */
export class SocialConnections {
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

  /**
   * Parses social media links form user attributes.
   * @param attributes the attributes child of a User data object.
   */
  static parse (attributes: any): SocialConnections {
    return {
      facebookId: attributes.facebook_id,
      facebook: attributes.facebook,
      twitter: attributes.twitter,
      youtube: attributes.youtube
    };
  }
}

/**
 * A user data object.
 *
 * @see https://docs.patreon.com/#user API documentation
 */
export class User extends PatreonObject {
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
  creationTime: Date;
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

  /**
   * Constructs a new user object.
   * @param api the api instance used for previous and further interaction with
   *            the Patreon API.
   * @param id identifying number of this object.
   */
  constructor (api: PatreonAPI, id: string) {
    super(api, 'user', id);
  }

  /**
   * @internal
   */
  parse (data: RawPatreonObject, dataStore: DataStore): void {
    const att = data.attributes;

    this.email = att.email;
    this.firstName = att.first_name;
    this.lastName = att.last_name;
    this.vanity = att.vanity;
    this.about = att.about;
    this.imageUrl = att.image_url;
    this.thumbUrl = att.thumb_url;
    this.creationTime = new Date(att.created);
    this.url = att.url;
    this.likeCount = att.like_count === undefined
      ? null
      : att.like_count;
    this.commentCount = att.comment_count === undefined
      ? null
      : att.comment_count;
    this.socialConnections = SocialConnections.parse(att);
  }
}
