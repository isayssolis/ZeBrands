import axios from 'axios';
// Create axios instance
export const GITHUB = axios.create({
    baseURL: 'https://api.github.com/',
});

export * from './users';
export * from './repos';
