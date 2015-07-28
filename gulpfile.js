var gulp = require("gulp");
var http = require("https");
var replace = require("replacestream");
var fs   = require("fs");
var lib = ["agent","client","common","incoming","outgoing","server"];
function store(res, libn){
  res.pipe(replace("'_http_","'./_http_"))
     .pipe(replace("'stream'","'readable-stream'"))
     .pipe(replace("'timers'","'timers-browserify-full'"))
     .pipe(replace("util = require('util');", "util = require('util');\nvar inherits = require('inherits');"))
     .pipe(replace("util.inherits(", "inherits("))
     .pipe(replace("// USE OR OTHER DEALINGS IN THE SOFTWARE.", "// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nvar exports = module.exports = {};\n"))
     .pipe(replace("process.binding('http_parser').HTTPParser", "require('http-parser-js').HTTPParser"))
     .pipe(replace(/DTRACE_.*;/g, ''))
     .pipe(replace(/COUNTER_.*;/g,''))
     .pipe(fs.createWriteStream(__dirname + "/lib/" + libn + ".js"))
}

gulp.task("default",function(){
  lib.forEach(function(libn){
    http.get("https://raw.githubusercontent.com/joyent/node/v0.12.7-release/lib/_http_" + libn +".js", function(res){
      store(res, "_http_" + libn)
    });
  })


  http.get("https://raw.githubusercontent.com/joyent/node/master/lib/http.js", function(res){
    store(res, "http");
  })

})
