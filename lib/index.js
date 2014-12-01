// imports
var util = require('util'),
  commonErrors = require('./common');

// variables
var errors;

// exports
module.exports = errors = {
  Error: require('./error'),
  NamedError: require('./namederror'),
  errno: require('./errno'),
  log: logErr,
  catch: catchErr,
  fatal: fatalErr,
  pretty: require('./pretty'),
  define: defineErr,
  statusCode: statusCode
};

// define common errors
commonErrors(errors);

/**
 * Catch and log
 * @param {Error} err
 * @param {String} message
 */
function logErr(err, message) {
  var callee,
    wrapper;

  if (err instanceof Error) {
    callee = arguments.callee;
    wrapper = new errors.Error(err, message || '', function (message) {
      this.message = message;
      this.errorCallee = callee;
    });

    // output to stderr
    console.error(wrapper.stack);

    return err;
  }
}

/**
 * Catch error
 * @param {Error} err
 * @param {Function} callback
 */
function catchErr(err, callback) {
  if (err instanceof Error) {
    if (typeof callback === 'function') {
      callback(err);
    }

    return err;
  }
}

/**
 * Throw error
 * @param {Error} err
 * @param {String} message
 */
function fatalErr(err, message) {
  var callee;

  if (err instanceof Error) {
    callee = arguments.callee;

    throw new errors.FatalError(err, message || '', function (message) {
      this.message = message;
      this.errorCallee = callee;
    });
  }
}

/**
 * Define new error
 * @param {String} name Name of the error, must begin with a capital letter
 * @param {String} message Default message
 * @param {Function} [construct] Optional contructor
 */
function defineErr(name, message, construct) {
  if (typeof name === 'object') {
    message = name.message || '';
    name = name.name;
    construct = name.construct;
  }

  if (typeof message === 'function' && !construct) {
    construct = message;
    message = '';
  }

  if (!/^[A-Z]/.test(name)) {
    throw new errors.FatalError('Error name must begin with a capital letter');
  }

  errors[name] = CustomNamedError;

  // wrapper class
  function CustomNamedError() {
    var args = Array.prototype.slice.call(arguments, 0);

    if (args.length === 0) {
      args.push(message);
    }

    if (construct) {
      args.push(construct);
    }

    args.unshift(name);
    errors.NamedError.apply(this, args);
  }

  util.inherits(CustomNamedError, errors.NamedError);

  return errors[name];
}

/**
 * Find HTTP status code
 * 
 * @param {Error} err 
 */ 
function statusCode(err){
  var statusCode;
  
  switch (err.name) {
  case 'AuthenticationError':
    statusCode = 401;
    break;
  case 'ForbiddenError':
    statusCode = 403;
    break;
  case 'NotFoundError':
  case 'DirectoryNotFoundError':
  case 'FileNotFoundError':
  case 'URIError':
    statusCode = 404;
    break;
  case 'NotAllowedError':
    statusCode = 405;
    break;
  case 'NotAcceptableError':
    statusCode = 406;
    break;
  case 'TimeoutError':
    statusCode = 408;
    break;
  case 'ConflictError':
    statusCode = 408;
    break;
  case 'PreconditionError':
    statusCode = 412;
    break;
  case 'TooLargeError':
    statusCode = 413;
    break;
  case 'URITooLongError':
    statusCode = 414;
    break;
  case 'UnsupportedError':
    statusCode = 415;
    break;
  case 'RangeError':
    statusCode = 416;
    break;
  case 'RateLimiterError':
    statusCode = 429;
    break;
  case 'FatalError':
    statusCode = 500;
    break;
  case 'ResourceBusyError':
    statusCode = 503;
    break;
  case 'ConnectionError':
    statusCode = 504;
    break;
  default:
    statusCode = 500;
  }
  
  return statusCode;
}
