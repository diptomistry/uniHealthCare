import ApiService from '../ApiService';
class AuthService {
    login(credentials,config) {
        return ApiService.post('auth/login', credentials,config);
    }

    logout() {
        return ApiService.post('auth/logout');
    }

    signup(data) {
        return ApiService.post('auth/signup', data);
    }

    
}

const authService = new AuthService();
export default authService;
