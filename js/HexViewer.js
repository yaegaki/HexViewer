var HexViewer;

HexViewer = (function(){
	var manager = {};
	function HexViewer(id, row, column){
		row = 10;
		column = 0x10;
		if(!(this instanceof HexViewer)){
			return new HexViewer(id, row, column);
		}

		var view = $(".HexViewer#"+id);
		if(view.length == 0) return;
		if(manager[id]) return manager[id];
		

		var _data = null;

		
		manager[id] = this;
		this.getData = function(){
			return _data;
		}

		//data type is Uint8Array
		this.setData = function(data){
			if(data instanceof String || typeof data == "string"){
				var temp = new Uint8Array(data.length*2);
				for(var i = 0;i < data.length;i++){
					var code = data.charCodeAt(i);
					temp[i*2] = code >> 8;
					temp[i*2+1] = code & 0xff;
				}
				data = temp;
			}
			else if(data instanceof ArrayBuffer){
			   	data = new Uint8Array(data);
			}else if(!(data instanceof Uint8Array)) return;
			
			_data = data;
			var table = $("<table></table>");
			var tr;
			var i;
			table.append(tr);
			for(i = 0;i < _data.length;i++){
				if(i % column == 0){
					tr =  $("<tr class='even'></tr>");		
					table.append(tr);
				}
				var temp = _data[i].toString(16).toUpperCase();
				if(temp.length == 1) temp = "0" + temp;
				tr.append($("<td>"+temp+"</td>"));
			}
			if(i % column != 0){
				tr.append($("<td colspan='"+(column-i%column)+"'></td>"));
			}
			view.html("");
			view.append(table);
		}

		//data type is unsigned char
		this.changeData = function(pos, data){
			if(_data instanceof Uint8Array && _data.length > pos){
				_data[pos] = data;
				var temp = _data[pos].toString(16).toUpperCase();
				if(temp.length == 1) temp = "0" + temp;

				view.find("td").eq(pos).html(temp);

			}
		}
	}

	return HexViewer;
})();
