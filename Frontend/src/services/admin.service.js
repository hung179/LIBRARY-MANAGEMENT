import createApiClient from "./api.service.js";

class adminService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAllBook(){
        return (await this.api.get("/")).data;
    }
    async getBook() {
        return (await this.api.get(`/${id}`)).data;
    }
    async createBook() {
        return (await this.api.post("/")).data;
    }
    async deleteBook() {
        return (await this.api.delete(`/${id}`)).data;
    }async updateBooks() {
        return (await this.api.put(`/${id}`)).data;
    }
}

export default new adminService();