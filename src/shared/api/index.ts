import { useUserModel } from '@/entities/User/model';
import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    withCredentials: true,
    withXSRFToken: true,
});

http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    error.response.data.message = error.response.data.message
        // .replace(/ \(and \d+ more error\)/, "")
        .replace(
            'Такое значение поля email уже существует.',
            "Email занят"
        )

    if (error.status == 401) {
        const user_model = useUserModel()
        user_model.is_login = false;
        window.router.push({name: 'login'})
    }

    return Promise.reject(error);
});