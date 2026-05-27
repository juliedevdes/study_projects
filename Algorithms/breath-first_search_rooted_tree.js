const Queue = require('./helpers/Queue');
const RootedTree = require('./graphs/RootedTree');

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

function bfs(tree, startNode, targetValue) {
    const queue = new Queue();
    queue.enqueue(tree.findNode(startNode));
    // const visited = new Set([startNode]); for rooted tree unessesary because uncyclic and no repeated nodes

    while (!queue.isEmpty()) {
        const current = queue.dequeue(); // key diff from DFS vs BFS, we search broader first

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
                queue.enqueue(child);
            });
        }
    }

    return null;
}

// Test Cases for BFS
console.log('=== BFS Test Cases ===');

// Test 1: Find path A -> J (expected: shortest path)
console.log('Test 1 - A to J:', bfs(tree, 'A', 'J')); // Expected: [A, D, H, J]
// Result: [ 'A', 'D', 'H', 'J' ] ✅

// Test 2: Find path A -> I
console.log('Test 2 - A to I:', bfs(tree, 'A', 'I')); // Expected: [A, B, F, I]
// Result: [ 'A', 'B', 'F', 'I' ] ✅

// Test 3: Find path A -> G
console.log('Test 3 - A to G:', bfs(tree, 'A', 'G')); // Expected: [A, C, G]
// Result: [ 'A', 'C', 'G' ] ✅

// Test 4: Find path A -> E
console.log('Test 4 - A to E:', bfs(tree, 'A', 'E')); // Expected: [A, B, E]
// Result: [ 'A', 'B', 'E' ] ✅

// Test 5: Same start and target
console.log('Test 5 - A to A:', bfs(tree, 'A', 'A')); // Expected: [A]
// Result: [ 'A' ] ✅

// Test 6: Non-existent target
console.log('Test 6 - A to Z:', bfs(tree, 'A', 'Z')); // Expected: null
// Result: null ✅

// Test 7: Different root
console.log('Test 7 - B to I:', bfs(tree, 'B', 'I')); // Expected: [B, F, I]
// Result: [ 'A', 'B', 'F', 'I' ] ⚠️ (includes path from root A)

// Test 8: Find leaf nodes
console.log('Test 8 - A to E:', bfs(tree, 'A', 'E')); // Expected: [A, B, E]
// Result: [ 'A', 'B', 'E' ] ✅
