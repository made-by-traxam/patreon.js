/**
 * An unparsed object as provided by the ReST API.
 */
export class RawPatreonObject {
  type: string;
  id: string;
  attributes: any;
  relationships?: any;
}

/**
 * A wrapper containing one or multiple `RawPatreonObject`s.
 */
export class WrappedRawPatreonObject {
  data: RawPatreonObject | RawPatreonObject[];
}
