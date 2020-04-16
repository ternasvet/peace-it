let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function myReduce(arr, cb, init) {
    for (let i = 0; i < arr.length; i++) {
        init = cb(arr[i], init);
    }
    return init;
}
console.log(myReduce(array, function (it, add) {
    return add += it;
}, 0));
