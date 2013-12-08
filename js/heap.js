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
    this.bubbleDown(1);

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
    } else {
        this._size++;
        this._tree[this._size] = value;
        this.buildMaxHeap();
    }
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
 * Bubbles up a high value to proper level in tree.
 * O(log n) time.
 *
 * @param key to bubble up at.
 */
Heap.prototype.bubbleUp = function(key)
{
    var node = this._tree[key];
    var parent_key = this.getParent(key);
    var parent_value = this._tree[parent_key];

    this.maxHeapify(key);
    console.log(parent_key);

    if(parent_value < node && parent_value != null){
        console.log("up");
        this.bubbleUp(parent_key);
    }
};

/**
 * Bubbles down a low value to proper level in the tree.
 * O(log n) time.
 * 
 * @param key to start bubbling down at (default to root)
 */
Heap.prototype.bubbleDown = function(key=1)
{
    var node = this._tree[key];
    var left_key = this.getLeft(key);
    var left_value = this._tree[left_key];
    var right_key = this.getRight(key);
    var right_value = this._tree[right_key];

    this.maxHeapify(key);

    if(left_value > node && left_value != null){
        this.bubbleDown(left_key);
    }
    if(right_value > node && right_value != null){
        this.bubbleDown(right_key);
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
    var left_child = this._tree[this.getLeft(key)];
    var right_child = this._tree[this.getRight(key)];

    // Base case, if current node is greater than both of its
    // children.
    if(node < left_child || node < right_child){
        if(left_child > right_child || right_child == null){
            // swap left child with node
            this._tree[key] = left_child;
            this.setLeft(key, node);
        } else if(right_child > node){
            // swap right child with node
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
    return Math.floor(key / 2);
};

Heap.prototype.setParent = function(key, value)
{
    this._tree[Math.floor(key / 2)] = value;
};

Heap.prototype.getLeft = function(key)
{
    return 2 * key;
};

Heap.prototype.setLeft = function(key, value)
{
    this._tree[2*key] = value;
};

Heap.prototype.getRight = function(key)
{   
    return 2 * key + 1;
};

Heap.prototype.setRight = function(key, value)
{
    this._tree[2 * key + 1] = value;
};


var heap = new Heap;
console.log(heap);
heap.insert(89);
heap.insert(10);
heap.insert(41);
heap.insert(12);
heap.insert(52);
heap.insert(12);
heap.insert(13);
heap.insert(18);
heap.insert(300);
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());

