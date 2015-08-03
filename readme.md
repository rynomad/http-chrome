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

Using with Express
------
Since this module copies the native Node module JavaScript, it can be used as a drop-in replacement with express. Either build your project with the above usage of browserify, or do something like this:

```
var http = require("http-chrome")
var app = require("express")();
http.createServer(app).listen(3000)
```

Caveats
----
- You'll likely be unable to listen on low numbered ports (no 80) due to chromes permissions
- Any modules that depend on eval will need creative work-arounds (the biggest pains seen yet have been handlebars and depd)
- with express, turn off etag generation (browserify-fs doesn't have a compatible stat object)

hacking
----

the default gulp task will build the library. rather than manipulating the code directly when contributing, see if you can fix your bug by manipulating the gulp task so that we can keep it easy to stay up to date with node core.

