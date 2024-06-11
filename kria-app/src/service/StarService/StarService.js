import axios from 'axios';

class StarService {
    static BASE_URL = "http://localhost:8080";

    static async getAllStars() {
        try {
            const response = await axios.get(`${StarService.BASE_URL}/api/stars`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getStarsbybookId(id) {
        try {
            const response = await axios.get(`${StarService.BASE_URL}/api/stars/book/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getStarsbyUserId(id) {
        try {
            const response = await axios.get(`${StarService.BASE_URL}/api/stars/user/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            if (err.response && err.response.status === 404) {
                // If the error is due to user not found, return an empty array
                console.log('No star ratings found for the user with ID:', id);
                return [];
            } else {
                // If it's another type of error, rethrow the error
                throw err;
            }
        }
    }

    static async addStars(json) {
        try {
            const response = await axios.post(`${StarService.BASE_URL}/api/stars/add`, json);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async editStars(id,json) {
        try {
            const response = await axios.put(`${StarService.BASE_URL}/api/stars/${id}`, json);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteStars(id) {
        try {
            const response = await axios.delete(`${StarService.BASE_URL}/api/stars/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default StarService;
