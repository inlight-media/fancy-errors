// imports
var util = require('util'),
  errno = require('./errno'),
  pretty = require('./pretty');

// Error code reg exp. (matches "ERROR_CODE, Error message")
var CODE_REGXP = new RegExp(/^([A-Z_\d]+)\,\s/);

var ENV = process.env.NODE_ENV || 'development';

// exports
module.exports = CustomError;

/**
 * Custom error
 * @param {Error} [err]
 * @param {String} [message]
 * @param {Function} [construct]
 */
function CustomError() {
  var args = Array.prototype.slice.call(arguments, 0),
    codeMatch,
    constructor;

  if (args[0] instanceof Error) {
    this.cause = args.shift();
  }

  if (args.length > 0) {
    // try to find the error code
    if (codeMatch = String(args[0]).match(CODE_REGXP)) {
      this.code = codeMatch[1];
    }

    if (typeof args[args.length - 1] === 'function') {
      // the last argument is a contructor
      this.message = '';
      constructor = args.pop();
      constructor.apply(this, args);

    } else {
      this.message = util.format.apply(util, args);
    }
  }

  this.messageOriginal = this.message;

  if (this.cause) {
    this.message += '\n <- ' + this.cause.name + ': ' + this.cause.message;

    if (this.cause.code && errno[this.cause.code]) {
      this.message += ' (' + errno[this.cause.code].description + ')';
    }
  }

  Error.call(this, this.message);
  Error.captureStackTrace(this, this.errorCallee || this.constructor);

  if (ENV === 'development') {
    // print pretty stack, only in development env
    pretty(this);
  }
}

util.inherits(CustomError, Error);