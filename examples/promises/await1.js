const promise = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      doSomethingThatMightFail() ? resolve('Success') : reject(Error('It broke'));
    }, 1000)
  })
};

async function doSomethingAsync() {
  try{
    let result = await promise();
    console.log(result);
  }catch (rejectedValue){
    console.log(rejectedValue);
  }
}



doSomethingAsync();

const doSomethingThatMightFail = () => {
  return (Math.random() > .5) ? true : false;
};
