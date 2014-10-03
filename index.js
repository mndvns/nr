/**
 * Module dependencies
 */

var fs = require('fs');
var util = require('util');

/**
 * Expose `nr`
 */

module.exports = nr;

/**
 * Take a `repl` and write the history to `file`
 * @param {REPL} REPL
 * @param {Path} file
 */

function nr(REPL, options){

  // file to store history
  var file = options.root + '/' + process.cwd().replace(/\//g, '~');

  // start repl
  var repl = REPL.start({
    prompt: options.prompt,
    useGlobal: !options.global,
    terminal: !options.noTty,
    useColors: !options.noColors,
    ignoreUndefined: options.noUndefined
  });

  // load rli history from file
  try {
    var stat = fs.statSync(file);
    repl.rli.history = fs.readFileSync(file, 'utf-8').split('\n').reverse();
    repl.rli.history.shift();
  } catch (e) {}

  // open file for appending
  var fd = fs.openSync(file, 'a');
  var reval = repl.eval;
  repl.rli.addListener('line', function(code) {
    if (code && code !== '.history') {
      fs.write(fd, code + '\n');
    } else {
      repl.rli.historyIndex++;
      repl.rli.history.pop();
    }
  });

  process.on('exit', function() {
    fs.closeSync(fd);
  });

  repl.commands['.history'] = {
    help : 'Show the history',
    action : function() {
      var out = [];
      repl.rli.history.forEach(function(v, k) {
        out.push(v);
      });
      repl.outputStream.write(out.reverse().join('\n') + '\n');
      repl.displayPrompt();
    }
  };
}
