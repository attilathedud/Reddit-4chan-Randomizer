$(document).ready( function() {

    chrome.storage.local.get({
        showLoadingDialog : 'true',
        isActivated: 'true',
        redditOrRedditNsfw: 'false'
    }, function ( items ) {
        var bShowLoadingDialog = items.showLoadingDialog;
        var bIsActivated = items.isActivated;
        var bRedditOrRedditNsfw = items.redditOrRedditNsfw;

        if( bShowLoadingDialog) {
            $('#chkShowLoadingDialog').attr('checked',  true);
        }

        if( !bIsActivated ) {
            $('#btnActivateDeactive').toggleClass('button-primary').text( "Activate" );
        }

        if( bRedditOrRedditNsfw ) {
            $('#divReddit').toggleClass('cmn-inactive');
            $('#divRedditNsfw').toggleClass('cmn-inactive');
            $('#chkRedditToggle').attr('checked', true);
        }

        $('#btnActivateDeactive').on('click', function() {
            $(this).toggleClass('button-primary').text( $(this).text() == "Deactivate" ? "Activate" : "Deactivate" );
            bIsActivated = !bIsActivated;
            chrome.storage.local.set( {isActivated: bIsActivated} );
        });

        $('#chkShowLoadingDialog').on('change', function() {
            chrome.storage.local.set( {showLoadingDialog: $('#chkShowLoadingDialog').is(":checked")} );
        });

        $('#chkRedditToggle').on('change', function() {
            $('#divReddit').toggleClass('cmn-inactive');
            $('#divRedditNsfw').toggleClass('cmn-inactive');

            chrome.storage.local.set( {redditOrRedditNsfw: $('#chkRedditToggle').is(":checked")} );
        });

    });

});

