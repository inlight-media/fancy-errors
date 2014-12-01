// imports
var util = require('util'),
  http = require('http');

// HTTP status codes
var STATUS_CODES = http.STATUS_CODES;

// exports
module.exports = init;

function init(errors) {
  /**
   * Missing argument error
   * @param {String} paramName Name of the parameter
   */
  errors.define('MissingParameterError', function (paramName, message) {
    this.message = util.format('Required parameter `%s` missing. ', paramName || '?', message);
  });

  /**
   * Invalid argument error
   * @param {String} paramName Name of the parameter
   */
  errors.define('InvalidParameterError', function (paramName, message) {
    this.message = util.format('Parameter `%s` in not valid. ', paramName || '?', message);
  });

  /**
   * Generin IO error
   */
  errors.define('IOError');

  /**
   * Directory not found
   */
  errors.define('DirectoryNotFoundError');

  /**
   * File not found
   */
  errors.define('FileNotFoundError');

  /**
   * File exists but cannot be loaded
   */
  errors.define('FileLoadError');

  /**
   * URI error
   */
  errors.define('URIError');

  /**
   * HTTP status error
   * @param {Number} statusCode HTTP status code
   * @param {String} [message] Optional status text
   */
  errors.define('HTTPError', function (statusCode, message) {
    if (statusCode && (statusCode >> 0) > 0) {
      this.code = statusCode;
      this.message = (message ? message : STATUS_CODES[this.code]);

    } else {
      this.message = statusCode || '';
    }
  });

  /**
   * Generic argument error
   */
  errors.define('ArgumentError');

  /**
   * Authentication error
   */
  errors.define('AuthenticationError');

  /**
   * Generic not found error
   */
  errors.define('NotFoundError');

  /**
   * Generic range error
   */
  errors.define('RangeError');

  /**
   * Generic reference error
   */
  errors.define('ReferenceError');

  /**
   * Generic type error
   */
  errors.define('TypeError');

  /**
   * Generic validation error
   */
  errors.define('ValidationError');

  /**
   * Fatal error
   */
  errors.define('FatalError');

  /**
   * Connection error
   */
  errors.define('ConnectionError');
  
  /**
   * Rate limiter error
   */
  errors.define('RateLimiterError');
  
  /**
   * Resource busy error
   */
  errors.define('ResourceBusyError');
  
  /**
   * Forbidden error
   */
  errors.define('ForbiddenError');
  
  /**
   * Not allowed error
   */
  errors.define('NotAllowedError');
  
  /**
   * Not acceptable error
   */
  errors.define('NotAcceptableError');
  
  /**
   * Timeout error
   */
  errors.define('TimeoutError');
  
  /**
   * Unsupported error
   */
  errors.define('UnsupportedError');
  
  /**
   * Too large error
   */
  errors.define('TooLargeError');
  
  /**
   * Conflict error
   */
  errors.define('ConflictError');
  
  /**
   * Precondition error
   */
  errors.define('PreconditionError');
  
  /**
   * URI too long error
   */
  errors.define('URITooLongError');
}