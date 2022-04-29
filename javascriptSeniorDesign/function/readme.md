# 函数

这一章主要是讲解函数

## 什么是函数

函数实际是对象，每个函数都是function类型的实例。而function本身也有自己属性和方法

构造函数 `Function()` 

实例属性

 1. `Function.prototype.displayName`函数的显示名称。

    > 该特性是非标准的，请尽量不要在生产环境中使用它！[`mdn`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName)， 基本不兼容

2. [`Function.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/length)  函数期望的参数数量 - 属性指明函数的形参个数。

   1）...args 不定参的时候会输出0； 

   2）默认赋值参数，只会计算到赋值参数前面的形参的个数，后面他并不会算

   3）兼容性还可以。想想项目中有什么地方可以用到？

3. [`Function.prototype.name`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/name) 函数的名称。

   1）这个属性是只读的，不可以枚举但是是可配置的(es6) 。不重要！

   2）ie这个属性是全挂的

实例方法

1. apply 调用一个函数并将其 `this` 的值设置为提供的 `thisArg`。参数可用以通过[`数组`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)对象传递。
2. bind
3. call
4. toString

## 箭头函数

**声明方式：**

```
let arrowSum = (a, b) => {
      return a + b;
};
```

**参数：**

1. 没有参数或一个以上参数时候需要括号
2. 一个参数可以不适用括号

**函数体：**

1. 只有一句赋值操作、表达式代码时候，可以不使用花括号+return 的方式返回

   let triple = (x) => 3 * x;

**他的坑**

1. 箭头函数不能使用 arguments、super 和 new.target，也不能用作构造函数
2. 箭头函数也没有 prototype 属性。(就上面所提及的function实例的属性)



## 函数名

Function 既然是个对象，那么由他所创作的儿子-实例的函数名就是指向父亲的指针了。正如对象一样，他指针也是可以改变的。所以一个函数可以有多个名称

例如：Obj1 = {a:1}  obj1 = obj2 = obj3 .... 其实obj2, obj3指向的是同一个东西。

```
function sum(num1, num2) {
  return num1 + num2;
}
console.log(sum(10, 10));
// 20
let anotherSum = sum;
console.log(anotherSum(10, 10));  // 20
sum = null;
console.log(anotherSum(10, 10));  // 20
```

sum和anotherSum直接的赋值不会相互响应。即使sum = null 切断了与原函数的联系，但是anotherSum也可以照常使用。



## py函数参数

> 普通函数和箭头函数区别1： 箭头函数没有arguments对象

js的函数是不定参。你声明了参数个数的，和最后传递的不一定定是一致的。可以传1， 2， 3...或者你不传他都没有问题。只是你函数体拿不到这个参数而已。而且你也可以通过arguments来或者函数传递过来的参数。他是一个类数组，里面存储的是形参的类数组形式。

> 不过并不建议arguments+方括号运算符使用。因为这样代码看上去并不会很直观。

**重写argument的值**

当重写argument的值得时候，argument里面的值会变动。但是并不会影响的到传入的值。可以想象成当你修改argument里面值得时候，他从原argument复制了一个地址独立的副本出来！副本会保持同步更新你的重写值但是并不会影响到原argument的值。

**箭头函数中的argument**

达咩使用argument，一定要传递实参

```
function args() {
        console.log(arguments[0])
} 
args(1) // 1
let args1 = () => {
        console.log(arguments[0])
      }
args1(1) // arguments is not defined
```

但是你要强娶的话，可以使用function里面包裹箭头函数。按照作用域链原则。箭头函数里面的arguments[0]会取到function里面的arguments[0]



## 没有重载！！！

就如py参数哪里所言，参数不同并不能区分不同的函数。参数传与不传对函数可以说是没有影响。（typescript除外,这个神器就可以做到重载了）

命名同名函数，最后的结果只是后者覆盖前者！



## 默认参数值

function makeKing(name = 'Henry') {
 return `King ${name} VIII`;

}

函数声明时候可以给参数赋予默认值。这个副默认值的效果想当初之前说的在原argument基础上复制一个新的副本。

默认参数值并不限于原始值或对象类型，也可以使用调用函数返回的值

**参数调用的暂时性死区**

```
function makeKing(name = 'Henry', numerals = name) 
{ return `King ${name} ${numerals}`;}
console.log(makeKing()); // King Henry Henry

可以转换为

function makeKing(name = 'Henry', numerals = name) 
{ 
let name = 'Henry'
let numerals = name

return `King ${name} ${numerals}`;
}
console.log(makeKing()); // King Henry Henry
```

可以看出参数赋值是按照有一定顺序的，排在前面的参数先赋值，后面后赋值。

不难理解，参数初始化顺序遵循“暂时性死区”规则，即前面定义的参数不能引用后面定义的。像这样就会抛出错误。

```
function makeKing(name = numerals, numerals = '111') 
// 达咩
```



## 参数扩展与收集

**扩展参数**
在 ECMAScript 6 中，对可迭代对象应用扩展操作符，并将其作为一个参数传入，可以将可迭代对象拆分，并将迭代返回的每个值单独传入。可以把数组和字符串拆开传入。不用在接口一接受个数组后再拆开这个数组在进行运算（apply可以传参这是以前的做法）。

...value

**收集参数**

使用...value , 可以将不是数组的参数收集起来成为一个数组

```
const values = [1, 2, 3, 4, 5]
      function getSum(...values) {
        // 顺序累加 values 中的所有值
        // 初始值的总和为0
        return values.reduce((x, y) => x + y, 0)
      }
console.log(getSum(1, 2, 3)) // 不是数组
```

箭头函数也可以使用参数收集



## 函数声明与函数表达式

事实上，JavaScript 引擎在加载数据时对它们是区别对待的。JavaScript 引擎在任何代码执行之前，会先读取函数声明，并在执行上下文中 生成函数定义。而函数表达式必须等到代码执行到它那一行，才会在执行上下文中生成函数定义。

> 函数声明提升，但是函数表达式却不会。

除此之外其实**函数声明与函数表达式**是效果等价的



## 函数作为值

正如函数的真正意义上市内置变量function的实例。内置变量function是一个对象，其实函数是一个对象里面变量。

```
function callSomeFunction(someFunction, someArgument) {
      return someFunction(someArgument);
}
```



## 函数内部

arguments ， this，new.target

**arguments**

callee: callee 属性，是一个指向 arguments 对象所在函数的指针。

**arguments.callee** 可以代表本函数

递归调用时候，一个阶乘的例子

```
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
```

factorial和函数声明时候定义的函数名，紧密耦合。factorial函数赋值给别的名字后这个函数就无法正确使用。这个时候就可以使用callee指针

```
function factorial(num) {
  if (num <= 1) {
  	return 1;
	} else {
		return num * arguments.callee(num - 1);
 	} 
}


let trueFactorial = factorial;
factorial = function() { return 0;};
console.log(trueFactorial(5));  // 120 // 新名字的函数能够正确使用
console.log(factorial(5));      // 0

// trueFactorial 变量被赋值为 factorial，实际上把同一个函数的指针又保存到了另一个 位置
```



**this**

在标准函数中，this 引用的是把函数当成**方法调用的上下文对象**，这时候通常称其为 this 值(在网页的全局上下文中调用函数时，this 指向 windows)。

在箭头函数中，this 引用的是**定义箭头函数的上下文**。

函数名只是保存指针的变量。因此全局定义函数和局部定义函数是同一个函数，只不过执行的上下文不同。



**caller**

> 严格模式下使用 callee, caller 都会报错

ECMAScript 5 也会给函数对象上添加一个属性:caller。虽然 ECMAScript 3 中并没有定义，但所 有浏览器除了早期版本的 Opera 都支持这个属性。(兼容性不太好)

**这个属性引用的是调用当前函数的函数**，如果是全局作用域则为Null

```
function outer() {
        inner()
   }
function inner() {
        console.log(inner.caller) // 输出的是outer原代码
        // 同理可以使用 callee 来解除耦合
        console.log(arguments.callee.caller);
     }
outer()
```



**new.target**

ECMAScript 中的函数始终可以作为构造函数实例化一个新对象，也可以作为普通函数被调用。 ECMAScript 6 新增了检测函数是否使用 new 关键字调用的 new.target 属性。如果函数是正常调用的，

则new.target的值是undefined;如果是使用new关键字调用的，则new.target将引用被调用的 构造函数。



## 函数属性与方法

##### 属性：length , prototype

length在上面已经讨论过了

**prototype**

prototype 是保存引用类型所有实例方法的地方，这意味着 toString()、valueOf()等方法实际上都保存在 prototype 上，进而由所有实例共享。

##### 方法：apply()和 call(), bind()

apply()方法接收两个参数:函数内 this 的值和一个参数数 组。第二个参数可以是 Array 的实例，但也可以是 arguments 对象。

call()方法与 apply()的作用一样，只是传参的形式不同。参数则是逐个传递的

这两个方法可以控制调用这个函数的时候再那个上下文出执行和改变this的指向

bind()是返回一个函数



## 递归

非严格模式下可以使用arguments.callee 来表达自身

在严格模式+非严格模式下可以使用函数表达式

```
const factorial = (function f(num) {
      if (num <= 1) {
        return 1;
      } else {
        return num * f(num - 1);
	} 
});
```



## 尾调用优化（这是一个可优化项）

即外部函数的返回值是一个内部函数的返回值

```
function outerFunction() {
	return innerFunction(); // 尾调用
}
```

流程

在 ES6 优化之前，执行这个例子会在内存中发生如下操作。
 (1) 执行到 outerFunction 函数体，第一个栈帧被推到栈上。

 (2) 执行 outerFunction 函数体，到 return 语句。计算返回值必须先计算 innerFunction。

 (3) 执行到 innerFunction 函数体，第二个栈帧被推到栈上。

 (4) 执行 innerFunction 函数体，计算其返回值。

 (5) 将返回值传回 outerFunction，然后 outerFunction 再返回值。

 (6) 将栈帧弹出栈外。

 在 ES6 优化之后，执行这个例子会在内存中发生如下操作。
 (1) 执行到 outerFunction 函数体，第一个栈帧被推到栈上。

 (2) 执行 outerFunction 函数体，到达 return 语句。为求值返回语句，必须先求值 innerFunction。 

 (3) 引擎发现把第一个栈帧弹出栈外也没问题，因为 innerFunction 的返回值也是 outerFunction的返回值。

 (4) 弹出 outerFunction 的栈帧。

 (5) 执行到 innerFunction 函数体，栈帧被推到栈上。

 (6) 执行 innerFunction 函数体，计算其返回值。

 (7) 将 innerFunction 的栈帧弹出栈外。



要使用未调用优化的条件

代码在严格模式下执行， 外部函数的返回值是对尾调用函数的调用 ，调用函数返回后不需要执行额外的逻辑， 尾调用函数不是引用外部函数作用域中自由变量的闭包。