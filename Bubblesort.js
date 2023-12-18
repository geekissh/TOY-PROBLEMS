// E.P.Q. This function implements the Bubble Sort algorithm to sort an array in ascending order.
function bubbleSort(arr) {
    // Outer loop to traverse the entire array.
    for (let i = 0; i < arr.length - 1; i++) {
        // Inner loop to compare and swap adjacent elements, pushing the largest element to the end.
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // Compare adjacent elements and swap them if they are in the wrong order.
            if (arr[j] > arr[j + 1]) {
                // Using destructuring assignment to swap elements without the need for a temporary variable.
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    // The sorted array is returned after the outer loop completes.
    return arr;
}

// Example usage: Sorting an array using the Bubble Sort function.
console.log(bubbleSort([5, 6, 1, 3, 4, 2]));