/**
 * Queue class with O(1) enqueue/dequeue operations
 * Uses internal pointers to avoid expensive shift() operations
 */
class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }

    // O(1) - Add element to rear of queue
    enqueue(element) {
        this.items[this.rear] = element;
        this.rear++;
    }

    // O(1) - Remove and return front element
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        const element = this.items[this.front];
        delete this.items[this.front]; // Free memory
        this.front++;

        // Reset pointers when queue becomes empty to prevent memory leak
        if (this.front === this.rear) {
            this.front = 0;
            this.rear = 0;
            this.items = [];
        }

        return element;
    }

    // O(1) - Check front element without removing
    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.front];
    }

    // O(1) - Check if queue is empty
    isEmpty() {
        return this.front === this.rear;
    }

    // O(1) - Get size
    size() {
        return this.rear - this.front;
    }

    // Helper method to see all elements (for debugging)
    toArray() {
        return this.items.slice(this.front, this.rear);
    }
}

module.exports = Queue;
