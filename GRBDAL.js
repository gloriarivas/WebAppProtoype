/**
 * File Name: GRBDAL
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 2/16/2023 : Created
 */

//CRUD functions for review:
var Review={
    insert: function(options, callback){
        function txFunction(tx){
            let sql = "INSERT INTO review (businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3) VALUES(?,?,?,?,?,?,?,?, ?);";
            tx.executeSql(sql,options,callback,errorHandler);
        }

        function successTransation(){
            console.log("Success: insert into review successful");
        }
        db.transaction(txFunction, errorHandler, successTransation);
    },
    select: function(options, callback){
        function txFunction(tx) {

            let sql = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.log("Success: select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function(options, callback){
        function allReviews(tx){
            let sql = "SELECT * FROM review;"
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.log("Success: selectAll transaction successful");
        }

        db.transaction(allReviews, errorHandler, successTransaction);
    },
    update: function (options, callback){
        function txFunction(tx){
            let sql = "UPDATE review SET businessName=?, typeId=?, reviewerEmail=?, reviewerComments=?, reviewDate=?, hasRating=?, rating1=?, rating2=?, rating3=? WHERE id=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }

        function successTransaction(){
            console.log("Success: update transaction successful");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    },
    delete: function(options, callback){
        function txFunction(tx){

            let sql = "DELETE FROM review WHERE ID=?;";
            tx.executeSql(sql,options,callback,errorHandler);
        }

        function successTransaction(){
            console.log("Success: delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
}


//CRUD function for type:
var Type={
    selectAll: function(options, callback){
        function allTypes(tx){
            let sql = "SELECT * FROM type;"
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.log("Success: selectAll transaction successful");
        }

        db.transaction(allTypes, errorHandler, successTransaction);
    }
}