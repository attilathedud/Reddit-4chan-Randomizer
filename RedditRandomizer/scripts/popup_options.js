$(document).ready( function() {

    chrome.storage.local.get({
        hotkeyInformation           : {},
        showLoadingDialog           : true,
        isActivated                 : true,
        includeNsfwResults          : false,
        excludedBoards              : ''
    }, function ( items ) {
        var hotkeyInformation       = items.hotkeyInformation;
        var bShowLoadingDialog      = items.showLoadingDialog;
        var bIsActivated            = items.isActivated;
        var bIncludeNsfwResults     = items.includeNsfwResults;
        var excludedBoards          = items.excludedBoards;

        if( bShowLoadingDialog) {
            $('#chkShowLoadingDialog').attr('checked',  true);
        }

        if( !bIsActivated ) {
            $('#btnActivateDeactive').toggleClass('button-primary').text( "Activate" );
        }

        if( bIncludeNsfwResults ) {
            $('#chkIncludeNsfwResults').attr('checked',  true);
        }

        $('#txtExcludedBoards').val( excludedBoards );

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

        if( $.isEmptyObject( hotkeyInformation ) ) {
            $('#txtHotkey').defaultKeyCombinator();
        }
        else {
            $('#txtHotkey').val( hotkeyInformation.comboString );
        }

        $('#btnActivateDeactive').on('click', function() {
            $(this).toggleClass('button-primary').text( $(this).text() == "Deactivate" ? "Activate" : "Deactivate" );
            bIsActivated = !bIsActivated;
            chrome.storage.local.set( { isActivated: bIsActivated } );
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

