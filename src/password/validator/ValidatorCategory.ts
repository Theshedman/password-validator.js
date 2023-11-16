/**
 * Enum representing different categories of validators.
 * @enum {string}
 */
export enum ValidatorCategory {

  /**
   * Length expander constant.
   * @const
   * @type {string}
   */
  LENGTH_EXPANDER = "LENGTH_EXPANDER",
  /**
   * This variable represents the maximum allowed length for a certain total value.
   * It is used to limit the length of a given total value in a software application.
   *
   * @constant
   * @type {string}
   */
  TOTAL_LENGTH_LIMITER = "TOTAL_LENGTH_LIMITER",

  /**
   * Represents the constant variable `LENGTH_MINIMIZER`.
   * This variable indicates the name or identifier of a length minimizer.
   *
   * @type {string}
   * @const
   */
  LENGTH_MINIMIZER = "LENGTH_MINIMIZER",

  /**
   * The PATTERN_MATCHER variable represents the pattern to be matched.
   * It is a constant string that is set to "PATTER_MATCHER".
   *
   * @type {string}
   * @constant
   */
  PATTERN_MATCHER = "PATTER_MATCHER"
}