var key_handler;

var hotkeyInformation           = {}
var bShowLoadingDialog          = true;
var bIsActivated                = true;
var bIncludeNsfwResults         = false;

var sfw_boards                  = [ 'a', 'c', 'w', 'm', 'cgl', 'cm', 'f', 'n', 'jp', 'v', 'vg', 'vp', 'vr',
                                    'co', 'g', 'tv', 'k', 'o', 'an', 'tg', 'sp', 'asp', 'sci', 'his', 'int',
                                    'out', 'toy', 'i', 'po', 'p', 'ck', 'ic', 'wg', 'mu', 'fa', '3', 'gd', 'diy',
                                    'wsg', 'qst', 'biz', 'trv', 'fit', 'x', 'lit', 'adv', 'lgbt', 'mlp', 'news',
                                    'wsr'];

var nsfw_boards                 = [ 'b', 'r9k', 'pol', 'soc', 's4s', 's', 'hc', 'hm', 'h', 'e', 'u', 'd', 'y', 
                                    't', 'hr', 'gif', 'aco', 'r'];


function get_random_index( a ) {
    return a[ Math.floor( Math.random() * a.length ) ];
}

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

        if( window.location.href.includes(".4chan.org") ) {
            var selected_board  = '';
            var selected_thread = '';

            var possible_boards = sfw_boards;
            if( bIncludeNsfwResults && Math.random() < 0.5 ) {
                possible_boards = sfw_boards.concat( nsfw_boards );
            }

            selected_board = get_random_index( possible_boards );

            $.getJSON( "https://a.4cdn.org/" + selected_board + "/threads.json", function( data ) {
                var selected_page = get_random_index( data );
                selected_thread   = get_random_index( selected_page.threads ).no;
                
                window.location = 'https://boards.4chan.org/' + selected_board + '/thread/' + selected_thread;
            });
        }
        else {
            window.location = 'https://www.reddit.com/r/' + 
                ( ( bIncludeNsfwResults && Math.random() < 0.5 ) ? 'randnsfw' : 'random' );
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


