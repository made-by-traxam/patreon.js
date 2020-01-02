import { PatreonAPI } from "./patreonApi";
import { DataStore } from "./dataStore";

/**
 * An object in the Patreon context.
 */
export abstract class PatreonObject {
  /**
   * API instance used for previous and further interaction with the Patreon
   * API.
   */
  api: PatreonAPI;
  /**
   * The type of this object.
   */
  type: string;
  /**
   * Identifying number of this object.
   */
  id: string;

  /**
   * Creates a new Patreon API object.
   * @param api the api instance used for previous and further interaction with
   *            the Patreon API.
   * @param type the object type identifier.
   * @param id identifying number for this object.
   */
  constructor(api: PatreonAPI, type: string, id: string) {
    this.api = api;
    this.type = type;
    this.id = id;
  }

  /**
   * Parses attribute and relationship data from an API data source.
   * @param data the raw API data.
   * @param dataStore a data store used for getting related objects.
   */
  abstract parse(data: {attributes: any, relationships: any},
    dataStore: DataStore): void;
}