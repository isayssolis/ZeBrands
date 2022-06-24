import {GITHUB} from './index';
//Use axios instance and apply for ASYNC call.
export const getAllRepos = async (user) => {
    const response = await GITHUB.get(
        `/users/${user}/repos`
    );
    return response;
};