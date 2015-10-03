var ex = Example.at(Example.deployed_address);

var event = ex.Incremented();
//event.watch(callbackFun(error,data));
event.watch(function(error, result){
  console.log("event!");
  console.log(error);
  if (!error)
    console.log(result);
    console.log(result.args.odd);
    console.log(result.args.x);
});


function callbackFun(error,data){
    var args = data.args;
    console.log('callbackFun');
    console.log(args.odd);
    console.log(args.x);
}

ex.inc()
.then(function(tx) {
  console.log('inc');
  return ex.get.call();
}).then(function(x){
  console.log(Number(x));
  process.exit(0);
}).catch(function(e) {
  console.log(e);
  process.exit(1);
});
