//      A
//     / \
//    B   C
//   / \   \
//  D   E---F
//
// class Node - implement - instance of node ► Node A

// A: ['B', 'C'],
// B: ['D', 'E'],
// C: ['F'],
// D: [],
// E: ['F'],
// F: [],

// retuns object with nodes that are in order to retrive item the fastest way??
// взяти start і подивитися чи немає в його зв'язках goal
// якщо є, то додати start і goal в shortestPath і повернути його
// якщо немає, то додати зв'язки start в чергу і повторити процес для кожного зв'язку

// додавати nodes в масив shortestPath, щоб трекати шлях = трекаємо зайві ноди
// рішення - зберігати шлях до кожного node в черзі, а не просто node, щоб мати змогу повернути шлях до goal, коли його знайдемо

// function bfs(graph, start, goal) {
//     const shortestPath = [start];
//     const queue = [start];
//
//     while (queue.length > 0) {
//         const node = queue.shift();
//
//         if (graph[node].includes(goal)) {
//             shortestPath.push(node);
//             shortestPath.push(goal);
//             return shortestPath;
//         }
//        shortestPath.push(node);
//         queue.push(...graph[node]);
//     }
//     return shortestPath;
// }

// 1) перший "шлях" в черзі - це масив з одним елементом - стартовим вузлом
// 2) берем перший шлях з черги ►
//    берем останню ноду з шляхів на черзі  = goal? ► якщо так, то повернути цей шлях
// ````````````````                                 ► якщо ні, то з його зв'язків створити нові шляхи і додати в чергу
// 3) повторюємо, доки ми не знайдемо goal як останню ноду (або поки не закінчиться черга)
//

function bfs(graph, start, goal) {
    const queue = [[start]];
    const visited = new Set([start]);

    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];

        if (node === goal) {
            return path; // якщо остання нода в шляху - це goal, то повернути цей і є найкоротший шлях
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const relation of graph[node]) {
            if (!visited.has(relation)) {
                queue.push([...path, relation]); // додаємо нові згенеровані шляхи в чергу для перевірки
                visited.add(relation); // потрібно на випадок якщо в графі є повторюванні зв'язки
            }
        }
    }

    return null; // no goal in graph
}

//      A
//     / \
//    B   C
//   / \   \
//  D   E   F
//       \
//        F
const graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: ['F'],
    F: [],
};

// reason to add visited - to avoid adding the same node to the queue multiple times,
//      A
//     / \
//    B   C
//   / \   \
//  D---E   F
//       \
//        F
const graph2 = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: ['E'],
    E: ['F'],
    F: [],
};

// expected output: ['A','C', 'F']
console.log(bfs(graph, 'A', 'F'));

// expected output: ['A','B','E']
console.log(bfs(graph, 'A', 'E'));

// expected output: ['A','C', 'F']
console.log(bfs(graph2, 'A', 'F'));

// expected output: null
console.log(bfs(graph2, 'E', 'A'));

// expected output: ['E', 'F']
console.log(bfs(graph, 'E', 'F'));
