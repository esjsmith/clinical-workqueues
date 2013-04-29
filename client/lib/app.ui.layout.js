detectOrientation();
window.onorientationchange = detectOrientation;
function detectOrientation(){
    console.log('detecting orientation: ' + window.orientation);

    if(typeof window.onorientationchange !== 'undefined'){
        if ( window.orientation === 0 ) {
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForPortrait();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
        else if ( window.orientation === 90 ) {
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
        else if ( window.orientation === -90 ) {
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForLandscape();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
        else if ( window.orientation === 180 ) {
            if(Session.equals('current_page', "#communityPage")){
                resizeCommunityPageForPortrait();
            }
            else if(Session.equals('current_page', "#profilePage")){
                resizeProfilePageForPortrait();
            }
            else if(Session.equals('current_page,"#workqueuesPage')){
                setSidebarVisibility();
            }
        }
    }
}


//-----------------------------------------------------
// appContainerTemplate


Template.appContainerTemplate.rendered = function(){
    if(isMobile){
        $('.touch-trigger').removeClass('touch-disabled');
    }
};


//-----------------------------------------------------
// LANDSCAPE/PORTRAIT FUNCTIONS


function resizeCommunityPageForLandscape(){
    $('#communityInspectionBlock').removeClass('fullwidth padded');
    $('#communityInspectionBlock').removeClass('bottom-anchored');
    $('#communityInspectionColumn').removeClass('fullwidth padded');

    $('#communityInspectionBlock').addClass('forty-percent-width');
    $('#communityInspectionBlock').addClass('first-column-position');
}
function resizeCommunityPageForPortrait(){
    $('#communityInspectionBlock').removeClass('forty-percent-width');
    $('#communityInspectionBlock').removeClass('first-column-position');

    $('#communityInspectionBlock').addClass('fullwidth padded');

    $('#communityInspectionBlock').addClass('bottom-anchored');
    $('#communityInspectionColumn').addClass('fullwidth padded');
}




//-----------------------------------------------------
// JSON Inspection Panel
// Controls for the JSON inspection and debugging panel

Template.jsonContentPanelTemplate.showJsonPanel = function(){
    return Session.get('show_profile_json_panel');
};
Template.jsonContentPanelTemplate.jsonData = function(){
    return Session.get('json_content');
};



//---------------------------------------------------
// DropBox Alert

monitorDropbox = function(){
    try{
        if(Meteor.user().profile.dropbox === null){
            return false;
        }else{
            Session.set('selected_task_id', Todos.findOne(Meteor.user().profile.dropbox)._id);
            Session.set('selected_task_done_status', Todos.findOne(Meteor.user().profile.dropbox).done);
            Session.set('selected_task_star_status', Todos.findOne(Meteor.user().profile.dropbox).star);
            Session.set('selected_task_text', Todos.findOne(Meteor.user().profile.dropbox).text);
            return true;
        }
    }
    catch(err){
        catch_error('monitorDropbox()', err, LogLevel.Notice, this);
    }
};


Template.dropboxAlertTemplate.events({
    'click #dropboxAlertCard':function(){
        Meteor.users.update(Meteor.userId(), {$unset: { 'profile.dropbox': '' }}, function(){});
        Session.set('selected_task_id', Todos.findOne(Meteor.user().profile.dropbox)._id);
    }
});
Template.dropboxAlertTemplate.alert_text = function(){
    try{
        return Todos.findOne(Meteor.user().profile.dropbox).text;
    }catch(error){
        catch_error('Template.dropboxAlertTemplate.text', error, LogLevel.Error, this);
    }
};
Template.dropboxAlertTemplate.alert_image = function(){
    try{
        var foo = Todos.findOne(Session.get('selected_task_id'));
        if(foo.image){
            return foo.image;
        }else{
            return '/images/placeholder-240x240.gif';
        }
    }catch(error){
        catch_error('Template.dropboxAlertTemplate.text', error, LogLevel.Error, this);
    }
};
Template.dropboxAlertTemplate.alert_id = function(){
    try{
        return Todos.findOne(Meteor.user().profile.dropbox)._id;
    }catch(error){
        catch_error('Template.dropboxAlertTemplate.text', error, LogLevel.Error, this);
    }
};
Template.dropboxAlertTemplate.alert_tag_list = function(){
    try{
        return Todos.findOne(Meteor.user().profile.dropbox).text;
    }catch(error){
        catch_error('Template.dropboxAlertTemplate.text', error, LogLevel.Error, this);
    }
};
Template.dropboxAlertTemplate.alert_link = function(){
    try{
        return Todos.findOne(Meteor.user().profile.dropbox).weblink;
    }catch(error){
        catch_error('Template.dropboxAlertTemplate.text', error, LogLevel.Error, this);
    }
};
