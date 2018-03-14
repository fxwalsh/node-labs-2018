import req from 'http';
/**
 * gets a URL.
 * @param {string} url url to get.
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

  get('http://google.ie').then((response) => {
    console.log('Success!', response);
  }, (error) => {
    console.error('Failed!', error);
  });

  /**
   * checks http status code.
   * @param {number} statusCode HTTP status code.
   * @return {boolean} true if acceptable status code
   */
  function validStatus(statusCode) {
    const validStatusCodes=[200, 301];
    return validStatusCodes.find((code) => code == statusCode);
  }
