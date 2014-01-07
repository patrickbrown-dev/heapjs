/**
 * Tests
 */

tests = function()
{
	var heap = new Heap;

	console.log(heap);

	for(var i = 0; i < 100; i++){
		heap.insert(Math.floor(Math.random()*100));
	}

	var last = 100;
	var temp;

	for(var i = 0; i < 100; i++){
		temp = heap.extractMax();
		if(temp > last){
			console.log("ERROR");
		}
		last = temp;
		console.log(last);
	}
}

