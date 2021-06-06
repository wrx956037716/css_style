const fn = function (totalVal, curVal, i, arr) {
    return totalVal + curVal
};
Array.prototype.myReduce = function fakeReduce(fn, base) {
    if (typeof fn !== 'function') {
        throw TypeError(fn + '  is not a function')
    }
    // let arr = base ? this.unshift(base) : this;// 首进,返回新数组的长度，影响原数组 故不能这么写
    let initialArr = this;
    let arr = initialArr.concat(); //得到副本

    if (base !== undefined) arr.unshift(base); // 当存在归并基础值的参数时，将其从数组首部推入
    let index = 0;
    if (arr.length == 0) {
        throw TypeError("Array can not be empty");
    }
    if (arr.length == 1) {
        return arr[0];
    }
    while (arr.length > 2) {
        index = initialArr.length - arr.length + 1;//有传递初始值，当前元素使用arr[0],否则使用arr[1],
        let newValue = fn.call(null, arr[0], arr[1], index, initialArr);
        arr.splice(0, 2, newValue);
    }
    //此时数组剩下最后两个元素，返回结果即可
    index += 1;
    let result = fn.call(null, arr[0], arr[1], index, initialArr);
    return result;
};
let arr = [2,22,33];
console.log(arr.reduce(fn, 0));
console.log("====my:====")
console.log(arr.myReduce(fn, 0));
————————————————
版权声明：本文为CSDN博主「有时孤独」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Y_seaboy/article/details/115267371