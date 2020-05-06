
class EditorApi{
	this.host = 'http://localhost';
	this.port = 8080;
	this.path = '/editor/';
	this.method = 'POST';
	this.data = {};
	this.header: {
    	'Content-Type': 'application/json'
  	}

	constructor(path){
		this.path += path;
	}

	set method(method){
		switch(method){
			case 'POST':
			case 'GET':
			case 'PUT':
			case 'DELETE':
				this.method = method;
				break;
			default:
				this.method = 'POST';
				break;
		}
	}

	set data(object){
		this.data = object;
		this.header['Content-Length'] = this.data.length;
	}

	trigger(callback){
		var url = this.host+":"+this.port+this.path;
		fetch(url, { method: this.method, headers: this.header, body: this.data})
		.then((res) => {
 			return res.json()
		})
		.then((json) => {
			if(typeof callback !== 'undefined' && callback){
				callback(json);
			}
		});
	}
}

export default EditorApi;
