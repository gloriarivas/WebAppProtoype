/**
 * File Name: GRButil
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 2/16/2023 : Created
 */

//average of ratings on the add page
function getRatingAverageAdd(quality, service, value){
    let average = (Number(quality) + Number(service) + Number(value)) * 100/15;
    return average;
}
//average of ratings on the modify page
function getRatingAverageModify(quality, service, value){
    let average = (Number(quality) + Number(service) + Number(value)) * 100/15;
    return average;
}
//form validations
function doValidation_frmAdd(){
    let form = $("#frmAdd");
    form.validate({
        rules: {
            txtName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            txtEmail: {
                required: true,
                checkEmail: true
            },
            dtReviewDate: {
                required: true
            },
            txtFoodQuality: {
                min : 0,
                max: 5
            },
            txtService:{
                min : 0,
                max: 5
            },
            txtValue:{
                min: 0,
                max: 5
            }

        },
        messages:{
            txtName:{
                required: "Please enter a business name",
                rangelength: "Business name must be between 2-20 characters"
            },
            txtEmail:{
                required: "Reviewer email is required",
                checkEmail: "Email entered is invalid"
            },
            dtReviewDate:{
                required: "Review date is required"
            },
            txtFoodQuality:{
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            txtService: {
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            txtValue: {
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            }

        }
    });
    return form.valid();
}

function doValidation_frmModify(){
    let form = $("#frmModifyFeedback");
    form.validate({
        rules: {
            txtNameModify: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            txtEmailModify: {
                required: true,
                checkEmail: true
            },
            dtReviewDateModify: {
                required: true
            },
            txtFoodQualityModify: {
                min : 0,
                max: 5
            },
            txtServiceModify:{
                min : 0,
                max: 5
            },
            txtValueModify:{
                min: 0,
                max: 5
            }

        },
        messages:{
            frmModifyFeedback:{
                required: "Please enter a business name",
                rangelength: "Business name must be between 2-20 characters"
            },
            txtEmailModify:{
                required: "Reviewer email is required",
                checkEmail: "Email entered is invalid"
            },
            dtReviewDateModify:{
                required: "Review date is required"
            },
            txtFoodQualityModify:{
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            txtServiceModify: {
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            txtValueModify: {
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            }

        }
    });
    return form.valid();
}

//email validator
jQuery.validator.addMethod("checkEmail",
    function(v, e){
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return this.optional(e) || emailRegex.test(v);
    },
    "Email entered is invalid");