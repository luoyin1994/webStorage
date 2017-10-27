let toString = Object.prototype.toString;

let _typeof = value => {
    let typeString = toString.call(value);
    // let a = typeString.match(/^\[object\s(\w+)\]$/)


    // 如果执行exec方法的正则表达式没有分组（没有括号括起来的内容），
    // 那么如果有匹配，他将返回一个只有一个元素的数组，这个数组唯一的元素就是该正则表达式匹配的第一个串;
    // 如果没有匹配则返回null。

    // let a = /^\[object\s(\w+)\]$/.exec(typeString);
    // console.log(a[0], a[1], a[2]); // [object Null] Null undefined

    let a = /^\[object\s\w+\]$/.exec(typeString);
    console.log(a[0], a[1], a[2]); // [object Null] undefined undefined


};
_typeof(null);