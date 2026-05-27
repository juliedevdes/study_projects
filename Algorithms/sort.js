// =======================
// SELECTION SORT
// =======================
// Steps: Find smallest element in unsorted part and swap with current position
function selectionSort(arrayToSort) {
    for (let currentIndex = 0; currentIndex < arrayToSort.length; currentIndex++) {
        let indexOfMinimumValue = currentIndex;

        // Find smallest in remaining array
        for (
            let comparisonIndex = currentIndex + 1;
            comparisonIndex < arrayToSort.length;
            comparisonIndex++
        ) {
            if (arrayToSort[comparisonIndex] < arrayToSort[indexOfMinimumValue]) {
                indexOfMinimumValue = comparisonIndex;
            }
        }

        // Swap current with smallest
        [arrayToSort[currentIndex], arrayToSort[indexOfMinimumValue]] = [
            arrayToSort[indexOfMinimumValue],
            arrayToSort[currentIndex],
        ];
    }
    return arrayToSort;
}

// =======================
// QUICK SORT
// =======================
// Steps: Choose pivot, partition into smaller and larger, recursively sort
function quickSort(arrayToSort) {
    if (arrayToSort.length <= 1) return arrayToSort;

    const pivotElement = arrayToSort[arrayToSort.length - 1];
    const elementsLessThanPivot = [];
    const elementsGreaterThanPivot = [];

    // Partition array based on pivot
    for (let currentIndex = 0; currentIndex < arrayToSort.length - 1; currentIndex++) {
        if (arrayToSort[currentIndex] < pivotElement) {
            elementsLessThanPivot.push(arrayToSort[currentIndex]);
        } else {
            elementsGreaterThanPivot.push(arrayToSort[currentIndex]);
        }
    }

    // Recursively sort and combine
    return [
        ...quickSort(elementsLessThanPivot),
        pivotElement,
        ...quickSort(elementsGreaterThanPivot),
    ];
}

// =======================
// MERGE SORT
// =======================
// Steps: Divide array, sort halves, merge sorted halves
function mergeSort(arrayToSort) {
    if (arrayToSort.length <= 1) return arrayToSort;

    const middleIndex = Math.floor(arrayToSort.length / 2);
    const leftHalf = mergeSort(arrayToSort.slice(0, middleIndex));
    const rightHalf = mergeSort(arrayToSort.slice(middleIndex));

    return mergeSortedArrays(leftHalf, rightHalf);
}

// Merge helper: Combine two sorted arrays
function mergeSortedArrays(leftArray, rightArray) {
    const mergedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare and merge
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] < rightArray[rightIndex]) {
            mergedArray.push(leftArray[leftIndex]);
            leftIndex++;
        } else {
            mergedArray.push(rightArray[rightIndex]);
            rightIndex++;
        }
    }

    // Add remaining elements
    return [...mergedArray, ...leftArray.slice(leftIndex), ...rightArray.slice(rightIndex)];
}

// =======================
// TEST EXAMPLES
// =======================
const testArray = [664654, 25545, 65512, 282, 1964561];

console.log('Selection Sort:', selectionSort([...testArray]));
console.log('Quick Sort:', quickSort([...testArray]));
console.log('Merge Sort:', mergeSort([...testArray]));

const nestedList = [1, [2, [3, 4], 5], 6];

console.log('Selection Sort Nested:', selectionSort([...nestedList]));
console.log('Quick Sort Nested:', quickSort([...nestedList]));
console.log('Merge Sort Nested:', mergeSort([...nestedList]));

// selection sort - loop, а quick & merge рекурсивні.
// рекурсія працює для складних і nested даних.
// З нею набагато простіше працювати хоч і це більш навантажує стак.

// І коли я потестила код з такими даними (хоч я і не враховувала це),
// саме рекурсивні методи спрацювали без змін
