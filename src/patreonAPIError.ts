interface RawPatreonAPIError {
  code: number;
  code_name: string;
  detail: string;
  id: string;
  status: number;
  title: string;
}

/**
 * Thrown when the Patreon API returns an error to a request
 */
export class PatreonAPIError extends Error {
  /**
   * 'Code' of the error. This is most likely the 1-based index of the error
   * provided in the response.
   * @see status for the status code.
   */
  number: number;
  /**
   * Name of the error code.
   */
  codeName: string;
  /**
   * Description of what is wrong.
   */
  description: string;
  /**
   * Identifier of this error as provided by the Patreon API.
   */
  id: string;
  /**
   * Short name for this type of error, i.e. 'Bad Request'.
   */
  title: string;
  /**
   * All errors that were included within the API response. Sometimes, the
   * Patreon API responds with more than one error.
   */
  allErrors: PatreonAPIError[];

  /**
   * Constructs an unknown Patreon API error. Call `parse` afterwards or fill
   * remaining data manually.
   */
  constructor() {
    super('The Patreon API responded with an error');
  }

  /**
   * Parses a raw error into this object.
   * @param raw the raw error to parse.
   * @return itself to allow chaining.
   */
  parse(raw: RawPatreonAPIError) {
    this.number = raw.code;
    this.codeName = raw.code_name;
    this.description = raw.detail;
    this.id = raw.id;
    this.title = raw.title;
    this.message = `${this.title} -- ${this.description}`
    return this;
  }

  /**
   * Parses an API error response into `PatreonAPIError`s.
   * @param response the response body.
   */
  static parse(response: {errors: RawPatreonAPIError[]}): PatreonAPIError[] {
    let errors = response.errors.map(raw => new PatreonAPIError().parse(raw));
    errors.forEach(error => {
      error.allErrors = errors;
      if (errors.length > 1) {
        error.message += ` (+ ${errors.length - 1} other Patreon API errors)`
      }
    });

    return errors;
  }

  /**
   * Parses the API error response into `PatreonAPIError`s and throws the first
   * one.
   * @throws the first Patreon API error from the given response.
   */
  static parseAndThrow(response: {errors: RawPatreonAPIError[]}): void {
    throw PatreonAPIError.parse(response);
  }
}
