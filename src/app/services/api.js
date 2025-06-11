import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Altere se seu backend tiver outro endereço
});

export default api;
