import Vue from 'vue'
import Vuex from 'vuex'
import { boardStore } from './modules/board.store'
import { userStore } from './modules/user.store'
Vue.use(Vuex)

export default new Vuex.Store({
   strict: true,
   state: {
      userMsg: {
         txt: '',
         type: ''
      },
      timeoutId: null,
   },
   getters: {
      userMsg({ userMsg }) { return userMsg },
   },
   mutations: {
      setMsg(state, { msg }) {
         state.userMsg = msg;
      },
      setTimeoutId(state, { currTimeoutId }) {
         state.timeoutId = currTimeoutId
      }
   },
   actions: {
      async showMsg({ state, commit }, { msg }) {
         try {
            if (state.timeoutId) clearTimeout(state.timeoutId);
            commit({ type: 'setMsg', msg });
            msg = { txt: '', type: '' }
            const currTimeoutId = setTimeout(() => {
               commit({ type: 'setMsg', msg });
            }, 2500)
            commit({ type: 'setTimeoutId', currTimeoutId });
         } catch (err) {
            console.log('ERROR: cannot get userMsg', err);
         }
      }
   },
   modules: {
      boardStore,
      userStore,
   }
})
