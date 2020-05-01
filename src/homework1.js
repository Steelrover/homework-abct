// Test function
function getPromise(number) {
  return new Promise((resolve, reject) => {
    // Simulation of receiving data and query execution delay
    let rand = Math.floor(1 + Math.random() * 10);
    setTimeout(() => {
      console.log(rand + ' seconds');
      if (Math.random() < 0.5) {
        resolve(number + rand);
      } else {
        reject(new Error("Ooops"));
      }
    }, rand * 1000);
  });
}

// The function receives any number of promises instead of two
function all(...promises) {
  let counter = 0;
  let intervalId = null;
  const resultArray = [];
  const promiseHandler = (result, i) => {
    counter++;
    resultArray[i] = result;
  };

  promises.forEach((promise, i) => {
    promise.then((res) => promiseHandler(res, i))
      .catch((err) => promiseHandler(err, i));
  });

  const resultPromise = new Promise(resolve => {
    intervalId = setInterval(() => {
      if (counter === promises.length) {
        clearInterval(intervalId);
        resolve(resultArray);
      }
    }, 1000);
  });

  return resultPromise;
}

all(getPromise(1), getPromise(3)).then(res => {
  console.log(res);
});
