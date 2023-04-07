/**
 * File Name: GRBdatabase
 *
 * Revision History:
 *       Gloria Rivas-Bonilla, 2/12/2023 : Created
 */

//database reference
var db;

//error handler
function errorHandler(error){
    console.error(`Error: ${error.message}`);
}

var DB = {
    //create database function
    createDatabase: function(){
        let name = "FeedbackDB";
        let version = "1.0";
        let displayName = "FeedbackDB";
        let size = 2 * 1024 * 1024;

        function creationCallback() {
            console.log("Success: Database created successfully");
        }

        db = openDatabase(name, version, displayName, size, creationCallback);
    },
    //create tables
    createTables:function(){
        function createTypeTable(tx) {
            var sql = "CREATE TABLE IF NOT EXISTS type(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name  VARCHAR(20) NOT NULL);";
            let options = [];
            function success(){
                console.log("Success: type table created successfully");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }
        function createReviewTable(tx) {
            var sql = "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";
            let options = [];
            function success(){
                console.log("Success: review table created successfully");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }

        function successTransaction() {
            console.log("Create table transaction successful");
        }
        db.transaction(createTypeTable, errorHandler, successTransaction);
        db.transaction(createReviewTable, errorHandler, successTransaction);
    },
    dropTables:function(){
        //drop type table
        function dropTypeTable(tx) {
            let sql = "DROP TABLE IF EXISTS type;";
            let options = [];
            function successDrop() {
                console.log("Success: type table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
        }
        //drop review table
        function dropReviewTable(tx) {
            let sql = "DROP TABLE IF EXISTS review;";
            let options = [];
            function successDrop() {
                console.log("Success: review table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
        }
        function successTransaction() {
            console.log("Success Drop tables transaction successful");
        }
        //run the drop table functions
        db.transaction(dropTypeTable, errorHandler, successTransaction);
        db.transaction(dropReviewTable, errorHandler, successTransaction);
    },
    //insert the values into the type table
    inputData:function(){
        function txFunction(tx){
            let sql = "INSERT INTO type (name)" +
                "VALUES" +
                "('Others')," +
                "('Canadian')," +
                "('Asian')," +
                "('European')," +
                "('Australian');";

            let options = [];
            function success() {
                console.log("Success: type table filled with data");
            }
            tx.executeSql(sql, options, success, errorHandler);
        }
        function successTransaction() {
            console.log("Insert values into type table successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}