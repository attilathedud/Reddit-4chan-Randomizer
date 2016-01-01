var bShowLoadingDialog = true;
var bIsActivated = true;
var bRedditOrRedditNsfw = false;

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];

        if( key == "showLoadingDialog" ) {
            bShowLoadingDialog = storageChange.newValue;
        }

        if( key == "isActivated" ) {
            bIsActivated = storageChange.newValue;
        }

        if( key == "redditOrRedditNsfw" ) {
            bRedditOrRedditNsfw = storageChange.newValue;
        }
    }
});

chrome.storage.local.get({
    showLoadingDialog : 'true',
    isActivated: 'true',
    redditOrRedditNsfw : 'false'
}, function ( items ) {
    bShowLoadingDialog = items.showLoadingDialog;
    bIsActivated = items.isActivated;
    bRedditOrRedditNsfw = items.redditOrRedditNsfw;

    $(document).keydown(function (e) {
        var keyCode = e.keyCode || e.which;
        var rightArrow = 39;

        if( keyCode == rightArrow && e.shiftKey) {

            if( !bIsActivated ) return true;

            if( bShowLoadingDialog == true ) {
                $.blockUI({
                    message: '<h1><img src="' + chrome.extension.getURL("../imgs/ajax-loader.gif") + '" /> Loading... </h1>',
                    css: { backgroundColor: '#000000', color: '#ffffff', border: '0', borderRadius: '5px', padding: '10px' }
                });
            }

            if( !bRedditOrRedditNsfw ) {
                window.location = 'https://www.reddit.com/r/random';
            }
            else {
                window.location = 'https://www.reddit.com/r/randnsfw';
            }
        }
    });
});


