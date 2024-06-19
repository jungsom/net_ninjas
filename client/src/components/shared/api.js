import axios from 'axios';

const baseAxios = axios.create({
  // baseURL: 'http://kdt-ai-10-team05.elicecoding.com:3000'
  baseURL: 'http://localhost:3000'
});

export default baseAxios;
