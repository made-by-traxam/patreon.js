import { PatreonObject } from "../patreonObject";
import { PatreonAPI } from "../patreonApi";
import { DataStore } from "../dataStore";

/**
 * An address data object.
 * 
 * @see https://docs.patreon.com/#address APIv2 documentation
 */
export class Address extends PatreonObject {
  /**
   * Full recipient name, can be null.
   */
  addressee: string;
  /**
   * First line of the street address, can be null.
   * @see line2
   */
  line1: string;
  /**
   * Second line of the street address, can be null.
   * @see line1
   */
  line2: string;
  /**
   * Postal or zip code, can be null.
   */
  postalCode: string;
  /**
   * Name of the city.
   */
  city: string;
  /**
   * State or province name, can be null.
   */
  state: string;
  /**
   * Country name.
   */
  country: string;
  /**
   * Telephone number, specified for non-US addresses. Can be null.
   */
  phoneNumber: string;
  /**
   * Datetime address was first created.
   */
  createdAt: Date;

  /**
   * Constructs a new pledge object.
   * @param api the api instance used for previous and further interaction with
   *            the Patreon API.
   * @param id identifying number of this object.
   */
  constructor(api: PatreonAPI, id: string) {
    super(api, 'address', id);
  }

  parse(data: { attributes: any; relationships?: any; },
      dataStore: DataStore): void {
    const att = data.attributes;

    this.addressee = att.addressee;
    this.line1 = att.line_1;
    this.line2 = att.line_2;
    this.postalCode = att.postal_code;
    this.city = att.city;
    this.state = att.state;
    this.country = att.country;
    this.phoneNumber = att.phone_number;
    this.createdAt = new Date(att.created_at);
  }
}