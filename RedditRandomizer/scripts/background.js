var key_handler;

var options = {
    "hotkeyInformation"     : {},
    "showLoadingDialog"     : true,
    "isActivated"           : true,
    "includeNsfwResults"    : false,
    "excludedBoards"        : ''
};

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

    if( $.isEmptyObject( options["hotkeyInformation"] ) ) {
        hotkey_jwerty_combo = '⇧+→'
    }
    else {
        hotkey_jwerty_combo = options["hotkeyInformation"].comboString.split('').join('+');
    }

    key_handler = jwerty.key( hotkey_jwerty_combo, function ( ) { 
        if( !!!options["isActivated"] ) return true;

        if( options["showLoadingDialog"] ) {
            $.blockUI({
                message: '<h1><img src="' + chrome.extension.getURL("../imgs/ajax-loader.gif") + '" /> Loading... </h1>',
                css: { backgroundColor: '#000000', color: '#ffffff', border: '0', borderRadius: '5px', padding: '10px' }
            });
        }

        if( window.location.href.includes(".4chan.org") ) {
            var selected_board  = '';
            var selected_thread = '';

            var possible_boards = sfw_boards;
            if( options["includeNsfwResults"] ) {
                possible_boards = sfw_boards.concat( nsfw_boards );
            }

            var excludeBoardsFormatted = $.map( options["excludedBoards"].split(','), $.trim );
            possible_boards = $( possible_boards ).not( excludeBoardsFormatted ).get();

            if( possible_boards.length == 0 ) {
                $.unblockUI();
                return true;
            }

            selected_board = get_random_index( possible_boards );

            $.getJSON( "https://a.4cdn.org/" + selected_board + "/threads.json", function( data ) {
                var selected_page = get_random_index( data );
                selected_thread   = get_random_index( selected_page.threads ).no;
                
                window.location = 'https://boards.4chan.org/' + selected_board + '/thread/' + selected_thread;
            })
            .fail(function() {
                $.unblockUI();
            });
        }
        else {
            window.location = 'https://www.reddit.com/r/' + 
                ( ( options["includeNsfwResults"] && Math.random() < 0.5 ) ? 'randnsfw' : 'random' );
        }
    });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];

        options[ key ] = storageChange.newValue;

        if( key == "hotkeyInformation" ) {
            key_handler.unbind();
            init_handler();
        }
    }
});

chrome.storage.local.get({
    hotkeyInformation           : {},
    showLoadingDialog           : true,
    isActivated                 : true,
    includeNsfwResults          : false,
    excludedBoards              : ''
}, function ( items ) {
    for( key in items ) {
        options[ key ] = items[ key ];
    }

    init_handler( );
});


