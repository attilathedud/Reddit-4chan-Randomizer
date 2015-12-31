$(document).ready( function() {

    chrome.storage.local.get({
        showLoadingDialog : 'true',
        isActivated: 'true'
    }, function ( items ) {
        var bShowLoadingDialog = items.showLoadingDialog;
        var bIsActivated = items.isActivated;

        if( bShowLoadingDialog) {
            $('#chkShowLoadingDialog').attr('checked',  true);
        }

        if( !bIsActivated ) {
            $('#btnActivateDeactive').toggleClass('button-primary').text( "Activate" );
        }

        $('#btnActivateDeactive').on('click', function() {
            $(this).toggleClass('button-primary').text( $(this).text() == "Deactivate" ? "Activate" : "Deactivate" );
            bIsActivated = !bIsActivated;
            chrome.storage.local.set( {isActivated: bIsActivated} );
        });

        $('#chkShowLoadingDialog').on('change', function() {
            chrome.storage.local.set( {showLoadingDialog: $('#chkShowLoadingDialog').is(":checked")} );
        });
    });

});

