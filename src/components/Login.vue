<template>
    <div>
        <h2>Login </h2><br>

    <div class="ui small message hide" :class="{'show':msg_show===true}" >
        {{msg}}
    </div>
    <div class="ui equal width form">
        <div class="fields">
            <div class="field">
                <label>Email</label>
                <input name="Email" type="email" v-model="email" placeholder="Email">
            </div>
            <div class="field">
                <label>Password</label>
                <input name="Password" type="password" v-model="password" autocomplete="off" >
            </div>
        </div>
        <button class="ui button"  @click="doLogin"> Login </button>
    </div>

    </div>
</template>

<script>

import firebase from "firebase";
export default {
    name: "Login",
    data(){
        return{
            email:"",
            password:"",
            msg:"",
            msg_show:false
        }
    },
    methods:{
        async doLogin() {
            this.msg_show = true
            try{
                const fb = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                this.$router.replace({name:"home"}); //it will redirect to secure page
                console.log(fb.data)
                this.msg = 'success login!'  
            } 
            catch(err){
                this.msg=err
                console.log(err)
            }
        }
    }
}
</script>
<style scoped>
.hide{
    display: none;
}

.show{
    display: block;
}
</style>