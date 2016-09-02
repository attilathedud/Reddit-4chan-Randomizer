var bShowLoadingDialog = true;
var bIsActivated = true;
var bIncludeNsfwResults = false;

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];

        if( key == "showLoadingDialog" ) {
            bShowLoadingDialog = storageChange.newValue;
        }

        if( key == "isActivated" ) {
            bIsActivated = storageChange.newValue;
        }

        if( key == "includeNsfwResults" ) {
            bIncludeNsfwResults = storageChange.newValue;
        }
    }
});

chrome.storage.local.get({
    showLoadingDialog : true,
    isActivated: true,
    includeNsfwResults : false
}, function ( items ) {
    bShowLoadingDialog = items.showLoadingDialog;
    bIsActivated = items.isActivated;
    bIncludeNsfwResults = items.includeNsfwResults;

    $(document).keydown(function (e) {
        var keyCode = e.keyCode || e.which;
        var rightArrow = 39;

        if( keyCode == rightArrow && e.shiftKey) {

            if( !!!bIsActivated ) return true;

            if( bShowLoadingDialog ) {
                $.blockUI({
                    message: '<h1><img src="' + chrome.extension.getURL("../imgs/ajax-loader.gif") + '" /> Loading... </h1>',
                    css: { backgroundColor: '#000000', color: '#ffffff', border: '0', borderRadius: '5px', padding: '10px' }
                });
            }

            if( bIncludeNsfwResults && Math.random() < 0.5 ) {
                window.location = 'https://www.reddit.com/r/randnsfw';
            }
            else {
                window.location = 'https://www.reddit.com/r/random';
            }
        }
    });
});


