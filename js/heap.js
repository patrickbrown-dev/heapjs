var maxHeap = function()
{
    // properties
    this._tree = new Array();
    this._size = 0;
}

/**
 * Core Heap functions.
 */

/**
 * @return the root node, or the highest valued node.
 */
maxHeap.prototype.peek = function()
{
    return this._tree[1];
};

/**
 * @return the root node, or highest valued node. Remove it from tree.
 */
maxHeap.prototype.pop = function()
{
    // Catch when heap is empty so we don't get a negative _size.
    if(this._size > 0){
        var to_return = this.peek();
        var last_node = this._size;

        this._tree[1] = this._tree[last_node];
        delete this._tree[last_node];
        this._tree.length--;
        this._size--;
        this.bubbleDown(1);

        return to_return;
    }

    console.log("heap is empty");
};

/**
 * @param value to insert.
 */
maxHeap.prototype.push = function(value)
{
    if(this._tree[1] === null){
        // Base case: The tree is empty and we just add to root.
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
maxHeap.prototype.buildMaxHeap = function()
{
    var i = Math.floor(this._size / 2);
    for(i; i > 0; i--){
        this.maxHeapify(i);
    }
};

/**
 * Bubbles down a low value to proper level in the tree.
 * O(log n) time.
 * 
 * @param key to start bubbling down at (default to root)
 */
maxHeap.prototype.bubbleDown = function(key)
{
    var node = this._tree[key];
    var left_key = getLeft(key);
    var left_value = this._tree[left_key];
    var right_key = getRight(key);
    var right_value = this._tree[right_key];

    this.maxHeapify(key);

    if(left_value > node && left_value !== null){
        this.bubbleDown(left_key);
    }
    if(right_value > node && right_value !== null){
        this.bubbleDown(right_key);
    }
};

/**
 * Looks at a given node's childern, and then swaps itself with a
 * child if the child is bigger.
 *
 * @param key of node to heapify.
 */
maxHeap.prototype.maxHeapify = function(key)
{
    var node = this._tree[key];
    var left_child = this._tree[getLeft(key)];
    var right_child = this._tree[getRight(key)];

    // Base case: If current node is greater than both of its
    // children.
    if(node < left_child || node < right_child){
        if(left_child > right_child || right_child == null){
            // swap left child with node
            this._tree[key] = left_child;
            setLeft(this._tree, key, node);
        } else if(right_child > node){
            // swap right child with node
            this._tree[key] = right_child;
            setRight(this._tree, key, node);
        }
    }
};


/**
 * Tree operations.
 */

function getParent(key)
{
    return Math.floor(key / 2);
}

function setParent(tree, key, value)
{
    tree[Math.floor(key / 2)] = value;
}

function getLeft(key)
{
    return 2 * key;
}

function setLeft(tree, key, value)
{
    tree[2*key] = value;
}

function getRight(key)
{   
    return 2 * key + 1;
}

function setRight(tree, key, value)
{
    tree[2 * key + 1] = value;
}

exports.maxHeap = maxHeap;
//exports.minHeap = minHeap;
