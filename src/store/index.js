import Vue from 'vue';
import Vuex from 'vuex';
import vuexAlong from 'vuex-along'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
    },
    mutations: {
        setToken(state, token, name) {
            state.token = token;
            state.name = name;
            localStorage.setItem('token', token.token);
            localStorage.setItem('name', token.name);
        },
        delToken(state) {
            state.token = '';
            state.name = '';
            localStorage.removeItem('token');
            localStorage.removeItem('name');
        }
    },
    plugins: [vuexAlong]
})

export default store;