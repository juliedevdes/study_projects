/*
задачі для самобалансуючих дерев (структура даних яка поєднує переваги linked list & array)
інтерфейс:
1. Додати в дерево
2. Видалити з дерева
3. Знайти в дереві

внутрішня логіка:
1. Додати в дерево:
   - новий вузол в дерево, дотримуючись правил бінарного пошукового дерева (BST).
   - перевірити баланс дерева
   - якщо баланс не є 0, -1 або 1, виконати балансування (ротації) для відновлення балансу дерева.
   - big O для додавання в збалансоване бінарне дерево: O(log n)
2. Видалити з дерева:
   - знайти вузол (нижче)
   - видалити вузол
   - перевірити баланс дерева
   - якщо баланс не є 0, -1 або 1, виконати балансування (ротації) для відновлення балансу дерева.
3. Знайти в дереві:
   - пошук для знаходження вузла з заданим значенням.
   - повернути вузол або null, якщо вузол не знайдено.
   - big O для пошуку в збалансованому бінарному дереві: O(log n)
*/
const BinaryTreeNode = require('./BinaryTreeNode');
// const Stack = require('./helpers/Stack');

//should work with number values
class AVLTree {
    constructor(rootValue = null) {
        this.root = rootValue ? new BinaryTreeNode(rootValue) : null;
    }

    // Add a node with value
    addNode(value, node = this.root) {
        // If tree is empty, create root
        if (this.root === null) {
            this.root = new BinaryTreeNode(value);
            return;
        }

        this.root = this._insertRecursive(this.root, value);
    }

    // Remove a node with value
    removeNode(value) {
        if (this.root === null) return;
        this.root = this._deleteRecursive(this.root, value);
    }

    // Find a node with value
    findNode(value, node = this.root) {
        if (node === null || node.value === value) {
            return node;
        }

        if (value < node.value) {
            return this.findNode(value, node.left);
        } else {
            return this.findNode(value, node.right);
        }
    }

    // Recursive insert helper
    _insertRecursive(node, value) {
        // Standard BST insertion
        if (node === null) {
            return new BinaryTreeNode(value);
        }

        if (value < node.value) {
            node.left = this._insertRecursive(node.left, value);
            if (node.left) node.left.parent = node;
        } else if (value > node.value) {
            node.right = this._insertRecursive(node.right, value);
            if (node.right) node.right.parent = node;
        } else {
            // Duplicate values are not allowed
            return node;
        }

        // Rebalance the tree
        return this._rebalanceNode(node);
    }

    // Recursive delete helper
    _deleteRecursive(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this._deleteRecursive(node.left, value);
            if (node.left) node.left.parent = node;
        } else if (value > node.value) {
            node.right = this._deleteRecursive(node.right, value);
            if (node.right) node.right.parent = node;
        } else {
            // Node to delete found
            if (node.left === null) {
                var rightChild = node.right;
                if (rightChild) rightChild.parent = node.parent;
                return rightChild;
            } else if (node.right === null) {
                var leftChild = node.left;
                if (leftChild) leftChild.parent = node.parent;
                return leftChild;
            } else {
                // Node has two children: get inorder successor
                var successor = this._findMin(node.right);
                node.value = successor.value;
                node.right = this._deleteRecursive(node.right, successor.value);
                if (node.right) node.right.parent = node;
            }
        }

        // Rebalance the tree
        return this._rebalanceNode(node);
    }

    // Helper: Find minimum value node
    _findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // Private helper: Check balance and perform rotations
    _rebalanceNode(node) {
        var balance = this._getBalance(node);

        // Left heavy
        if (balance > 1) {
            // Left-Right case
            if (this._getBalance(node.left) < 0) {
                node.left = this._leftRotate(node.left);
            }
            // Left-Left case
            return this._rightRotate(node);
        }

        // Right heavy
        if (balance < -1) {
            // Right-Left case
            if (this._getBalance(node.right) > 0) {
                node.right = this._rightRotate(node.right);
            }
            // Right-Right case
            return this._leftRotate(node);
        }

        return node;
    }

    // Private helper: Get balance factor
    _getBalance(node) {
        if (node === null) return 0;
        return this._getHeight(node.left) - this._getHeight(node.right);
    }

    // Private helper: Get height of subtree
    _getHeight(node) {
        if (node === null) return 0;
        return Math.max(this._getHeight(node.left), this._getHeight(node.right)) + 1;
    }

    // Private helper: Right rotation
    _rightRotate(node) {
        var newRoot = node.left;
        var tempSubtree = newRoot.right;

        // Perform rotation
        newRoot.right = node;
        node.left = tempSubtree;

        // Update parent pointers
        newRoot.parent = node.parent;
        node.parent = newRoot;
        if (tempSubtree) {
            tempSubtree.parent = node;
        }

        // Update the parent's child pointer
        if (newRoot.parent) {
            if (newRoot.parent.left === node) {
                newRoot.parent.left = newRoot;
            } else {
                newRoot.parent.right = newRoot;
            }
        } else {
            this.root = newRoot;
        }

        return newRoot;
    }

    // Private helper: Left rotation
    _leftRotate(node) {
        var newRoot = node.right;
        var tempSubtree = newRoot.left;

        // Perform rotation
        newRoot.left = node;
        node.right = tempSubtree;

        // Update parent pointers
        newRoot.parent = node.parent;
        node.parent = newRoot;
        if (tempSubtree) {
            tempSubtree.parent = node;
        }

        // Update the parent's child pointer
        if (newRoot.parent) {
            if (newRoot.parent.left === node) {
                newRoot.parent.left = newRoot;
            } else {
                newRoot.parent.right = newRoot;
            }
        } else {
            this.root = newRoot;
        }

        return newRoot;
    }

    // Public helper: Check if tree is balanced (for testing)
    isBalanced() {
        return this._checkBalance(this.root);
    }

    // Private helper: Check if entire tree is balanced
    _checkBalance(node) {
        if (node === null) return true;

        var balance = this._getBalance(node);
        if (Math.abs(balance) > 1) return false;

        return this._checkBalance(node.left) && this._checkBalance(node.right);
    }

    // Public helper: Get tree values in order (for testing)
    getInOrderValues() {
        var values = [];
        this._inOrderTraversal(this.root, values);
        return values;
    }

    // Private helper: In-order traversal
    _inOrderTraversal(node, values) {
        if (node !== null) {
            this._inOrderTraversal(node.left, values);
            values.push(node.value);
            this._inOrderTraversal(node.right, values);
        }
    }
}

module.exports = AVLTree;
