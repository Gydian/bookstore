import Vue from 'vue';
import Vuex from 'vuex';
import vuexAlong from 'vuex-along'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token.token);
        },
        delToken(state) {
            state.token = '';
            localStorage.removeItem('token');
        }
    },
    plugins: [vuexAlong]
})

export default store;