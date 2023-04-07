/**
 * File Name: GRBfacade
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 2/16/2023 : Created
 */

//show the average rating for add page
const showCurrentRatingAdd = () =>{
    let quality = $("#txtFoodQuality").val();
    let service = $("#txtService").val();
    let value = $("#txtValue").val();
    let averageRating = Math.round(getRatingAverageAdd(quality, service, value));
    $("#txtOverallRating").val(averageRating + '%');
}
//show the average rating for the modify page
const showCurrentRatingModify = () =>{
    let quality = $("#txtFoodQualityModify").val();
    let service = $("#txtServiceModify").val();
    let value = $("#txtValueModify").val();
    let averageRating = Math.round(getRatingAverageModify(quality,service,value));
    $("#txtOverallRatingModify").val(averageRating + "%");
}
//save feedback button
function addFeedback(){
    if (doValidation_frmAdd()){
        console.log("Add Form is valid");

        let businessName = $("#txtName").val();
        let typeId = $("#cmbType").val();
        let reviewerEmail = $("#txtEmail").val();
        let reviewerComments = $("#txtComments").val();
        let reviewDate = $("#dtReviewDate").val();
        let hasRating = $("#chkAddRatings").prop("checked");
        let rating1 = $("#txtFoodQuality").val();
        let rating2 = $("#txtService").val();
        let rating3 = $("#txtValue").val();

        //set ratings to 0 if hasRatings is false
        if (hasRating == false){
                rating1 = 0;
                rating2 = 0;
                rating3 = 0;
        }
        console.log(`${businessName} ${typeId} ${reviewerEmail} ${reviewerComments} ${reviewDate} ${hasRating} ${rating1} ${rating2} ${rating3} `);
        let options = [businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,rating1,rating2,rating3];
        function callback(){
            console.log("Record added");
            alert("New Feedback Added");
        }
        //inserting record into the database
        Review.insert(options,callback);

        //need to clear the form once data is stored
        addFeedback_pageshow();
    }

    else{
        console.log("Add Form is invalid");
    }
}

//reset ratings to 0 when checkbox is unchecked
function resetValues(){

    $("#hide").toggle();

    let checked = $("#chkAddRatings").prop("checked");
    if (checked == true){
        $("#txtFoodQuality").val(0);
        $("#txtService").val(0);
        $("#txtValue").val(0);
        $("#txtOverallRating").val("");
    }
}

function resetValuesModify(){

    $("#hideModify").toggle();
    let checked = $("#chkAddRatingsModify").prop("checked");
    if (checked == true){
        $("#txtFoodQualityModify").val(0);
        $("#txtServiceModify").val(0);
        $("#txtValueModify").val(0);
    }
}

//resets the add form (default email and type dd initialized with everything else blank)
function resetForm(){
    $("#txtName").val("");
    $("#txtEmail").val("");
    $("#txtComments").val("");
    $("#dtReviewDate").val("");
    $("#chkAddRatings").prop("checked", false).checkboxradio('refresh');
    $("#hide").hide();
    $("#txtOverallRating").val("");
}

//save default email to local storage
function saveDefault(){
    //adding item to the local storage
    localStorage.setItem("email", $("#txtDefaultEmail").val());
    alert("Default reviewer email saved");
}

//clear database, get rid of existing tables
function clearDatabase(){
    let result = confirm("Really want to clear database?");
    if(result){
        try{
            DB.dropTables();
            alert("Database clear: All tables dropped");
        }
        catch(e){
            alert(e);
        }
    }
}

//inputs the default email from local storage into the reviewer email on add page
function defaultEmailInput(){
    $("#txtEmail").val(localStorage.getItem("email"));
}

//populates the dropdown list with type table on the add page
function updateTypesDropdown(){
    let options = [];
    let htmlCode = "";
    function callback(tx, results){
        for (var i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];
            //sets the 'others' option as default
            if(row['name'] == "Others"){
                htmlCode += `<option selected value="${row['id']}">${row['name']}</option>`;
             }
             else{
                htmlCode += `<option value="${row['id']}">${row['name']}</option>`;
            }
            let cBox = $("#cmbType");
            let cBoxModify = $("#cmbTypeModify");
            cBox = cBox.html(htmlCode).change();
            cBoxModify = cBoxModify.html(htmlCode).change();
        }
    }
    Type.selectAll(options, callback);
}

