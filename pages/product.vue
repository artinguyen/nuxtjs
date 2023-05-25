<template>
   <div class="container">
   <Nuxt />
   <h1>Login page</h1>

    <form>
	  <input id="input-5" type="file"  @change="uploadFile" ref="file">
    <input type="text" class="form-control" placeholder="Enter password" id="pwd" v-model="name">
    <input type="text" class="form-control" placeholder="Enter password" id="pwd" v-model="price">
    <input type="text" class="form-control" placeholder="Enter password" id="pwd" v-model="detail">
    <button @click.prevent="submitFile">Upload!</button>
    <button @click.prevent="add">Add</button>
	</form>




<li v-for="item in items">
  {{ item.name }} <img :src="'data:image/jpeg;base64,'+item.image">
</li>
  	</div>


</template>
<script>
export default {
  name: 'LoginPage',
  data: function() {
  	return {
    		name: '',
    		price: '',
        base64: '',
        image: null,
        items: [],
        detail: ''
  		};
	},
  	mounted() {
    		this.$nextTick(() => {
      		this.$nuxt.$loading.start()
      		setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    	})

        const db = this.$fire.firestore;
      db.collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.items.push(doc.data())
          console.log(doc.data())
            // let payload = {
            //   'id' : doc.id,
            //   'info' : doc.data()
            // }
            //this.$store.commit('users/add', payload);
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  	}
	,
  	methods: {
  	login() {
  		this.$fire.auth
      	.signInWithEmailAndPassword(this.email, this.password)
      	.then((userCredential) => {
        const authUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        };
        this.$store
	        .dispatch("users/onAuthStateChangedAction", {
	            authUser,
	        })
	        .then(() => {
	            this.$router.replace("/");
	        })
	        .catch((error) => {
	            console.log("User State error", error);
	        });
      	})
	    .catch((error) => {
	        console.log("Login error", error);
	        this.snackbar = true;
	        this.errorMessage = error.message;
	    });
  	},
    uploadFile: function() {
      this.image = this.$refs.file.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.base64 = event.target.result;
      }
      reader.readAsDataURL(this.image);
      console.log(this.base64)
    },
    submitFile: function() {
     //const db = this.$fire.storage;
     //const ref = db.ref();

     const ref = this.$fire.storage.ref().child('some-child');

  // [START storage_upload_string]
  // Raw string is the default if no format is provided
  // var message = 'This is my message.';
  // ref.putString(message).then((snapshot) => {
  //   console.log('Uploaded a raw string!');
  // });

      ref.putString(this.base64, 'data_url').then((snapshot) => {
  console.log('Uploaded a base64 string!');
});
      console.log(this.base64)
    },
    add: function() {
      var base64 = '';
      if(this.base64 != '') {
        base64 = this.base64.split(',')[1];
      }
      
      // console.log(base64)
      // return false;
      const db = this.$fire.firestore;
      db.collection("products").add({
    name: this.name,
    price: this.price,
    detail: this.detail,
    image: base64
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
    }
  },
  
}
</script>
