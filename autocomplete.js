function autocomplete(text, div, callback){
	var results = [], selected = null;
	text.addEventListener('focus', function(){
		if(results.length) div.style.display = '';
	}, true);
	text.addEventListener('input', function(){
		div.innerHTML = '';
		results = callback(text.value).map(function(text){
			var result = document.createElement('div');
			result.className = 'item';
			result.innerText = text;
			div.appendChild(result);
			return result
		});
		if(results.length){
			div.style.display = '';
			select(results[0]);
		}
	}, true);
	function select(item){
		results.forEach(function(e){e.className = 'item'})
		item.className = 'item highlight';
		selected = item;
	}
	div.addEventListener('mouseover', function(e){
		if(e.target.className == 'item') select(e.target);
	}, true)
	text.addEventListener('keydown', function(e){
		if(e.keyCode == 38){ //up
			select(selected.previousSibling || selected);
			e.preventDefault();
		}else if(e.keyCode == 40){ //down
			select(selected.nextSibling || selected);
			e.preventDefault();
		}
	}, false);
	text.ownerDocument.addEventListener('mousedown', function(e){
		if(e.target != text){
			div.style.display = 'none';
			//text.value = selected.innerText;
		}
	}, true)
}
