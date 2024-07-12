import ApiService from '../ApiService';

class UserService {
    getProfile() {
        return ApiService.get('user/profile');
    }

    updateProfile(data) {
        return ApiService.put('user/profile', data);
    }

    // Add other user-related methods if needed
}

const userService = new UserService();
export default userService;
