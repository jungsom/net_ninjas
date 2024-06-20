import axios from 'axios';

const baseAxios = axios.create({
  baseURL: 'http://kdt-ai-10-team05.elicecoding.com/api'
  // baseURL: 'localhost:3000'
});

export default baseAxios;
