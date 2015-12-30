$(document).keydown(function (e) {
    var keyCode = e.keyCode || e.which;
    var rightArrow = 39;

    if( keyCode == rightArrow && e.shiftKey) {
        window.location = 'https://www.reddit.com/r/random';
    }
});
