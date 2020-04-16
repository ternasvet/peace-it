let array = [2, -3, 45, 5, 7];

function mySplice(arr, start, deleteCount, item) {

    if (start < 0) {
        start = arr.length + start;
    }

    if (start > arr.length) {
        start = arr.length;
    }
    let startWithDeleteCount = start + deleteCount;

    let result = [];

    for (let i = 0; i < start; i++) {
        result.push(arr[i]);
    }

    if (arguments.length > 3) {
        for (let i = 3; i < arguments.length; i++) {
            result.push(arguments[i]);
        }
    }

    for (let i = startWithDeleteCount; i < arr.length; i++) {
        result.push(arr[i]);
    }
    return result;
}

console.log(mySplice(array, 2, 1, 'fw', '54'));
