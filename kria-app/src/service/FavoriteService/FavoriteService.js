import axios from 'axios';

class FavoriteService {
    static BASE_URL = "http://localhost:8080";

    static async getAllFavorites() {
        try {
            const response = await axios.get(`${FavoriteService.BASE_URL}/api/favorites`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getUserFavorites(id) {
        try {
            const response = await axios.get(`${FavoriteService.BASE_URL}/api/favorites/userId/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async addFavorite(json) {
        try {
            const response = await axios.post(`${FavoriteService.BASE_URL}/api/favorites/add`, json);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteFavoriteById(id) {
        try {
            const response = await axios.delete(`${FavoriteService.BASE_URL}/api/favorites/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default FavoriteService;
