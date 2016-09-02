$(document).ready( function() {

    chrome.storage.local.get({
        hotkeyInformation           : {},
        showLoadingDialog           : true,
        isActivated                 : true,
        includeNsfwResults          : false
    }, function ( items ) {
        var hotkeyInformation       = items.hotkeyInformation;
        var bShowLoadingDialog      = items.showLoadingDialog;
        var bIsActivated            = items.isActivated;
        var bincludeNsfwResults     = items.includeNsfwResults;

        if( bShowLoadingDialog) {
            $('#chkShowLoadingDialog').attr('checked',  true);
        }

        if( !bIsActivated ) {
            $('#btnActivateDeactive').toggleClass('button-primary').text( "Activate" );
        }

        if( bincludeNsfwResults ) {
            $('#chkIncludeNsfwResults').attr('checked',  true);
        }

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
            chrome.storage.local.set( {isActivated: bIsActivated} );
        });

        $('#chkShowLoadingDialog').on('change', function() {
            chrome.storage.local.set( {showLoadingDialog: $('#chkShowLoadingDialog').is(":checked")} );
        });

        $('#chkIncludeNsfwResults').on('change', function() {
            chrome.storage.local.set( {includeNsfwResults: $('#chkIncludeNsfwResults').is(":checked")} );
        });
    });

});

