/**
 * BinaryTreeNode class for binary tree structure
 * Each node can have at most 2 children: left and right
 */
class BinaryTreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    // Add left child to this node
    addLeft(childNode) {
        if (this.left) {
            throw new Error('Left child already exists');
        }
        if (childNode) {
            childNode.parent = this;
            this.left = childNode;
        }
    }

    // Add right child to this node
    addRight(childNode) {
        if (this.right) {
            throw new Error('Right child already exists');
        }
        if (childNode) {
            childNode.parent = this;
            this.right = childNode;
        }
    }

    // Remove left child from this node
    removeLeft() {
        if (this.left) {
            this.left.parent = null;
            const removedNode = this.left;
            this.left = null;
            return removedNode;
        }
        return null;
    }

    // Remove right child from this node
    removeRight() {
        if (this.right) {
            this.right.parent = null;
            const removedNode = this.right;
            this.right = null;
            return removedNode;
        }
        return null;
    }

    // Check if this node is a leaf (no children)
    isLeaf() {
        return this.left === null && this.right === null;
    }

    // Check if node has left child
    hasLeftChild() {
        return this.left !== null;
    }

    // Check if node has right child
    hasRightChild() {
        return this.right !== null;
    }

    // Get all children as an array (similar to TreeNode behavior)
    getChildren() {
        const children = [];
        if (this.left) children.push(this.left);
        if (this.right) children.push(this.right);
        return children;
    }

    // Get all children values
    getChildrenValues() {
        const values = [];
        if (this.left) values.push(this.left.value);
        if (this.right) values.push(this.right.value);
        return values;
    }

    // Check if this node is the root (no parent)
    isRoot() {
        return this.parent === null;
    }

    // Get the number of children (0, 1, or 2)
    getChildrenCount() {
        let count = 0;
        if (this.left) count++;
        if (this.right) count++;
        return count;
    }

    // Add node automatically - chooses left first, then right
    addNode(childNode) {
        if (!this.left) {
            this.addLeft(childNode);
        } else if (!this.right) {
            this.addRight(childNode);
        } else {
            throw new Error('Both children positions are already occupied');
        }
    }

    // Helper method to get sibling node
    getSibling() {
        if (!this.parent) return null;

        if (this.parent.left === this) {
            return this.parent.right;
        } else {
            return this.parent.left;
        }
    }
}

module.exports = BinaryTreeNode;
