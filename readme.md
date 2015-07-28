http-chrome
---

using chrome-net, and liberal use of gulp + replacestream, this module offers node's native http module in chrome apps.

How to use
----
With browserify. You can either require('http-chrome') directly, or if you've got modules that depend on http and you want to replace them, you can use browserifies programatic API in a build script (since browesrify already has its own browser http shim for client requests via xhr, it's a little tricker than normal):

```
var browserify = require("browserify")
var builtins = require('browserify/lib/builtins.js')

builtins.http = require.resolve('http-chrome')
builtins.timers = require.resolve("timers-browserify-full"); //this is generally a good idea when working with node server modules

browserify("index.js").bundle().pipe(fs.createWriteStream("bundle.js"))
```


hacking
----

the default gulp task will build the library. rather than manipulating the code directly when contributing, see if you can fix your bug by manipulating the gulp task so that we can keep it easy to stay up to date with node core.