//get reviews for the reviews page
function getReviews(){
    let options = [];
    function callbackRev(tx, results){
        let htmlCode = "";
        let lv = $("#lstShops");

         //check if there's any rows in the db
        if (results.rows.length == 0){
            htmlCode = `<h1>No Record found</h1>`;
            lv = lv.html(htmlCode);
        }
        else{
            for (let i = 0; i< results.rows.length; i++){

                let row = results.rows[i];
                let rating = 0;

                if (row['hasRating']){
                    rating = Math.round(getRatingAverageAdd(row['rating1'], row['rating2'], row['rating3']));
                }
                htmlCode += `<li>
                    <a data-role="button" data-row-id=${row['id']} href="#">
                        <h1>Business Name: ${row['businessName']}</h1>
                        <p>
                            Reviewer Email: ${row['reviewerEmail']}<br>
                            Comments: ${row['reviewerComments']}<br>
                            Overall Rating: ${rating}%
                        </p>
                    </a>
                </li>`;
            }


            lv = lv.html(htmlCode);
            lv.listview("refresh");
            // add a click event to be able to navigate to details page
            function linkClickHandler(){
                localStorage.setItem("id", $(this).attr('data-row-id'));
                $(location).prop('href', "#GRBModifyFeedbackPage");
            }

            $("#lstShops a").on("click", linkClickHandler);

        }

    }
    Review.selectAll(options,callbackRev);
}

//gets one row from review table to display based on id
function showCurrentReview(){
    //fetch id from local storage
    let id = localStorage.getItem("id");
    let option = [id];

    function selectCallback(tx,results){
        let row = results.rows[0];
        $("#txtNameModify").val(row['businessName']);
        $("#txtEmailModify").val(row['reviewerEmail']);
        //minus 1 since it's zero based?? idk actually but it works
        $("#cmbTypeModify").prop("selectedIndex", row['typeId'] -1).change();
        $("#txtCommentsModify").val(row['reviewerComments']);
        $("#dtReviewDateModify").val(row['reviewDate']);

        //$("#chkAddRatingsModify").prop("checked", false);
        let rating = row['hasRating'];
        console.log(rating);
        if (rating == true || rating == "true"){
            $("#chkAddRatingsModify").toggle();
            $("#chkAddRatingsModify").prop('checked', true).checkboxradio('refresh');
            $("#hideModify").show();
            $("#txtFoodQualityModify").val(row['rating1']);
            $("#txtServiceModify").val(row['rating2']);
            $("#txtValueModify").val(row['rating3']);
            showCurrentRatingModify();
        }
    }

    Review.select(option, selectCallback);
}

//update feedback from modify feedback page
function updateFeedback(){
    if (doValidation_frmModify()){

        let businessName = $("#txtNameModify").val();
        let typeId = $("#cmbTypeModify").val();
        let reviewerEmail = $("#txtEmailModify").val();
        let reviewerComments = $("#txtCommentsModify").val();
        let reviewDate = $("#dtReviewDateModify").val();
        let hasRating = $("#chkAddRatingsModify").prop("checked");
        let rating1 = $("#txtFoodQualityModify").val();
        let rating2 = $("#txtServiceModify").val();
        let rating3 = $("#txtValueModify").val();

        //set ratings to 0 if checkbox is unchecked
        if (hasRating == false){
            rating1 = 0;
            rating2 = 0;
            rating3 = 0;
        }

        //find id in the db
        let id = localStorage.getItem('id');

        console.log(`${businessName} ${typeId} ${reviewerEmail} ${reviewerComments} ${reviewDate} ${hasRating} ${rating1} ${rating2} ${rating3}`);
        let options = [businessName,typeId,reviewerEmail,reviewerComments,reviewDate,hasRating,rating1,rating2,rating3, id];
        function callback(){
            alert("Feedback Updated Successfully");
            //go back to the reviews page
            $(location).prop('href', '#GRBViewFeedbackPage');
        }
        //inserting record into the database
        Review.update(options, callback);

    }

    else{
        console.log("Add Form is invalid");
    }
}

//delete function for modify page
function deleteFeedback(){
    let id = localStorage.getItem('id');

    let options = [id];

    function callback(){
        alert("Feedback Deleted successfully");
        $(location).prop('href', '#GRBViewFeedbackPage');
    }
    Review.delete(options,callback);
}