import {GITHUB} from './index';
//Use axios instance and use it for ASYNC call.
export const getAllUsers = async () => {
    const response = await GITHUB.get(
        `users?since=1&per_page=100`
    );
    return response;
};