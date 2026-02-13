// DFS Data Structures
// Note: DFS typically uses a STACK (LIFO), not a queue (FIFO) which is used for BFS

const Stack = require('./helpers/Stack');
const RootedTree = require('./graphs/RootedTree');

// Example tree structure for testing your DFS implementation:
//       A
//      /|\
//     B C D
//    /| |  \
//   E F G   H
//     |     |
//     I     J

const tree = new RootedTree('A');
tree.addChildToNode('A', 'B');
tree.addChildToNode('A', 'C');
tree.addChildToNode('A', 'D');
tree.addChildToNode('B', 'E');
tree.addChildToNode('B', 'F');
tree.addChildToNode('C', 'G');
tree.addChildToNode('D', 'H');
tree.addChildToNode('F', 'I');
tree.addChildToNode('H', 'J');

//       A
//      /|\
//     B C D
//    /| |  \
//   E F G   H
//     |     |
//     I     J
//
// directed rooted tree
// План: dfs(А, J) > повертає шлях [A, D, H, J]
// 1) Створити стек і додати стартову ноду
// 2) Поки стек не порожній:
//     ► витягнути останню ноду зі стеку
//     = targetValue? повернути шлях до неї (parent property generates path back to root)
//     ≠ targetValue? додати дітей цієї  ноди до стеку (починаючи з останнього, щоб перший доданий був першим перевіреним LaST IN FIRST OUT)
// Як згенувати шлях? - можна використовувати властивість parent в кожній ноді,
// щоб відстежувати шлях назад до кореня після знаходження цільової ноди.

function dfs(tree, startNode, targetValue) {
    const stack = new Stack();
    stack.push(tree.findNode(startNode));

    while (!stack.isEmpty()) {
        const current = stack.pop(); // key diff from DFS vs BFS, we search deeper first

        if (current.value === targetValue) {
            const path = [];

            let node = current;
            while (node !== null) {
                // parent === null only for root node
                path.unshift(node.value);
                node = node.parent;
            }

            return path;
        }

        if (current.children) {
            current.children.forEach(child => {
                stack.push(child);
            });
        }
    }

    return null;
}

// Test Cases for DFS
console.log('=== DFS Test Cases ===');

// Test 1: Find path A -> J (DFS might find different path than BFS)
console.log('Test 1 - A to J:', dfs(tree, 'A', 'J')); // Expected: [A, D, H, J]
// Result: [ 'A', 'D', 'H', 'J' ] ✅

// Test 2: Find path A -> I
console.log('Test 2 - A to I:', dfs(tree, 'A', 'I')); // Expected: [A, B, F, I]
// Result: [ 'A', 'B', 'F', 'I' ] ✅

// Test 3: Find path A -> G
console.log('Test 3 - A to G:', dfs(tree, 'A', 'G')); // Expected: [A, C, G]
// Result: [ 'A', 'C', 'G' ] ✅

// Test 4: Find path A -> E (DFS explores deeper first)
console.log('Test 4 - A to E:', dfs(tree, 'A', 'E')); // Expected: [A, B, E]
// Result: [ 'A', 'B', 'E' ] ✅

// Test 5: Same start and target
console.log('Test 5 - A to A:', dfs(tree, 'A', 'A')); // Expected: [A]
// Result: [ 'A' ] ✅

// Test 6: Non-existent target
console.log('Test 6 - A to Z:', dfs(tree, 'A', 'Z')); // Expected: null
// Result: null ✅

// Test 7: Different root
console.log('Test 7 - B to I:', dfs(tree, 'B', 'I')); // Expected: [B, F, I]
// Result: [ 'A', 'B', 'F', 'I' ] ⚠️ (includes path from root A)

// Test 8: Test deepest node first characteristic of DFS
console.log('Test 8 - A to D:', dfs(tree, 'A', 'D')); // Expected: [A, D]
// Result: [ 'A', 'D' ] ✅
