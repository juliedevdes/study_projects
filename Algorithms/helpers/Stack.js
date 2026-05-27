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

    // O(1) - Check if stack is empty
    isEmpty() {
        return this.items.length === 0;
    }
}

module.exports = Stack;
