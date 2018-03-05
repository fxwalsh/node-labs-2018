const timeout = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      doSomethingThatMightFail() ? resolve('Success') : reject(Error('It broke'));
    }, 1000)
  })
};

async function doSomethingAsync() {
  console.log('async thing started')

  let result = await timeout().catch(console.log('Didn\'t go too well'));
  console.log(`async thing finished ${result}`)

}
doSomethingAsync().catch(console.log('Didn\'t go too well'));

const doSomethingThatMightFail = () => {
  return (Math.random() > .5) ? true : false;
};
