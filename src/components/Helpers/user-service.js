import { authHeader } from '../Helpers/auth-header';
import {API_BASE_URL} from '../../constants/apiConstants';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${API_BASE_URL}/users`, requestOptions)
}