/**
 * A page in a paginated API request.
 */
export interface Page<T> {
  /**
   * The contents of this page.
   */
  contents: T[];
  /**
   * Fetches the next page.
   */
  getNext(): Promise<Page<T>>;
  /**
   * Checks whether there is a next page.
   */
  hasNext(): boolean;
}
