/**
 * TreeNode class for rooted tree structure
 */
class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
        this.parent = null;
    }

    // Add child to this node
    addChild(childNode) {
        childNode.parent = this;
        this.children.push(childNode);
    }

    // Remove child from this node
    removeChild(childNode) {
        const index = this.children.indexOf(childNode);
        if (index > -1) {
            this.children.splice(index, 1);
            childNode.parent = null;
        }
    }

    // Check if this node is a leaf (no children)
    isLeaf() {
        return this.children.length === 0;
    }

    // Get all children values
    getChildrenValues() {
        return this.children.map(child => child.value);
    }
}

module.exports = TreeNode;
