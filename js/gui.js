/**
 * GUI - We handle all userland interactions with jQuery here.
 */

var h = new Heap;
console.log(h);

var doInsert = function() {
	// store value and clear input field
	var to_add = $( "#inputField" ).val();
	$( "#inputField" ).val("");

	// perform heap insert
	h.insert(to_add);
	$( "#heapshell" ).text(".insert() adds " + to_add + " onto heap.");
	
	// return focus to input field
	$( "#inputField" ).focus();
};

$( "#heapshell" ).text("Help docs.");

$( "#insert" ).click(function () {
	doInsert();
});

$( "#extractMax" ).click(function () {
	var to_remove = h.extractMax();
	$( "#heapshell" ).text(".extractMax() returns " + to_remove + ".");
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

var width = 960,
	height = 2000;

var tree = d3.layout.tree()
	.size([height, width - 160]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(40,0)");

d3.json("http://bl.ocks.org/mbostock/raw/4063550/flare.json", function(error, json) {
  var nodes = tree.nodes(json),
	  links = tree.links(nodes);

  var link = svg.selectAll("path.link")
	  .data(links)
	.enter().append("path")
	  .attr("class", "link")
	  .attr("d", diagonal);

  var node = svg.selectAll("g.node")
	  .data(nodes)
	.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("circle")
	  .attr("r", 4.5);

  node.append("text")
	  .attr("dx", function(d) { return d.children ? -8 : 8; })
	  .attr("dy", 3)
	  .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
	  .text(function(d) { return d.name; });
});

d3.select(self.frameElement).style("height", height + "px");
