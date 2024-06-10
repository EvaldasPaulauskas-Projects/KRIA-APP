import axios from 'axios';

class CommentService {
    static BASE_URL = "http://localhost:8080";

    static async getAllComments() {
        try {
            const response = await axios.get(`${CommentService.BASE_URL}/api/comments`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async addComment(json) {
        try {
            const response = await axios.post(`${CommentService.BASE_URL}/api/comments/add`, json);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async likeComment(id) {
        try {
            const response = await axios.post(`${CommentService.BASE_URL}/api/comments/like/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async unLikeComment(id) {
        try {
            const response = await axios.post(`${CommentService.BASE_URL}/api/comments/unlike/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async dislikeComment(id) {
        try {
            const response = await axios.post(`${CommentService.BASE_URL}/api/comments/dislike/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async undislikeComment(id) {
        try {
            const response = await axios.post(`${CommentService.BASE_URL}/api/comments/undislike/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async editComment(id, json) {
        try {
            const response = await axios.put(`${CommentService.BASE_URL}/api/comments/edit/${id}`, json);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteComment(id) {
        try {
            const response = await axios.delete(`${CommentService.BASE_URL}/api/comments/${id}`);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default CommentService;
