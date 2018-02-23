import req from 'https';
/**
 * gets a URL.
 * @param {string} url url to get.
 * @param {int} num2 The second number.
 * @return {Promise} a promise that handles the request
 */
function get(url) {
  return new Promise((resolve, reject) => {
    req.get(url, (resp) => {
      const {statusCode} = resp;
      // reject if status not ok or redirect
      if (!validStatus(statusCode)) {
        reject(Error('Request Failed.\n' +
          `Status Code: ${statusCode}`));
      }
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      // The whole response has been received - Resolve.
      resp.on('end', () => {
       resolve(data);
      });
    });
    // Handle network errors
    req.onerror = () => {
      reject(Error('Network Error'));
    };
  });
}

  getJSON('https://raw.githubusercontent.com/fxwalsh/node-samples-2018/master/examples/posts.json').then((response) => {
//  let post = posts.find((posts)=>{
//    posts.id===1;
//  });
  console.log(response.posts[0]);
  return get(response.posts[0].link);
}).then((result) => {
  console.log(`Got link for 1st post! : ${result}`);
}, (error) => {
    console.error('Failed!', error);
  });

  /**
   * checks http status code.
   * @param {number} statusCode HTTP status code.
   * @return {boolean} true if acceptable status code
   */
  function validStatus(statusCode) {
    const validStatusCodes=[200, 302];
    return validStatusCodes.find((code) => code == statusCode);
  }

  /**
   * parses Json from promise.
   * @param {string} url url to get.
   * @return {JSON} json object
   */
function getJSON(url) {
  return get(url).then(JSON.parse);
}
