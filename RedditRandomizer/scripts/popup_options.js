/*!
*   Called when our pop-up options modal is rendered. Responsible for filling in values to their saved state.
*/
$( function() {

    chrome.storage.local.get({
        hotkeyInformation           : {},
        showLoadingDialog           : true,
        isActivated                 : true,
        includeNsfwResults          : false,
        excludedBoards              : ''
    }, function ( items ) {

        //Set up the "Show Loading Dialog" option
        $('#chkShowLoadingDialog').attr('checked',  items.showLoadingDialog);
        $('#chkShowLoadingDialog').on('change', function() {
            chrome.storage.local.set( { showLoadingDialog: $('#chkShowLoadingDialog').is( ":checked" ) } );
        });

        //Set up the "Include NSFW Results" option
        $('#chkIncludeNsfwResults').attr('checked',  items.includeNsfwResults);
        $('#chkIncludeNsfwResults').on('change', function() {
            chrome.storage.local.set( { includeNsfwResults: $('#chkIncludeNsfwResults').is( ":checked" ) } );
        });

        //Set up the "Activate" button
        if( !items.isActivated ) {
            $('#btnActivateDeactive').toggleClass('button-primary').text( "Activate" );
        }
        $('#btnActivateDeactive').on('click', function() {
            $(this).toggleClass('button-primary').text( $(this).text() == "Deactivate" ? "Activate" : "Deactivate" );
            chrome.storage.local.set( { isActivated: $(this).text() == "Deactivate" ? true : false } );
        });

        //Set up the "Excluded Boards"
        $('#txtExcludedBoards').val( items.excludedBoards );
        $('#btnExcludedBoardsSave').on('click', function() {
            chrome.storage.local.set( { excludedBoards : $('#txtExcludedBoards').val( ) } );
        });

        //Set up the "Hotkey" box
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

    });

});

