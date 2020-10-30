<template>
  <div id="app">

    <div class="ui secondary pointing menu">

      <router-link class="item" to="/">Home</router-link>
      <router-link class="item" to="/search">Search</router-link>
      <router-link class="item" to="/neofeed">Neo-Feed</router-link>
      <router-link class="item" to="/secure" v-if="user">Favorite</router-link>
      <router-link class="item" to="/register">Register</router-link>
      <!-- router-link only for link -->
      
        <div class="right menu">
          <span class="item" style="cursor: pointer;" @click="doLogout" v-if="user" >Logout</span>
          <router-link class="item" to="/login" v-else>Login</router-link>
        </div>
    </div>

    <div class="ui segment">
      <router-view></router-view>
      <!-- router-view will replace content -->

    </div>
  </div><!--root end -->
</template>

<script>
import firebase from "firebase"

export default {
  name: 'App',
  components: {

  },
  data(){
    return{
      ISLOGGEDIN:Boolean
    }
  },
  computed:{
    user(){
      return this.$store.getters.isUserAuth
    }
  },
  methods:{
    async doLogout(){
      // if(this.loggedIn==false) return
      try{
        const res = await firebase.auth().signOut();
        this.$store.commit('setUserAuth1', false)
        // this.$router.replace({name:'login'})
        this.$router.push('/login')
        console.log(res)
      }
      catch(e){
        console.log("logout error: "+e)
      }
    },
  }
}
</script>

<style>



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
} 

.ui.card{
    width: 100%;
}

</style>
