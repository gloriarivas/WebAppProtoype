/**
 * File Name: GRBglobal
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 2/16/2023 : Created
 */
function btnCalculateAverageAdd_click() {
    showCurrentRatingAdd();
}

function btnCalculateAverageModify_click() {
    showCurrentRatingModify();
}

function btnSave_click() {
    addFeedback();
}

function btnUpdate_click() {
    updateFeedback();
}

function btnSaveDefault_click() {
    saveDefault();
}

function btnClearDatabase_Click() {
    clearDatabase();
}

function addFeedback_pageshow() {
    resetForm();
    defaultEmailInput();
    updateTypesDropdown();
}

function chkAddRatings_toggle() {
    resetValues();
}

function chkAddRatingsModify_toggle(){
    resetValuesModify();
}

function viewFeedback_pageshow() {
    getReviews();
}

function modifyFeedback_pageshow() {
    updateTypesDropdown();
    showCurrentReview();
}

function btnDelete_click() {
    deleteFeedback();
}

//ready function
function init(){

    //display ratings if checkbox is toggled
    $("#chkAddRatings").on("click",chkAddRatings_toggle);
    $("#chkAddRatingsModify").on("click", chkAddRatingsModify_toggle);
    //automatically fills in average rating on add page when text boxes are used
    $("#txtValue").on("change",btnCalculateAverageAdd_click);
    $("#txtService").on("change",btnCalculateAverageAdd_click);
    $("#txtFoodQuality").on("change",btnCalculateAverageAdd_click);
    //autofill average for the modify page
    $("#txtValueModify").on("change",btnCalculateAverageModify_click);
    $("#txtServiceModify").on("change",btnCalculateAverageModify_click);
    $("#txtFoodQualityModify").on("change",btnCalculateAverageModify_click);
    //add button for add page
    $("#btnSave").on("click", btnSave_click);
    //add button for modify page
    $("#btnUpdate").on("click", btnUpdate_click);
    //delete button for modify page
    $("#btnDelete").on("click", btnDelete_click);
    //saveDefault button on settings page
    $("#btnSaveDefault").on("click", btnSaveDefault_click);
    //clear database button on settings page
    $("#btnClearDatabase").on("click", btnClearDatabase_Click);
    //event handler for pageshow of add feedback page
    $("#GRBAddFeedbackPage").on("pageshow", addFeedback_pageshow);
    //event handler for pageshow of reviews page
    $("#GRBViewFeedbackPage").on("pageshow", viewFeedback_pageshow);
    //event handler for pageshow of modify feedback page
    $("#GRBModifyFeedbackPage").on("pageshow",modifyFeedback_pageshow);
}



function initDB(){
    try{
        DB.createDatabase();
        DB.dropTables(); //drop tables on init
        if (db){
            //create type table and review table
            DB.createTables();
            //insert data into the type table
            DB.inputData();
        }
        else{
            console.error("Error: could not create tables");
        }
    }
    catch (e){
        console.error(`Error: (Fatal) error in initDB(). Cant proceed`);
    }
}

//ready event
$(document).ready(function () {
    init();
    //initialize database when program runs
    initDB();
    //initially hides the ratings until checked
    $("#hide").hide();
    $("#hideModify").hide();
});

