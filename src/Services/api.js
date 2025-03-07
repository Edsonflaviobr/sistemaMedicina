import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backsistemafisiounivesp.vercel.app/'
});

export { api }