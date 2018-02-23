const promise = new Promise((resolve, reject)=> {
  // do a thing, possibly async, then…
console.log('setTimeout');
  setTimeout(()=> {
    if (doSomethingThatMightFail()) {
      resolve( 'Stuff worked!');
    } else {
      reject(Error('It broke'));
    }
}, 1000);
}
);

promise.then((result) => {
  console.log(result); // "Stuff worked!"
}, (err)=>{
  console.log(err); // Error: "It broke"
});

const doSomethingThatMightFail = ()=>{
   return result = (Math.random()>.5)? true:false;
};
