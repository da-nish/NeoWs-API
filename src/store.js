import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
      isUserAuth1:true,
  },
  mutations:{
    setUserAuth1(state, status){
      state.isUserAuth1 = status;
    },
    
  },
  actions:{

    checkUser(mutate){
        firebase.auth().onAuthStateChanged(function (user) {       
         if (user){
           mutate.commit('setUserAuth1', true)
           console.log('logged In '+user)
         }
         else{
           mutate.commit('setUserAuth1', false)
           console.log('logout '+user)
         }
       });
   },

  },
  getters:{
    isUserAuth(state){
      return state.isUserAuth1
    }
  }

});