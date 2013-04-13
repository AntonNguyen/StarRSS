(function() {
    var self = this;
    $(function() {
        var animationEnd = "animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd";
        var transitionEnd = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";
        
        crawl = function(messages) {
            var counter, delay;
            counter = 0;
            delay = function() {
                var lastMessageDivHeight;
                lastMessageDivHeight = $(".content:last").height();
                return 1e3 + 500 * lastMessageDivHeight / 18;
            };
            if (messages.length > 0) {
                $(".plane").append($("<div>", {
                    "class": "content"
                }).text(messages[0]));
                setTimeout(function() {
                    return crawl(messages.slice(counter));
                }, delay());
                return ++counter;
            } else {
                return counter = 0;
            }
        };
        playCommit = function(messages) {
            document.getElementById("theme").play();
            return crawl(messages);
        };
        playError = function() {
            document.getElementById("imperial_march").play();
            return crawl([ "Tun dun dun, da da dun, da da dun ...", "Couldn't find the repo, the repo!" ]);
        };
        $(document).on(animationEnd, ".content", function() {
            return $(this).remove();
        });
        $("input").keyup(function(event) {
            if (event.keyCode === 13) {            	
            	var rss = $(this).val();
                $.ajax({
                	url: 'http://ajax.googleapis.com/ajax/services/feed/load',
                	data: {v: '1.0', q: rss, num: 30},
                	dataType: 'jsonp',
                	success: function(data) {
                		var entries = data.responseData.feed.entries;
                		var messages = [];
                		for (i = 0; i < entries.length; i++) {
                			messages.push(entries[i].title)
                		}
                		$(".plane").show();
                		playCommit(messages);
                	}
                });
                document.getElementById("falcon_fly").play();
                return $(this).parent().addClass("zoomed");
            }
        });
        return $(".input").show();
    });
}).call(this);
