export default {
    state: {
        users: []
    },
    actions: {
        async fetchUsers({ commit, dispatch }, reqbody) {
            try {
                const req = await dispatch('fetchBasic', reqbody)
                if (req) {
                    commit('serUsers', req)
                    return true
                } else {
                    const error = new Error('Не удалось получить пользователей')
                    throw error
                }
            } catch (error) {
                return false
            }
        },
        async addUser({ commit, dispatch }, reqbody) {
            try {
                const req = await dispatch('fetchBasic', reqbody)
                if (req) {
                    commit('addUsers', req)
                    return true
                } else {
                    const error = new Error('Не удалось добавить пользователей')
                    throw error
                }
            } catch (error) {
                return false
            }
        }
    },
    mutations: {
        serUsers(s, data) {
            s.users = data
        },
        addUsers(s, data) {
            s.users.push(data)
        }
    },
    getters: {
        getUsers: s => s.users
    }
}