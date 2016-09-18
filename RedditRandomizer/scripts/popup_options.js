$( function() {

    chrome.storage.local.get({
        hotkeyInformation           : {},
        showLoadingDialog           : true,
        isActivated                 : true,
        includeNsfwResults          : false,
        excludedBoards              : ''
    }, function ( items ) {

        if( items.showLoadingDialog ) {
            $('#chkShowLoadingDialog').attr('checked',  true);
        }

        if( !items.isActivated ) {
            $('#btnActivateDeactive').toggleClass('button-primary').text( "Activate" );
        }

        if( items.includeNsfwResults ) {
            $('#chkIncludeNsfwResults').attr('checked',  true);
        }

        $('#txtExcludedBoards').val( items.excludedBoards );

        $('#txtHotkey').makeKeyCombinator({
            defaultCombos: {
                mac:  ['⇧', '→'],
                win:  ['⇧', '→'],
                unix: ['⇧', '→']
            },
            onComplete: function( newCombo ) {
                chrome.storage.local.set( { hotkeyInformation : newCombo } );
            }
        });

        if( $.isEmptyObject( items.hotkeyInformation ) ) {
            $('#txtHotkey').defaultKeyCombinator();
        }
        else {
            $('#txtHotkey').val( items.hotkeyInformation.comboString );
        }

        $('#btnActivateDeactive').on('click', function() {
            $(this).toggleClass('button-primary').text( $(this).text() == "Deactivate" ? "Activate" : "Deactivate" );
            chrome.storage.local.set( { isActivated: $(this).text() == "Deactivate" ? true : false } );
        });

        $('#chkShowLoadingDialog').on('change', function() {
            chrome.storage.local.set( { showLoadingDialog: $('#chkShowLoadingDialog').is( ":checked" ) } );
        });

        $('#chkIncludeNsfwResults').on('change', function() {
            chrome.storage.local.set( { includeNsfwResults: $('#chkIncludeNsfwResults').is( ":checked" ) } );
        });

        $('#btnExcludedBoardsSave').on('click', function() {
            chrome.storage.local.set( { excludedBoards : $('#txtExcludedBoards').val( ) } );
        });
    });

});

