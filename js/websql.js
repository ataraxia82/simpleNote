var DB;
function CreateDataBase(name, version){
	version = version || '0.0'
	DB = openDatabase(name, version, 'NoteDB', 2 * 1024 * 1024);
	return DB;
}

function CreateTable(name){
	ExeSql('CREATE TABLE IF NOT EXISTS '+name+' (id integer primary key autoincrement, notedate text, notetime text, noteinfo text)')
}

function ExeSql(sql, arg, callback){
	if(!DB){return;}
	if(!arg){arg = [];}
	if(!callback){
		callback = function(){
			//mui.toast("null");
		}
	}
	
	var err_cb = function(tx, err){
		console.log("Error:"+err.message)
		mui.toast("Error:"+err.message);
	}
	
	var succ_cb = function(tx, results){
		//mui.toast("执行成功");
		callback(tx,results)
	}
	
	DB.transaction(function (tx) {
		tx.executeSql(sql, arg, succ_cb, err_cb);
		//console.log("executeSql: "+sql)
	
	})
}
