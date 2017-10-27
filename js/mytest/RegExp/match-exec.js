let typeString = '[object Null]';

// exec
// 如果执行exec方法的正则表达式没有分组（没有括号括起来的内容），
// 那么如果有匹配，他将返回一个只有一个元素的数组，这个数组唯一的元素就是该正则表达式匹配的第一个字符串;
// 如果没有匹配则返回null。
// 永远只返回第一个匹配。
// 如果找到了匹配，而且包含分组的话，返回的数组将包含多个元素，第一个元素是找到的匹配，之后的元素依次为该匹配中的第一、第二...个分组（反向引用）

// 如果执行exec方法的正则表达式没有分组（没有括号括起来的内容）
// let a = /^\[object\s(\w+)\]$/.exec(typeString);
// console.log(a); // [ '[object Null]', 'Null', index: 0, input: '[object Null]' ]

// 那么如果有匹配，他将返回一个只有一个元素的数组，这个数组唯一的元素就是该正则表达式匹配的第一个字符串
// let a = /^\[object\s\w+\]$/.exec(typeString);
// console.log(a); // [ '[object Null]', index: 0, input: '[object Null]' ]

// 如果没有匹配则返回null
// let a = /^\[objectx\s\w+\]$/.exec(typeString);
// console.log(a); // null

typeString = '[object Null] [object String]';
// 永远只返回第一个匹配
// let a = /\[object\s\w+\]/g.exec(typeString);
// console.log(a); // [ '[object Null]',index: 0,input: '[object Null] [object String]' ]

// 如果找到了匹配，而且包含分组的话，返回的数组将包含多个元素，第一个元素是找到的匹配，之后的元素依次为该匹配中的第一、第二...个分组（反向引用）
// let a = /\[(object)\s(\w+)\]/g.exec(typeString);
// console.log(a); // [ '[object Null]','object','Null',index: 0,input: '[object Null] [object String]' ]

// match 与 exec
// exec永远只返回第一个匹配，而match在正则指定了g属性的时候，会返回所有匹配
// 不用g全局匹配时，match和exec返回相同

typeString = '[object Null] [object String]';

// exec永远只返回第一个匹配，而match在正则指定了g属性的时候，会返回所有匹配
// let regExp = /\[object\s\w+\]/g;
//
// let a = typeString.match(regExp); // [ '[object Null]', '[object String]' ]
// let b = regExp.exec(typeString); // [ '[object Null]',index: 0,input: '[object Null] [object String]' ]
//
// console.log(a); // [ '[object Null]',index: 0,input: '[object Null] [object String]' ]
// console.log(b); // [ '[object Null]',index: 0,input: '[object Null] [object String]' ]

// 不用g全局匹配时，match和exec返回相同
// let regExp = /\[object\s\w+\]/;
//
// let a = typeString.match(regExp);
// let b = regExp.exec(typeString);
// console.log(a); // [ '[object Null]',index: 0,input: '[object Null] [object String]' ]
// console.log(b); // [ '[object Null]',index: 0,input: '[object Null] [object String]' ]

// 如果找到了匹配，而且包含分组的话，返回的数组将包含多个元素，第一个元素是找到的匹配，之后的元素依次为该匹配中的第一、第二...个分组（反向引用）
// let a = /\[(object)\s(\w+)\]/g.exec(typeString);
// console.log(a); // [ '[object Null]','object','Null',index: 0,input: '[object Null] [object String]' ]

// match函数如果只返回了唯一的匹配，将和exec具有一样的功能
let a = typeString.match(/\[(object)\s(\w+)\]/);
console.log(a); // [ '[object Null]','object','Null',index: 0,input: '[object Null] [object String]' ]


// match是返回所有匹配的字符串合成的数组，但是正则表达式必须指定全局g属性才能返回所有匹配，不指定g属性则会返回一个只有一个元素的数组。

// exec永远返回与第一个匹配相关的信息，其返回数组包括第一个匹配的字串，所有分组的反向引用。