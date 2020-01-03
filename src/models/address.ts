import { PatreonObject } from "../patreonObject";
import { PatreonAPI } from "../patreonApi";
import { DataStore } from "../dataStore";

/**
 * An address data object.
 * 
 * @see https://docs.patreon.com/#address APIv2 documentation
 */
export class Address extends PatreonObject {
  //todo attributes

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
    // todo
  }
}