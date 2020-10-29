import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Search from './components/Search.vue'
import Login from './components/Login.vue'
import Secure from './components/Secure.vue'
import Register from "./components/Register.vue"
import Neofeed from "./components/Neofeed.vue"
import firebase from "firebase"

Vue.use(VueRouter);
Vue.config.productionTip = false

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: Home,
  },
  { 
    path: '/home', 
    name: 'hom1',
    component: Home,
  },
  { 
    path: '/about', 
    name: 'about',
    component: About,
  },
  { 
    path: '/search', 
    name: 'search',
    component: Search,
  },
  { 
    path: '/neofeed', 
    name: 'neofeed',
    component: Neofeed,
  },
  { 
    path: '/login', 
    name: 'login',
    component: Login,
  },
  { 
    path: '/register', 
    name: 'register',
    component: Register,
  },
  { 
    path: '/secure', 
    name: 'secure',
    component: Secure,
    meta: {requireAuth:true},//secure access
  }
];


var firebaseConfig = {
  apiKey: "AIzaSyBRcpav6rPn9DeN-0k6BWE4XRiG8fmIfIs",
  authDomain: "vuelogin-5567d.firebaseapp.com",
  databaseURL: "https://vuelogin-5567d.firebaseio.com",
  projectId: "vuelogin-5567d",
  storageBucket: "vuelogin-5567d.appspot.com",
  messagingSenderId: "571095736385",
  appId: "1:571095736385:web:3d859894ab6b13b72ae6c0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const router = new VueRouter(
  {
    routes
  }
)

// secure access 
router.beforeEach((to, from, next)=> {
  const requireAuth = to.matched.some(record => record.meta.requireAuth);
  const isAuth1 = firebase.auth().currentUser
  
  if(requireAuth && !isAuth1){
    next("/login")
  }
  else{
    next()
  }
} )


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
