import req from 'http';
/**
 * gets a URL.
 * @param {object} url url to get.
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

 /**
  * parses Json from promise.
  * @param {string} url url to get.
  * @return {JSON} json object
  */
 async function getJSON(url) {
   return JSON.parse(await get(url));
 }

/**
 * Gets link from hackernews post
 * @param {string} url url to get.
 * @param {number} postId Post id.
 */
async function getPostLinkHTML(url, postId) {
  const posts = await getJSON(url);
  const post = posts.find((post) => post.id == postId);
  const htmlResult = await get(post.link);
  console.log(`Got link for post 1! : ${htmlResult}`);
}

getPostLinkHTML('http://localhost:8080/api/posts', 1);

/**
 * checks http status code.
 * @param {number} statusCode HTTP status code.
 * @return {boolean} true if acceptable status code
 */
function validStatus(statusCode) {
  const validStatusCodes = [200, 301];
  return validStatusCodes.find((code) => code == statusCode);
}
