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

console.log(dfs(tree, 'A', 'J')); // [A, D, H, J]
