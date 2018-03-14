import req from 'http';
/**
 * gets a URL.
 * @param {object} url url to get.
 * @param {int} num2 The second number.
 * @return {Promise} a promise that handles the request
 */
function get(url) {
  return new Promise((resolve, reject) => {
    req.get(url, (resp) => {
      const {
        statusCode,
      } = resp;
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


getPostLinkHTML('http://localhost:8080/api/posts', 1);

/**
 * Gets link from hackernews post
 * @param {string} url url to get.
 * @param {number} postId Post id.
 */
function getPostLinkHTML(url, postId) {
  getJSON(url).then((response) => {
    return response.find((post) => post.id == postId);
  }).then((post) => {
    return get(post.link);
  }).then((htmlResult) => {
    console.log(`Got link for post 1! : ${htmlResult}`);
  }, (error) => {
    console.error('Failed!', error);
  });
};


/**
 * parses Json from promise.
 * @param {string} url url to get.
 * @return {JSON} json object
 */
function getJSON(url) {
  return get(url).then(JSON.parse);
}

/**
 * checks http status code.
 * @param {number} statusCode HTTP status code.
 * @return {boolean} true if acceptable status code
 */
function validStatus(statusCode) {
  const validStatusCodes = [200, 301];
  return validStatusCodes.find((code) => code == statusCode);
}
