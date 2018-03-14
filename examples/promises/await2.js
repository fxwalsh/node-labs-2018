const promise = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      doSomethingThatMightFail() ? resolve('Success') : reject(Error('It broke'));
    }, 1000)
  })
};

const asyncWrapper = fn => {
    return Promise.resolve(fn)
      .catch(rejectResult => {return rejectResult.message});
};

async function doSomethingAsync() {
    const result = await asyncWrapper(promise());
    console.log(result);
}



doSomethingAsync();

const doSomethingThatMightFail = () => {
  return (Math.random() > .5) ? true : false;
};
