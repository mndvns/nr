# nr

A repl wrapper for node. Pass repl options as flags and get persistent
history of commands in the context of the working directory.

## Installation

```sh
npm install -g nr
```

## Usage

Via `nr --help`:

```sh

  Usage: nr [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -r, --root <dir>       directory to store histories
    -g, --global           use global object instead of separate context
    -p, --prompt <string>  the prompt for all I/O
    -n, --no-colors        disable colors
    -t, --no-tty           don't treat ouput stream as tty
    -i, --no-undefined     don't return value of a command if `undefined`

```

## License

MIT
