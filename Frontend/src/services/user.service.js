import createApiClient from "./api.service.js";

class UserService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async getHistory(id) {
        return (await this.api.get(`user/history/${id}`)).data;
    }
    async borrow(borrow) {
        return (await this.api.post("user/borrowBook", borrow)).data;
    }
    async returnBook(Information) {
        return (await this.api.put('user/returnBook', Information)).data;
    }
    async extendLoan(loan) {
        return (await this.api.put('user/extendLoan', loan)).data;
    }

}

export default new UserService();