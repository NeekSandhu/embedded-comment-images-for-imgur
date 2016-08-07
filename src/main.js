/**
 * Please don't judge my Javascript skills based on selectors I used here, I just used chrome devtools to do that. It was just easy. Sorry
 */
(function () {
    "use strict";
    var lastPostId = "";
    setup();
    function setup() {
        var loopCheck = setInterval(function() {
            console.log();
            if(document.querySelector(".comments-loaded") !== null) {
                clearInterval(loopCheck);
                init();
            }
        }, 100);
    }

    function init() {
        console.log("init_embeddify");
        lastPostId = window.location.pathname;
        embeddify();

        // TO - DO
        // I couldn't find a neat way to check for post change, fix ASAP
        setInterval(() => {
            let postId = window.location.pathname;
            if(postId !== lastPostId) {
                lastPostId = postId;
                setup();
            }
        }, 500);
        // var postContainer = document.querySelector("#inside > div.left.post-pad > div.post-container");
        // var postLoad_observer = new MutationObserver((e) => {
        //     console.log(e);
        //     setup();
        // });
        // postLoad_observer.observe(postContainer, {subtree: true, childList: true});

        var commnentsContainer = document.querySelector("#captions > div.children");
        var commentsLoad_observer = new MutationObserver((e) => {
            embeddify();
        });
        commentsLoad_observer.observe(commnentsContainer, {childList: true, subtree: true});
    }

    function embeddify() {
        var allLinks = document.querySelectorAll(".linkified");
        console.log(allLinks.length);
        allLinks.forEach((element) => {
            let link = element.querySelector('a').href;
            if(link.search(/\.png|\.jpeg|\.jpg|\.gif/ig) !== -1) {
                let img = document.createElement('img');
                img.src = link;
                img.style.width = "400px";
                img.style.display = "block";
                element.appendChild(img);
                element.className = "embeddified";
            }
        }, this);
    }
}());