import axios from 'axios';
import auth from './auth';
export const upvote = async (postId) => {
   axios.post(`/api/posts/${postId}/upvote`)
              .then(resp => resp.data);
};

export const getAll = async () => {
   const resp = await axios.get('/api/posts',{headers: {'Authorization': auth.getToken()}},)
   return resp.data;
};

export const getPost = async (postId) => {
  const resp = await axios.get(`/api/posts/${postId}`,{headers: {'Authorization': auth.getToken()}})
  return resp.data;
};

export const add = async (newTitle, newLink) => {
  const resp = await axios.post('/api/posts',{title: newTitle, link: newLink }, {headers: {'Authorization': auth.getToken()}});
  return resp.data;
};

export const login = async (username, password) => {
  const resp = await axios.post('/api/users', { username: username, password: password });
  return resp.data;
};

export const signup = async (username, password) => {
  const resp = await axios.post('/api/users?action=register', { username: username, password: password });
  return resp.data;
};
