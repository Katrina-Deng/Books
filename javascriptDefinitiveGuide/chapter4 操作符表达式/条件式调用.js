// old
{
  function use1(x, log) {
    if (log) {
      log(x);
    }
    return x * x;
  }

  const foo = use1(10);
  const baz = use1(10, function (args) {
    console.log("args", args);
  });
  console.log("foo", foo);
  console.log("baz", baz);
}
// new  log 如果不是函数也会报错
{
  function use2(x, log) {
    log?.(x); //可选链接
    return x * x;
  }
}
