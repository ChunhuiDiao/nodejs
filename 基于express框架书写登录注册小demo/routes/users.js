var express = require('express');
var router = express.Router();

const session = require('express-session');
var mongodb = require("mongodb");

var MongoClicent = mongodb.MongoClient;


var DB_CONN_STR = 'mongodb://localhost:27017/Tips';


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//shixianzhuceyemian jiangshuju charu shuju ku
router.all('/registor', function(req, res, next) {
	var username = req.param('username');
	var pwd = req.param('password');
	var phonenum = req.param('phonenum');
	
	if(username&&pwd&&phonenum){
		var data = [{"username":username,"password":pwd,"phonenum":phonenum}];
		function inserData(db){
			
			var conn = db.collection('tips');

			conn.insert(data,function(err,results){
				if(err){
					console.log(err)
					return
				}else{
					res.redirect('/login');
					db.close();
				}
			})
		}

		MongoClicent.connect(DB_CONN_STR,function(err,db){
			/*console.log(results)*/
			if(err){
				console.log(err);

				return;
			}else{
				console.log("connect success");
				inserData(db);
			}
		})
	}else{
		res.redirect('/registor');
	}	
});

//login yishixian chenggong tiaozhuanshouye 
router.all('/login',function(req,res,next){
	var username = req.query['username'];
	var pwd = req.query['password'];

	function findData(db){
		var conn = db.collection("tips");
		//panding shifou weichunshuzi chunshuzishi shoujihao
		//fouzeshi yonghuming
		if(/^\+?[1-9][0-9]*$/.test(username)) {
			var data = {"phonenum":username,"password":pwd};
			conn.find(data,{"phonenum":0,"password":0}).toArray(function(err,results){
			 	
			 	if(results.length > 0){
			 		req.session.username = username;
			 		res.redirect('/')
			 		
			 	}else{
			 		res.redirect('/login')
			 	}
			 })

		} else {
			var data = {"username":username,"password":pwd};
			conn.find(data,{"username":0,"password":0}).toArray(function(err,results){
			 	if(results.length > 0){
			 		req.session.username = username;
			 		res.redirect('/')
			 		
			 	}else{
			 		res.redirect('/login')
			 	}
			 })
		}
		
	}
	if(username&&pwd){
		MongoClicent.connect(DB_CONN_STR, function(err, db) {
	      if(err) {
	        console.log(err);
	        return;
	      } else {
	        findData(db)
	      }
   		})
	} else {
		res.redirect('/login');
	}
})
// add message to commdb
router.all('/comm',function(req,res,next){
	var title = req.body['title'];
	var count = req.body['count'];
	//in app.js session must before in userrouter else erro;
	var username = req.session.username;
	if(username){
		var data = [{"title":title,"count":count,"username":username}];
		function inserData(db){
			var conn = db.collection('comm');
			conn.insert(data,function(err,results){
				if(err){
					console.log(err)
					return
				}else{
					res.redirect('/');
					db.close();
				}
			})
		}

		MongoClicent.connect(DB_CONN_STR,function(err,db){
			/*console.log(results)*/
			if(err){
				console.log(err);
				return;
			}else{
				console.log("connect success");
				inserData(db);
			}
		})
	}else{
		res.send('<script>alert("Login timeout,please log in again");location.href="/login"</script>');
	}
})

// show list
router.all("/logout",function(req,res,next){
	req.redirect('/')
})
router.all("/ajax",function(req,res,next){
	
	var phonenum =req.body['phonenum'];
	var username = req.body['username']
	function findData(db){
		var conn = db.collection("tips");
		//panding shifou weichunshuzi chunshuzishi shoujihao
		//fouzeshi yonghuming
		
		var data = {"phonenum":phonenum};

		conn.find(data,{"phonenum":0}).toArray(function(err,results){	
			if(results.length > 0){
				res.send('already existing');
			}
		})
	}

	MongoClicent.connect(DB_CONN_STR, function(err, db) {
	    if(err) {
	      console.log(err);
	       return;
	    } else {
	       findData(db)
	    }
   	})
	
})

router.all("/ajax_name",function(req,res,next){
	var username = req.body['username']
	function findData(db){
		var conn = db.collection("tips");
		//panding shifou weichunshuzi chunshuzishi shoujihao
		//fouzeshi yonghuming
		var data={"username":username}
		conn.find(data,{"username":0}).toArray(function(err,results){	
			if(results.length > 0){
				res.send('already existing');
			}
		})
	}

	MongoClicent.connect(DB_CONN_STR, function(err, db) {
	    if(err) {
	      console.log(err);
	       return;
	    } else {
	       findData(db)
	    }
   	})
	
})
module.exports = router;
