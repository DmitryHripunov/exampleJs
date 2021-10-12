const promiseTimeOut = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function longRunningOperation() {
  return 423;
}

async function run() {
  console.log('start')
  await promiseTimeOut(2000);

  const response = await longRunningOperation()
  console.log(response)

  await promiseTimeOut(2000);
  console.log('stop')
}

run();