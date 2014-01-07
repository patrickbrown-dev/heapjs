/**
 * Tests
 */

var heapjs = require("../heapjs/heap.js");

testMaxHeap = function()
{
    var err = 0;
	var h = new heapjs.maxHeap();

	for(var i = 0; i < 100; i++){
		h.push(Math.floor(Math.random()*100));
	}

	var last = 100;
	var temp;

	for(var i = 0; i < 100; i++){
		temp = h.pop();
		if(temp > last){
            err++;
		}
		last = temp;
	}
    return err;
}

var err = testMaxHeap();

if(err > 0){
    throw new Error("assertion tests failed.");
}else{
    console.log("all tests passed.");
}

