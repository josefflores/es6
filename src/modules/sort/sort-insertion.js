export function insertionSort(A) {
    let j, i, key;
    for (j = 0; j < A.length; ++j) {
        key = A[j];
        for (i = j - 1;
            (i >= 0) && (A[i] > key); --i) {
            A[i + 1] = A[i];
        }
        A[i + 1] = key;
    };
    return A;
};