var assert = require('assert'),
  STATUS_CODES = require('http').STATUS_CODES,
  errors = require('../index');

describe('Setup', function () {
  it('should have functions defined', function () {
    assert(errors.Error, '.Error is not defined');
    assert(errors.NamedError, '.NamedError is not defined');
    assert(errors.define, '.define is not defined');
    assert(errors.catch, '.catch is not defined');
    assert(errors.fatal, '.fatal is not defined');
    assert(errors.pretty, '.pretty is not defined');
    assert(errors.log, '.log is not defined');
  });
});

describe('.Error', function () {
  it('should create and throw new error', function () {
    var msg = 'test_message',
      err = new errors.Error(msg);

    assert.throws(function () {
      throw err;
    }, Error);

    assert.equal(err.message, msg, 'invalid .message parameter');
    assert.equal(err.code, undefined, 'invalid .code parameter');
  });
});

describe('.NamedError', function () {
  it('should create and throw new error', function () {
    var msg = 'test_message',
      name = 'TestError',
      err = new errors.NamedError(name, msg);

    assert.throws(function () {
      throw err;
    }, Error);

    assert.equal(err.name, name, 'invalid .name parameter');
    assert.equal(err.message, msg, 'invalid .message parameter');
    assert.equal(err.code, undefined, 'invalid .code parameter');
  });
});

describe('Error chaining', function () {
  it('should be chained', function () {
    var err2 = new errors.Error('err2'),
      err1 = new errors.Error(err2, 'err1'),
      err = new errors.Error(err1, 'err');

    assert.throws(function () {
      throw err;
    }, Error);

    assert(err.cause === err1, '.cause is not an Error');
    assert(err1.cause === err2, '.cause is not an Error');
    assert(err2.cause === undefined, '.cause is not undefined');
  });
});

describe('Error sprintf', function () {
  it('should print the error message with sprintf', function () {
    var err = new errors.Error('test %s with %s', 'message', 'sprintf');
    assert.equal(err.message, 'test message with sprintf');
  });
});

describe('Error .code', function () {
  it('should set .code from the message', function () {
    var err = new errors.Error('ERR_CODE, This is an error');
    assert.equal(err.code, 'ERR_CODE');
  });
});

describe('.log', function () {
  it('should output the error', function (done) {
    var msg = 'test_error_message',
      err = new errors.Error(msg),
      cerror = console.error,
      ret;

    console.error = function (e) {
      assert(e.indexOf(msg) >= 0, 'stderr doesn\'t receive the error message');
      done();
      console.error = cerror;
    };

    ret = errors.log(err);

    assert(ret === err, 'Invalid return value');
  })
});

describe('.catch', function () {
  it('should do nothing for err === undefined', function () {
    ret = errors.catch(undefined, function (cbErr) {
      assert(cbErr === undefined, 'Error is set');
    });

    assert(ret === undefined, 'Invalid return value');
  });

  it('should do nothing for err === null', function () {
    ret = errors.catch(null, function (cbErr) {
      assert(cbErr === undefined, 'Error is set');
    });

    assert(ret === undefined, 'Invalid return value');
  });

  it('should pass the error to the callback function', function () {
    var err = new errors.Error(),
      ret;

    ret = errors.catch(err, function (cbErr) {
      assert(cbErr, 'Missing error');
    });

    assert(ret === err, 'Invalid return value');
  });
});

describe('.fatal', function () {
  it('should not throw an error for err === undefined', function () {
    assert.doesNotThrow(function () {
      errors.fatal(undefined);
    }, Error);
  });

  it('should not throw an error for err === null', function () {
    assert.doesNotThrow(function () {
      errors.fatal(null);
    }, Error);
  });

  it('should throw an error', function () {
    var err = new errors.Error();

    assert.throws(function () {
      errors.fatal(err, 'fatal');
    }, Error);
  });
});

describe('.define', function () {
  var msg = 'default_test_msg';

  it('should define TestError', function () {
    errors.define('TestError', msg);
    assert(errors.TestError, 'Failed to define TestError');
  });

  it('should be initialized with a default message', function () {
    var err = new errors.TestError();

    assert.throws(function () {
      throw err;
    }, Error);

    assert.equal(err.message, msg);
  });
});

describe('Pre-defined custom errors', function () {
  it('should have .ArgumentError, .HTTPError, .TypeError', function () {
    assert(errors.ArgumentError, '.ArgumentError not defined');
    assert(errors.HTTPError, '.HTTPError not defined');
    assert(errors.TypeError, '.TypeError not defined');
  });
});

describe('.HTTPError', function () {
  it('should be a 404 error', function () {
    var err = new errors.HTTPError(404);

    assert.throws(function () {
      throw err;
    }, Error);

    assert.equal(err.code, 404);
    assert.equal(err.message, STATUS_CODES[404]);
  });

  it('should be a 500 error with a custom message', function () {
    var msg = '500message',
      err = new errors.HTTPError(500, msg);

    assert.throws(function () {
      throw err;
    }, Error);

    assert.equal(err.code, 500);
    assert.equal(err.message, msg);
  });
});