let _private = new weakmap();

export default class List {
	constructor(){
		//	Private
		_private(this, {
			length: 0,
			first: null,
			last: null,
			position: null,
			list: [],
			node: {
				data: null,
				prev: null,
				next: null,
				pos: null
			}
		});
	}

	get pos(){
		return _private.get(this).position;
	}

	get length(){
		return _private.get(this).length;
	}

	getNode(){}

	clear(){}
	toString(){}

	//	NODE MANIPULATORS
	insert(data){
		_private.get(this).push()
	}
	append(){}
	remove(){}

	//	NAVIGATION
	front(){}
	end(){}
	prev(){}
	next(){}
	moveTo(){}

};