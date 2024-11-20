import createApiClient from "./api.service.js";

class BookService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }

    async getAllBook(){
        return (await this.api.get("/")).data;
    }
    async getBook(id) {
        return (await this.api.get(`/admin/book/${id}`)).data;
    }
    async createBook(book) {
        return (await this.api.post("/admin", book)).data;
    }
    async deleteBook(id) {
        return (await this.api.delete(`/admin/book/${id}`)).data;
    }async updateBooks( id, book) {
        return (await this.api.put(`/admin/book/${id}`, book)).data;
    }
}

export default new BookService();