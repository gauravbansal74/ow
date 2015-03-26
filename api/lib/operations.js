var pool = require('../config/db');

var db = {};

db.getmobile = function(mobile, callback){
	pool.getConnection(function(err, connection) {
		if(!err){
			connection.query("SELECT accountId, accountName, accountEmail, accountMobile  FROM account where accountMobile ='"+mobile+"' AND status=1", function(err, rows) {
				if(err){
					callback(err, null);
				}else{
					callback(null, rows[0]);
				}
			});
			connection.release();
			}else{
				callback(err, null);
			}
	});
};


db.setaccount = function(accountId, accountName, accountEmail, accountMobile, accountPassword, callback){

	var post  = {
			accountId: accountId, 
			accountName: accountName, 
			accountEmail : accountEmail, 
			accountMobile : accountMobile,
			accountPassword : accountPassword,
			createdOn : new Date(),
			modifiedOn : new Date(),
			status : 0
		};

	pool.getConnection(function(err, connection){
		if(!err){
			connection.query('INSERT INTO account SET ?', post, function(err, rows) {
			    if(err){
			    	callback(err, null);
			    }else{
			    	callback(null, rows.affectedRows);
			    }
			  });
			  connection.release();
		}else{
			callback(err, null);
		}
	});
};


module.exports = db;