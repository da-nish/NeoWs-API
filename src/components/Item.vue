<template>
    <div>
        <div class="ui card" >
            <div class="content">

                <div class="header">{{item_i.name}}</div>
                <div class="description">
                    <p>
                        ID: {{item_i.id}} <br>
                        Dangerous: {{item_i.nasa_jpl_url}} 
                        Info: <a v-bind:href="item_i.nasa_jpl_url" target="_blank">Link</a>
                    </p>
                </div>
            </div>
            <div class="extra content">
                
                <span class="right floated star">
                   
                    <i class="star icon" :class="{'active':isFav===true}" @click="favToggle"></i>
                     Favorite 
                    <p class="ui left pointing red basic label hide" :class="{'show_login_msg':show_login_msg===true}">
                        Please login
                    </p>
                    
                    
                </span>
            </div>
        </div><br>

    </div>

</template>

<script>
import firebase from "firebase";
import axios from "axios";

export default {
        name: 'Item',
        props:{item_i:Object},
        data(){
            return{
                isFav:false,
                show_login_msg:false,
                item_id:String,
                isLogged:false
            }
        },
        created(){
            this.item_id = this.item_i.id
            this.isLogged = firebase.auth().currentUser
            this.checkFav()
        },
        methods:{
            favToggle(){
                if(!this.isLogged){
                    this.show_login_msg=true
                    return
                }
                if(this.isFav==true){
                    this.delete1()
                }
                else{
                    this.update()
                }
            },

            delete1(){
                try{
                  const fb_uid = firebase.auth().currentUser.uid
                  const res = firebase.database().ref('user/'+fb_uid+'/fav/'+this.item_id).remove()
                  this.isFav=false;
                  console.log(res)
                }
                catch(e){
                  console.log('error fav'+e)
                }
            },
            update(){
                if(!this.isLogged) return
                try{
                  const fb_uid = firebase.auth().currentUser.uid
                  const res = firebase.database().ref('user/'+fb_uid+'/fav/'+this.item_id).update( { id: this.item_id} )
                  this.isFav=true
                  console.log(res)
                }
                catch(e){
                  console.log('error fav'+e)
                }
            },
            
            async checkFav(){
                if(!this.isLogged) return
                try{
                    const fb_uid = firebase.auth().currentUser.uid
                    const res = await axios.get('https://vuelogin-5567d.firebaseio.com/user/'+fb_uid+'/fav/'+this.item_id+'.json')
                    // console.log(res.data)
                    if(res.data!=null && res.data.id == this.item_id){
                        this.isFav = true
                        // console.log('yes')
                    }else{
                        // console.log('no')
                    }
                }
                catch(e){
                    console.log('error'+e)
                }
            },
            
        }
}


</script>

<style scoped>

.hide{
    display: none;
}

.show_login_msg{
    display: inline;
}

</style>