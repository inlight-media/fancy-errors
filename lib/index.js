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
  catchName: catchNamedErr,
  fatal: fatalErr,
  pretty: require('./pretty'),
  define: defineErr,
  statusCode: statusCode,
  logLevel: logLevel,
  serialize: serialize
};

// define common errors
commonErrors(errors);

/**
 * Catch and log
 * @param {Error} err Error to catch
 * @param {String} [message] Optional wrapper message
 * @returns {Error} Original error
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
 * @param {Error} err Error to catch
 * @param {Function} callback Callback function that will be fired in case of error
 * @param {String} [message] Optional wrapper message
 * @returns {Error} Original error
 */
function catchErr(err, callback, message) {
  var callee,
    wrapper;

  if (err instanceof Error) {
    if (message === undefined) {
      callback(err);
      return err;
    }

    callee = arguments.callee;
    wrapper = new errors.Error(err, message || '', function (message) {
      this.message = message;
      this.errorCallee = callee;
    });

    if (typeof callback === 'function') {
      callback(wrapper);
    }

    return err;
  }
}

/**
 * Catch named error
 * @param {String} name Name of the error object to catch
 * @param {Error} err Error
 * @param {Function} callback Callback function that will be fired in case of error
 * @param {String} [message] Optional wrapper message
 * @returns {Error} Original error
 */
function catchNamedErr(name, err, callback, message) {
  var callee,
    wrapper;

  if (err instanceof Error && (err.name === name || (name instanceof Array && ~name.indexOf(err.name)))) {
    if (message === undefined) {
      callback(err);
      return err;
    }

    callee = arguments.callee;
    wrapper = new errors.Error(err, message || '', function (message) {
      this.message = message;
      this.errorCallee = callee;
    });

    if (typeof callback === 'function') {
      callback(wrapper);
    }

    return err;
  }
}

/**
 * Throw error
 * @param {Error} err Error to catch
 * @param {String} [message] Optional wrapper error
 * @throws {errors.FatalError}
 * @returns {void}
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
 * @returns {Error} Defined error
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

function serialize(err) {
  var children = [];

  if (err.errors instanceof Array) {
    for (var i = 0, len = err.errors.length; i < len; i++) {
      var childErr = err.errors[i];
      children.push(typeof childErr.messageOriginal === 'string' ? childErr.messageOriginal : childErr.message);
    }

  } else if (typeof err.errors === 'object') {
    for (var i = 0, keys = Object.keys(err.errors), len = keys.length; i < len; i++) {
      var childErr = err.errors[keys[i]];
      children.push(typeof childErr.messageOriginal === 'string' ? childErr.messageOriginal : childErr.message);
    }
  }

  return {
    error: typeof err.messageOriginal === 'string' ? err.messageOriginal : err.message,
    errorName: err.name,
    errorCode: err.code,
    errors: children.length ? children : undefined
  };
}

/**
 * Find HTTP status code
 * @param {Error} err Error object
 * @returns {Number} HTTP status code
 */
function statusCode(err) {
  if (typeof err.statusCode !== 'undefined') {
    return err.statusCode;
  }

  var code;
  switch (err.name) {
  case 'AuthenticationError':
    code = 401;
    break;
  case 'ForbiddenError':
    code = 403;
    break;
  case 'NotFoundError':
  case 'DirectoryNotFoundError':
  case 'FileNotFoundError':
  case 'URIError':
    code = 404;
    break;
  case 'NotAllowedError':
    code = 405;
    break;
  case 'NotAcceptableError':
    code = 406;
    break;
  case 'TimeoutError':
    code = 408;
    break;
  case 'ConflictError':
    code = 408;
    break;
  case 'PreconditionError':
    code = 412;
    break;
  case 'TooLargeError':
    code = 413;
    break;
  case 'URITooLongError':
    code = 414;
    break;
  case 'UnsupportedError':
    code = 415;
    break;
  case 'RangeError':
    code = 416;
    break;
  case 'ValidationError':
    code = 422;
    break;
  case 'RateLimiterError':
    code = 429;
    break;
  case 'FatalError':
    code = 500;
    break;
  case 'ResourceBusyError':
    code = 503;
    break;
  case 'ConnectionError':
    code = 504;
    break;
  default:
    code = 500;
  }

  return code;
}

/**
 * Get a log level
 * @param {Type} err Error object
 * @returns {String} Log level (fatal, warning, debug)
 */
function logLevel(err) {
  var level;

  switch (err.name) {
  case 'FatalError':
  case 'ConnectionError':
    level = 'fatal';
    break;
  case 'IOError':
  case 'DirectoryNotFoundError':
  case 'FileNotFoundError':
  case 'FileLoadError':
  case 'URIError':
  case 'NotFoundError':
  case 'ResourceBusyError':
  case 'TimeoutError':
    level = 'warning';
    break;
  default:
    level = 'debug';
  }

  return level;
}