// imports
var util = require('util'),
  CustomError = require('./error');

// exports
module.exports = NamedError;

/**
 * Named error
 * @param {String} name
 * @param {Error} [err]
 * @param {String} [message]
 * @param {Function} [construct]
 */
function NamedError() {
  var args = Array.prototype.slice.call(arguments, 0);

  this.name = args.shift();

  CustomError.apply(this, args);
}

util.inherits(NamedError, CustomError);