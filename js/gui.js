/**
 * GUI - We handle all userland interactions with jQuery here.
 */

var h = new Heap;
console.log(h);

var printArray = function ()
{
	$( "#heapvisualizer" ).text("._size: " + h._size);
	$( "#heapvisualizer" ).append("\n._tree: ");
	
	h._tree.forEach(function(value, key) {
		$( "#heapvisualizer" ).append("\n\tKey: " + key);
		$( "#heapvisualizer" ).append("; Value: " + value);
	});	
};

printArray();

var doInsert = function()
{
	// store value and clear input field
	var to_add = $( "#inputField" ).val();
	$( "#inputField" ).val("");

	// perform heap insert
	h.insert(to_add);
	$( "#heapshell" ).text(".insert() adds " + to_add + " onto heap.");
	
	// return focus to input field
	$( "#inputField" ).focus();
	
	printArray();
};

$( "#heapshell" ).text("Help docs.");

$( "#insert" ).click(function () {
	doInsert();
});

$( "#extractMax" ).click(function () {
	var to_remove = h.extractMax();
	$( "#heapshell" ).text(".extractMax() returns " + to_remove + ".");
	printArray();
});

$( "#getMax" ).click(function () {
	$( "#heapshell" ).text(".getMax() returns " + h.getMax() + ".");
});

$( "#inputField" ).keypress(function(e) {
	// 13 == Enter
	if(e.which == 13) {
		doInsert();
	}
});

/**
 * D3
 */
 
var size = {
	height: 500,
	width: 900
};

var treeData = {
	name: "/",
	contents: [
		{
			name: "label",
			contents: [
				{ name: "label" },
				{ name: "label" },
			]
		},
		{
			name: "label",
			contents: [
				{
					name: "label",
					contents: [
					]
				},
				{
					name: "label",
					contents: [
					]
				},
			]
		}
	]
};


var maxLabelLength = 20;

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
 	
 console.log(tree);

