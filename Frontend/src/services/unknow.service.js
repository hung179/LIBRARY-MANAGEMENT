import createApiClient from "./api.service.js";

class unknowService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async getUser(user) {
        return (await this.api.post("/login", user)).data;
    }
    async createUser(user) {
        return (await this.api.post("/register", user)).data;
    }
}

export default new unknowService();