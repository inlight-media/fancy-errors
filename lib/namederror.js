// imports
var util = require('util'),
  CustomError = require('./error');

// exports
module.exports = NamedError;

/**
 * Named error
 * @constructor
 * @param {String} name Name of the error
 * @param {Error} [err] Cause error
 * @param {String} [message] Error message
 * @param {Function} [construct] Optional constructor
 */
function NamedError() {
  var args = Array.prototype.slice.call(arguments, 0);

  this.name = args.shift();

  CustomError.apply(this, args);
}

util.inherits(NamedError, CustomError);