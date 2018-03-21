import axios from 'axios';

export const upvote = async (postId) => {
   axios.post(`/api/posts/${postId}/upvote`)
              .then(resp => resp.data);
};

export const getAll = async () => {
   const resp = await axios('/api/posts')
   return resp.data;
};

export const getPost = postId => {
  return axios.get(`/api/posts/${postId}`)
              .then(resp => resp.data);
};

export const add = async (newTitle, newLink) => {
  const resp = await axios.post('/api/posts', { title: newTitle, link: newLink });
  return resp.data;
};
