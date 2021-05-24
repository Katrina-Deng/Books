/*
 * @Des:正则表达式
 * @Version:
 * @Author: Ellen
 * @Date: 2021-05-24 12:22:13
 * @LastEditors: Ellen
 * @LastEditTime: 2021-05-24 13:49:00
 */
let str = "6 plus 8 euqal 14";
let result = str.match(/\d+/g);
console.log("result", result);
