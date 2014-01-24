/**
 * GUI - We handle all userland interactions with jQuery here.
 */

/**
 * Prints contents of tree's array into text box.
 */

var printArray = function ()
{
	$( "#heapvisualizer" ).text("._size: " + h._size);
	$( "#heapvisualizer" ).append("\n._tree: ");
	
	h._tree.forEach(function(value, key) {
		$( "#heapvisualizer" ).append("\n\tKey: " + key);
		$( "#heapvisualizer" ).append("; Value: " + value);
	});	
};


/**
 * Handle actual pushing onto heap.
 */

var doPush = function()
{
	// store value and clear input field
	var to_add = Number($( "#inputField" ).val());
	$( "#inputField" ).val("");

	// perform heap insert
	h.push(to_add);
	$( "#heapshell" ).text("push() adds " + to_add + " onto heap.");

    // redraw the d3 image
    drawD3();
	
	// return focus to input field
	$( "#inputField" ).focus();
	
	printArray();
};

/**
 * Handle click of "push" button.
 */

$( "#push" ).click(function () {
	doPush();
});

/**
 * Handle click of "pop" button.
 */

$( "#pop" ).click(function () {
	var to_remove = h.pop();
	$( "#heapshell" ).text("pop() returns " + to_remove + ".");

    // redraw the d3 image
    drawD3();

	printArray();
});

/**
 * Handle click of "peek" button.
 */

$( "#peek" ).click(function () {
	$( "#heapshell" ).text("peek() returns " + h.peek() + ".");
});

/**
 * Handle <enter> press while in inputField.
 */

$( "#inputField" ).keypress(function(e) {
	// 13 == Enter
	if(e.which == 13) {
		doPush();
	}
});

var h = new maxHeap();
printArray();
$( "#heapshell" ).text("Help docs.");

/**
 * D3
 */

/**
 * Recursive function that finds all chidren given a BST.
 */

function getChildren(key)
{
    var to_return = [];
    var left_tree = [];
    var right_tree = [];
    
    var node = h._tree[key];
    var left_key = getLeft(key);
    var left_value = h._tree[left_key];
    var right_key = getRight(key);
    var right_value = h._tree[right_key];

    // Base case
    if(h._size == 0 || key > h._tree.length || node == null){
        return to_return;
    }

    if(left_value != null){
        left_tree = {
            name: left_value,
            contents: [
                getChildren(getLeft(left_key)),
                getChildren(getRight(left_key))
            ]
        };
    } 

    if(right_value != null){
        right_tree = {
            name: right_value,
            contents: [
                getChildren(getLeft(right_key)),
                getChildren(getRight(right_key))
            ]
        };
    }
    
    to_return = {
        name: node,
        contents: [left_tree, right_tree]
    };
            
    return to_return;
}

var treeData = [];

var size = {
	height: 500,
	width: 1200
};

var maxLabelLength = 40;

var options = {
	nodeRadius: 5,
	fontSize: 10
};

var tree = d3.layout.tree()
	.sort(null)
	.size([size.height, size.width - maxLabelLength*options.fontSize])
	.children(function(d)
	{
		return (!d.contents || d.contents.length === 0) ? null : d.contents;
	});

function drawD3() 
{

    $( "#d3-container" ).empty();
    
    treeData = getChildren(1);    

    var nodes = tree.nodes(treeData);
    var links = tree.links(nodes);   
    var layoutRoot = d3.select("#d3-container")
     	.append("svg:svg").attr("width", size.width).attr("height", size.height)
     	.append("svg:g")
     	.attr("class", "container")
     	.attr("transform", "translate(" + maxLabelLength + ",0)");
    // Edges between nodes as a <path class="link" />
    var link = d3.svg.diagonal()
     	.projection(function(d)
     	{
     		return [d.y, d.x];
     	});
     
     layoutRoot.selectAll("path.link")
     	.data(links)
     	.enter()
     	.append("svg:path")
     	.attr("class", "link")
     	.attr("d", link);
     
     var nodeGroup = layoutRoot.selectAll("g.node")
     	.data(nodes)
     	.enter()
     	.append("svg:g")
     	.attr("class", "node")
     	.attr("transform", function(d)
     	{
     		return "translate(" + d.y + "," + d.x + ")";
     	});
     
     nodeGroup.append("svg:circle")
     	.attr("class", "node-dot")
     	.attr("r", options.nodeRadius);
     
     nodeGroup.append("svg:text")
     	.attr("text-anchor", function(d)
     	{
     		return d.children ? "end" : "start";
     	})
     	.attr("dx", function(d)
     	{
     		var gap = 2 * options.nodeRadius;
     		return d.children ? -gap : gap;
     	})
     	.attr("dy", 3)
     	.text(function(d)
     	{
     		return d.name;
     	});
} 	

drawD3();
