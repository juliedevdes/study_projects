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
    constructor(rootValue) {
        this.root = new BinaryTreeNode(rootValue);
    }

    addNode(value, parentNode = this.root) {
        var newNode = new BinaryTreeNode(value);
        parentNode.addNode(newNode);

        var balance = this.checkTreeBalance();

        if (balance > 1 || balance < -1) {
            this.rebalance();
        }

        return newNode;
    }

    removeNode(value) {
        var nodeToRemove = this.findNode(value);
        // add logic to remove node from tree, then check balance and rebalance if needed
        if (nodeToRemove) {
            // handle three cases: node is a leaf, node has one child, node has two children
        }
    }

    findNode(value, startNode = this.root) {
        //binary search - big O(log n)

        if (startNode.value > value) {
            if (startNode.left) {
                return this.findNode(value, startNode.left);
            } else {
                return null;
            }
        } else if (startNode.value < value) {
            if (startNode.right) {
                return this.findNode(value, startNode.right);
            } else {
                return null;
            }
        } else {
            return startNode;
        }
    }

    checkTreeBalance() {
        var balanceCount = 0;

        var leftSubtreeHeight = this.getSubtreeHeight(this.root.left);
        var rightSubtreeHeight = this.getSubtreeHeight(this.root.right);

        balanceCount = leftSubtreeHeight - rightSubtreeHeight;

        return balanceCount;
    }

    getSubtreeHeight(node) {
        if (node === null) return 0;

        var leftHeight = this.getSubtreeHeight(node.left);
        var rightHeight = this.getSubtreeHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    rebalance() {
        var balance = this.checkTreeBalance();
        var node = this.root;
        // Left heavy
        if (balance > 1) {
            // Left-Right case
            if (this.checkTreeBalance() < 0) {
                node.left = this._leftRotate(node.left);
            }
            // Left-Left case
            return this._rightRotate(node);
        }

        // Right heavy
        if (balance < -1) {
            // Right-Left case
            if (this.checkTreeBalance() > 0) {
                node.right = this._rightRotate(node.right);
            }
            // Right-Right case
            return this._leftRotate(node);
        }
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
}
