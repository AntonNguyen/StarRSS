(function() {
    var self = this;
    $(function() {
        var animationEnd = "animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd";
        var transitionEnd = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";
        var fetch = null;
        var showResponse;
        
        getUrlFromHash = function() {
            var match;
            match = window.location.hash.match(/#(.+)$/);
            if (match) {
                var url = match[1];
                if (url.indexOf('http') != 0) {
                    return 'http://' + url
                } else {
                    return url;
               }
            }
        };
        
        showResponse = function() {
            $(".plane").show();
            return fetch.done(function(data) {
                playCommit(data.responseData.feed.entries);
            }).fail(function(problem) {
                console.log(problem);
                return playError();
            });
        };
        
        playCommit = function(messages) {
            document.getElementById("theme").play();
            return crawl(messages);
        };
        
        playError = function() {
            document.getElementById("imperial_march").play();
            return crawl([ "Tun dun dun, da da dun, da da dun ...", "Couldn't find the repo, the repo!" ]);
        };
        
        crawl = function(messages) {
            var counter, delay;
            counter = 0;
            delay = function() {
                var lastMessageDivHeight;
                lastMessageDivHeight = $(".content:last").height();
                return 1e3 + 500 * lastMessageDivHeight / 18;
            };
            if (messages.length > 0) {
                $(".plane").append($("<a>", {
                    "class": "content",
                    "href": messages[0].link,
                }).text(messages[0].title));
                setTimeout(function() {
                    return crawl(messages.slice(counter));
                }, delay());
                return ++counter;
            } else {
                return counter = 0;
            }
        };
        
        if (rss = getUrlFromHash()) {
            fetch = $.ajax({
                url: 'http://ajax.googleapis.com/ajax/services/feed/load',
                data: {v: '1.0', q: rss, num: 100},
                dataType: 'jsonp',
            });
            return showResponse();
        } else {
            $("input").keyup(function(event) {
                if (event.keyCode === 13) {
                    var rss = $(this).val();
                    window.history.pushState(null, null, '#' + rss);
                    fetch = $.ajax({
                        url: 'http://ajax.googleapis.com/ajax/services/feed/load',
                        data: {v: '1.0', q: rss, num: 100},
                        dataType: 'jsonp',
                    });
                    document.getElementById("falcon_fly").play();
                    return $(this).parent().addClass("zoomed");
                }
            });
            $(".input").on(transitionEnd, function() {
                return showResponse();
            });
        }
        $(document).on(animationEnd, ".content", function() {
            return $(this).remove();
        });
        
        return $(".input").show();
    });
}).call(this);
