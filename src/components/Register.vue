<template>
    <div>
        <h2>Register </h2><br>
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
        <button class="ui button" @click="doRegister"> Register </button>
    </div>
        
    </div>
</template>

<script>

import firebase from "firebase";
export default {
    name: "Register",
    data(){
        return{
            email:"",
            password:"",
            msg_show:false,
            msg:""
        }
    },
    methods:{
        async doRegister() {
            this.msg_show = true
            try{
                const fb = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                this.msg = "Account created successfully!"
                console.log(fb.data)
                // this.$router.replace({name:"login"});
            }
            catch(err){          
                this.msg=err      
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