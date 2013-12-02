function Heap()
{
    // private properties and constructor.
    this._tree = new Array();
    this._size = 0;
}

/**
 * Core Heap functions.
 */

/**
 * @return the root node, or the highest valued node.
 */
Heap.prototype.getMax = function()
{
    return this._tree[1];
};

/**
 * @return the root node, or highest valued node. Remove it from tree.
 */
Heap.prototype.extractMax = function()
{
    var to_return = this.getMax();

    this._tree[1] = this._tree[this._size];
    this._tree[this._size] = null;
    this._size--;
    this.buildMaxHeap();

    console.log(this._tree);

    return to_return;
};

/**
 * @param value to insert.
 */
Heap.prototype.insert = function(value)
{
    if(this._tree[1] == null){
        this._tree[1] = value;
        this._size++;
    }else{
        this._size++;
        this._tree[this._size] = value;
        this.buildMaxHeap();
    }

    console.log(this);
};

/**
 * Calls maxHeapify for each non-leaf node (i=n/2).
 */
Heap.prototype.buildMaxHeap = function()
{
    var i = Math.floor(this._size / 2);
    for(i; i > 0; i--){
        this.maxHeapify(i);
    }
};

/**
 * Assumes that the trees rooted at left(i) and right(i) are
 * max_heaps.
 *
 * @param size of heap.
 * @param key of node to heapify.
 */
Heap.prototype.maxHeapify = function(key)
{
    var node = this._tree[key];
    var left_child = this.getLeft(key);
    var right_child = this.getRight(key);
    
    console.log("key: " + key);
    console.log("node: " + node);
    console.log("left: " + left_child);
    console.log("right: " + right_child);

    if(node < left_child || node < right_child){
        if(left_child > right_child || right_child == null){
            this._tree[key] = left_child;
            this.setLeft(key, node);
        } else {
            this._tree[key] = right_child;
            this.setRight(key, node);
        }
    }
};


/**
 * Tree operations.
 */

Heap.prototype.getParent = function(key)
{
    return this._tree[key/2];
};

Heap.prototype.setParent = function(key, value)
{
    this._tree[key/2] = value;
};

Heap.prototype.getLeft = function(key)
{
    return this._tree[2 * key];
};

Heap.prototype.setLeft = function(key, value)
{
    this._tree[2*key] = value;
};

Heap.prototype.getRight = function(key)
{   
    return this._tree[2*key + 1];
};

Heap.prototype.setRight = function(key, value)
{
    this._tree[2*key + 1] = value;
};


var heap = new Heap;
heap.insert(89);
//console.log(heap.getMax());
heap.insert(10);
heap.insert(41);
heap.insert(12);
heap.insert(52);
heap.insert(12);
heap.insert(13);
heap.insert(18);
//console.log(heap.getMax());
//console.log(heap.extractMax());
