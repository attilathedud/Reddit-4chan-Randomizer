$(document).ready( function() {

    chrome.storage.local.get({
        showLoadingDialog : true,
        isActivated: true,
        includeNsfwResults: false
    }, function ( items ) {
        var bShowLoadingDialog = items.showLoadingDialog;
        var bIsActivated = items.isActivated;
        var bincludeNsfwResults = items.includeNsfwResults;

        if( bShowLoadingDialog) {
            $('#chkShowLoadingDialog').attr('checked',  true);
        }

        if( !bIsActivated ) {
            $('#btnActivateDeactive').toggleClass('button-primary').text( "Activate" );
        }

        if( bincludeNsfwResults ) {
            $('#chkIncludeNsfwResults').attr('checked',  true);
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

