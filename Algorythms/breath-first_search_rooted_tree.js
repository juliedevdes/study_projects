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

console.log(bfs(tree, 'A', 'J')); // [A, D, H, J]
