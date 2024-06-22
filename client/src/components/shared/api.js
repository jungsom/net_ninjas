import axios from 'axios';

const baseAxios = axios.create({
  baseURL: 'http://kdt-ai-10-team05.elicecoding.com/api'
  // baseURL: 'http://localhost:8080/api'
});

export default baseAxios;
