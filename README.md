Preview: http://fotcorn.github.io/StarRSS/

This project is based on StarLogs by artemave: https://github.com/artemave/StarLogs

The RSS feed is loaded with the Google Feed API: https://developers.google.com/feed/


###Howto Hack: 

Get sass:
    $ gem install sass # with sudo unless on rvm, rbenv, etc.

Leave it autocompile:
    $ sass --watch stylesheets:stylesheets

Host it on a local server, e.g.:
    $ python -m SimpleHTTPServer

Or if you are more a Node.JS guy:
    $ npm install -g serve
    $ serve
    