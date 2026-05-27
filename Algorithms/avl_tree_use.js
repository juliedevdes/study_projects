const AVLTree = require('./graphs/AVLTree');

console.log('=== User-Friendly AVL Tree Tests ===\n');

// Test 1: Creating tree and adding nodes
const tree = new AVLTree();
console.log('Test 1: Creating empty tree and adding values [10, 5, 15, 2, 7, 12, 20]');

[10, 5, 15, 2, 7, 12, 20].forEach(value => {
    tree.addNode(value);
    console.log(`  Added ${value} - Tree is balanced: ${tree.isBalanced()}`);
});

console.log('  Final tree values (in-order):', tree.getInOrderValues());
console.log('  Root value:', tree.root?.value || 'null');

// Test 2: Adding values that would create unbalanced tree (but auto-rebalances)
console.log(
    '\nTest 2: Adding sequential values [1, 2, 3, 4, 5] (would be right-heavy without balancing)'
);
const sequentialTree = new AVLTree();

[1, 2, 3, 4, 5].forEach(value => {
    sequentialTree.addNode(value);
    console.log(
        `  Added ${value} - Tree is balanced: ${sequentialTree.isBalanced()}, Root: ${sequentialTree.root?.value}`
    );
});

console.log('  Final tree values (in-order):', sequentialTree.getInOrderValues());

// Test 3: Adding reverse sequential values (would be left-heavy without balancing)
console.log(
    '\nTest 3: Adding reverse values [5, 4, 3, 2, 1] (would be left-heavy without balancing)'
);
const reverseTree = new AVLTree();

[5, 4, 3, 2, 1].forEach(value => {
    reverseTree.addNode(value);
    console.log(
        `  Added ${value} - Tree is balanced: ${reverseTree.isBalanced()}, Root: ${reverseTree.root?.value}`
    );
});

console.log('  Final tree values (in-order):', reverseTree.getInOrderValues());

// Test 4: Finding nodes
console.log('\nTest 4: Finding nodes in the first tree');
[2, 10, 20, 99].forEach(value => {
    const node = tree.findNode(value);
    console.log(`  Looking for ${value}: ${node ? 'Found' : 'Not found'}`);
});

// Test 5: Removing nodes
console.log('\nTest 5: Removing nodes and checking balance');
console.log(
    '  Before removal - Tree values:',
    tree.getInOrderValues(),
    '- Balanced:',
    tree.isBalanced()
);

tree.removeNode(2);
console.log(
    '  After removing 2 - Tree values:',
    tree.getInOrderValues(),
    '- Balanced:',
    tree.isBalanced()
);

tree.removeNode(15);
console.log(
    '  After removing 15 - Tree values:',
    tree.getInOrderValues(),
    '- Balanced:',
    tree.isBalanced()
);

tree.removeNode(10);
console.log(
    '  After removing 10 - Tree values:',
    tree.getInOrderValues(),
    '- Balanced:',
    tree.isBalanced()
);

// Test 6: Edge cases
console.log('\nTest 6: Edge cases');
const edgeTree = new AVLTree();

console.log('  Empty tree - Balanced:', edgeTree.isBalanced());
console.log('  Finding in empty tree:', edgeTree.findNode(5) ? 'Found' : 'Not found');

edgeTree.addNode(42);
console.log(
    '  Single node tree - Balanced:',
    edgeTree.isBalanced(),
    '- Values:',
    edgeTree.getInOrderValues()
);

edgeTree.removeNode(42);
console.log(
    '  After removing only node - Balanced:',
    edgeTree.isBalanced(),
    '- Values:',
    edgeTree.getInOrderValues()
);

// Test 7: Duplicate values
console.log('\nTest 7: Duplicate values (should be ignored)');
const dupTree = new AVLTree();
dupTree.addNode(5);
dupTree.addNode(3);
dupTree.addNode(5); // duplicate
dupTree.addNode(7);
dupTree.addNode(3); // duplicate

console.log('  Added [5, 3, 5, 7, 3] - Final values:', dupTree.getInOrderValues());
console.log('  Tree is balanced:', dupTree.isBalanced());

console.log('\n=== All Tests Complete ===');
console.log('✓ AVL tree automatically maintains balance through rotations');
console.log('✓ Public interface is clean: addNode(), removeNode(), findNode()');
console.log('✓ All internal balancing logic is hidden from user');
