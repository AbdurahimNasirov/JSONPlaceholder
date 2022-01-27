import api from '@/service/api'

export default {
    state: {
        posts: []
    },
    actions: {
        async fetchPosts({ commit, dispatch }, reqbody) {
            try {
                // const url = 'posts'
                // const {data} = await api.get(url)
                // console.log(data);
                const req = await dispatch('fetchBasic', reqbody)
                if (req) {
                    commit('setPosts', req)
                    return true
                } else {
                    const error = new Error('Не удалось получить посты')
                    throw error
                }
            } catch (error) {
                return false
            }
        },
        async updataPost({ commit, dispatch }, reqbody) {
            try {
                const req = await dispatch('fetchBasic', reqbody)
                if (req) {
                    commit('updatePosts', req)
                    return true
                } else {
                    const error = new Error('Не удалось oбновить пост')
                    throw error
                }
            } catch (error) {
                return false
            }
        },
        async addPost({ commit, dispatch }, reqbody) {
            try {
                const req = await dispatch('fetchBasic', reqbody)
                if (req) {
                    commit('addPosts', req)
                    return true
                } else {
                    const error = new Error('Не удалось добавить пользователей')
                    throw error
                }
            } catch (error) {
                return false
            }
        },
        async deletePost({ commit, dispatch }, reqbody) {
            // TODO:
            // переделай fetchBasic на api axios
            const req = await dispatch('fetchBasic', reqbody)
            if (req) {
                commit('deletePost', req)
                return true
            }else {
                const error = new Error('Не удалось удалить пост')
                throw error
            }
        }
    },
    mutations: {
        setPosts(s, data) {
            s.posts = data
        },
        updatePosts(s, req) {
            s.posts.forEach(post => {
                if (post.id === req.id) {
                    post = req
                }
            })
        },
        addPosts(s, req) {
            s.posts.push(req)
        },
        deletePost(s, req) {
            s.posts = s.posts.filter(post => post != req)
        }
    },
    getters: {
        getPosts: s => s.posts
    }
}