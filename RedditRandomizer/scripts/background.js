var key_handler;

var hotkeyInformation           = {}
var bShowLoadingDialog          = true;
var bIsActivated                = true;
var bIncludeNsfwResults         = false;

function init_handler( ) {
    var hotkey_jwerty_combo     = '';

    if( $.isEmptyObject( hotkeyInformation ) ) {
        hotkey_jwerty_combo = '⇧+→'
    }
    else {
        hotkey_jwerty_combo = hotkeyInformation.comboString.split('').join('+');
    }

    key_handler = jwerty.key( hotkey_jwerty_combo, function ( ) { 
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
    });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];

        if( key == "hotkeyInformation" ) {
            hotkeyInformation = storageChange.newValue;

            key_handler.unbind();
            init_handler();
        }

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
    hotkeyInformation           : {},
    showLoadingDialog           : true,
    isActivated                 : true,
    includeNsfwResults          : false
}, function ( items ) {
    hotkeyInformation           = items.hotkeyInformation;
    bShowLoadingDialog          = items.showLoadingDialog;
    bIsActivated                = items.isActivated;
    bIncludeNsfwResults         = items.includeNsfwResults;

    init_handler( );
});


