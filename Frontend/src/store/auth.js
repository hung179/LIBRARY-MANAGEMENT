import unknowService from "../services/unknow.service";

export default {
    namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
    role: null,
  },
  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    userRole: (state) => state.role,
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        // Gọi API để đăng nhập
        const response = await unknowService.getUser({ username, password });
        // Nếu thành công, lưu thông tin người dùng và trạng thái
        const userData = response.user
        console.log(userData)
        commit('setUser', response.user);
        commit('setAuthentication', true);
        commit('setRole', response.user.role);
        // commit('setAvatar', response.user.avatar);
        localStorage.setItem('user', JSON.stringify(userData))
        return { success: true };
      } catch (error) {
        // Xử lý lỗi khi đăng nhập
        console.error('Login failed:', error);
        return { success: false, message: error.message || 'Đăng nhập không thành công' };
      }
    },
    async logout({ commit }) {
      commit('setUser', null);
      commit('setAuthentication', false);
      commit('setRole', null);
      localStorage.removeItem('user');
    },
    initializeAuth({ commit }) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          commit('setUser', user);
          commit('setAuthentication', true);
          commit('setRole', user.role);
        }
      }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setRole(state, role) {
      state.role = role;
    },
  },
};
