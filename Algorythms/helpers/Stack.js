/**
 * Stack class with O(1) push/pop operations
 */
class Stack {
    constructor() {
        this.items = [];
    }

    // O(1) - Add element to top of stack
    push(element) {
        this.items.push(element);
    }

    // O(1) - Remove and return last element
    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }

    // O(1) - Check top element without removing
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    // O(1) - Check if stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // O(1) - Get size
    size() {
        return this.items.length;
    }
}

module.exports = Stack;
