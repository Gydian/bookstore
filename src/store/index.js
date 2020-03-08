import Vue from 'vue';
import Vuex from 'vuex';
import vuexAlong from 'vuex-along'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
        position: localStorage.getItem('position') ? localStorage.getItem('position') : '',
    },
    mutations: {
        setToken(state, token, name, position) {
            state.token = token;
            state.name = name;
            state.position = position;
            localStorage.setItem('token', token.token);
            localStorage.setItem('name', token.name);
            localStorage.setItem('position', token.position);
        },
        delToken(state) {
            state.token = '';
            state.name = '';
            state.position = '';
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('position');
        }
    },
    plugins: [vuexAlong]
})

export default store;