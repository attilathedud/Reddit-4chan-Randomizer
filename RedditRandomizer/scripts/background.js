var key_handler;

var options = {
    "hotkeyInformation"     : {},
    "showLoadingDialog"     : true,
    "isActivated"           : true,
    "includeNsfwResults"    : false,
    "excludedBoards"        : ''
};

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
                message: '<span><img src="' + chrome.extension.getURL("../imgs/ajax-loader.gif") + '" /> Loading... </span>',
                css: { backgroundColor: '#000000', fontSize: '20px', fontWeight: 'normal', color: '#ffffff', border: '0', borderRadius: '5px', padding: '20px' }
            });
        }

        if( window.location.href.includes(".4chan.org") ) {

            $.getJSON( "https://a.4cdn.org/boards.json", function( data ) {
                var possible_boards = data.boards;

                if( !options[ "includeNsfwResults" ] ) {
                    possible_boards = possible_boards.filter( board => !nsfw_boards.includes( board.board ) );
                }

                var excludeBoardsFormatted = $.map( options[ "excludedBoards" ].split( ',' ), $.trim );
                possible_boards = possible_boards.filter( board => !excludeBoardsFormatted.includes( board.board ) );

                if( possible_boards.length == 0 ) {
                    $.unblockUI();
                    return true;
                }

                var selected_board = get_random_index( possible_boards ).board;

                $.getJSON( "https://a.4cdn.org/" + selected_board + "/threads.json", function( data ) {
                    var selected_page = get_random_index( data );
                    var selected_thread   = get_random_index( selected_page.threads ).no;
                    
                    window.location = 'https://boards.4chan.org/' + selected_board + '/thread/' + selected_thread;
                })
                .fail(function() {
                    $.unblockUI();
                });
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


