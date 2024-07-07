import axios from 'axios';

const requester = axios.create({
  baseURL: '/api',
});

export default requester;
