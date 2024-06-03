import axios from 'axios';

class CategorieeService {
    static BASE_URL = "http://localhost:8080";
    
    static async getAllCategories() {
        try {
            const response = await axios.get(`${CategorieeService.BASE_URL}/api/categories`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getCategoryById(id) {
        try {
            const response = await axios.get(`${CategorieeService.BASE_URL}/api/categories/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async addACategory(json) {
        try {
            const response = await axios.post(`${CategorieeService.BASE_URL}/api/categories/add`,json);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async editACategory(id,json) {
        try {
            const response = await axios.put(`${CategorieeService.BASE_URL}/api/categories/${id}`,json);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }


    static async deleteACategory(id) {
        try {
            const response = await axios.delete(`${CategorieeService.BASE_URL}/api/categories/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default CategorieeService;
