const TreeNode = require('./TreeNode');

/**
 * Rooted Tree class
 */
class RootedTree {
    constructor(rootValue) {
        this.root = new TreeNode(rootValue);
    }

    // Find a node with specific value (BFS search to find node)
    findNode(value, startNode = this.root) {
        const queue = [startNode];

        while (queue.length > 0) {
            const current = queue.shift();

            if (current.value === value) {
                return current;
            }

            queue.push(...current.children);
        }
        return null;
    }

    // Add child to a specific node
    addChildToNode(parentValue, childValue) {
        const parentNode = this.findNode(parentValue);
        if (parentNode) {
            const childNode = new TreeNode(childValue);
            parentNode.addChild(childNode);
            return childNode;
        }
        return null;
    }

    // Print tree structure (for visualization)
    printTree(node = this.root, level = 0) {
        const indent = '  '.repeat(level);
        console.log(indent + node.value);

        node.children.forEach(child => {
            this.printTree(child, level + 1);
        });
    }
}

module.exports = RootedTree;
