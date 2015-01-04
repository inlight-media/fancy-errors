// variables
var rxError = new RegExp(/^(\w+)\:\s(.*)$/),
  rxCause = new RegExp(/^\s+<-\s(\w+)\:\s(.*)$/),
  rxAt = new RegExp(/^\s+at\s(.*)$/),
  rxFile = new RegExp(/([^\\\/]+):(\d+):(\d+)$/),
  rxRef = new RegExp(/^(.*)\s\(([^\)]+)\)$/);

// exportx
module.exports = prettyStack;

/**
 * Beautify .stack
 * @param {Error} err Error object
 * @returns {Error} Original error
 */
function prettyStack(err) {
  var lines = err.stack.split('\n'),
    stack = '',
    atLines = 0,
    errorLines = 0;

  lines.forEach(function (line) {
    var match;

    match = line.match(rxError);
    if (match) {
      stack += processLineError(line, match) + (errorLines === 0 && err.code ? ' (' + err.code + ')' : '') + '\n';
      errorLines += 1;
      return;
    }

    match = line.match(rxCause);
    if (match) {
      stack += processLineCause(line, match) + '\n';
      return;
    }

    match = line.match(rxAt);
    if (match) {
      if (atLines === 0) {
        stack += '\nStack trace:';
      }

      stack += processLineAt(line, match);
      atLines += 1;
      return;
    }

    stack += line + '\n';
  });

  err.stack = stack + '\n';

  return err;
}

/**
 * @private
 * @param {String} line Stack line
 * @param {Array} match Matched values
 * @returns {String} Formatted string
 */
function processLineError(line, match) {
  return '\x1b[31m' + match[1] + ':\x1b[0m ' + match[2] + '\x1b[0m';
}

/**
 * @private
 * @param {String} line Stack line
 * @param {Array} match Matched values
 * @returns {String} Formatted string
 */
function processLineCause(line, match) {
  return ' \u2190  \x1b[31m' + match[1] + ':\x1b[0m ' + match[2] + '\x1b[0m';
}

/**
 * @private
 * @param {String} line Stack line
 * @param {Array} match Matched values
 * @returns {String} Formatted string
 */
function processLineAt(line, match) {
  var prefix = '\n \u21B3  \x1b[1;34m',
    submatch, filematch;

  submatch = match[1].match(rxFile);
  if (submatch) {
    // contains only file name
    return prefix + submatch[1] + '\x1b[1;30m:\x1b[1;34m' + submatch[2] + '\x1b[0m\n    \x1b[1;30m' + match[1] + '\x1b[0m';

  }

  submatch = match[1].match(rxRef);
  if (submatch) {
    // contains also a function name or reference
    filematch = submatch[2].match(rxFile);

    if (!filematch) {
      return prefix + submatch[2] + '\x1b[0m ' + submatch[1] + '\x1b[0m\n    \x1b[1;30m' + submatch[2] + '\x1b[0m';
    }

    return prefix + filematch[1] + '\x1b[1;30m:\x1b[1;34m' + filematch[2] + '\x1b[0m ' + submatch[1] + '\x1b[0m\n    \x1b[1;30m' + submatch[2] + '\x1b[0m';
  }

  return prefix + match[1];
}