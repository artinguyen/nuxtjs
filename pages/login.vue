<template>
   <div class="container">
   <Nuxt />
   <h1>Login page</h1>

    <form>
	  <div class="form-group">
	    <label for="email">Email address:</label>
	    <input type="email" class="form-control" placeholder="Enter email" id="email" v-model="email">
	  </div>
	  <div class="form-group">
	    <label for="pwd">Password:</label>
	    <input type="password" class="form-control" placeholder="Enter password" id="pwd" v-model="password">
	  </div>
	  <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
	</form>


  	</div>


</template>
<script>
export default {
  name: 'LoginPage',
  data: function() {
  return {
    email: '',
    password: ''
  };
},
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
  	}
  },
  
}
</script>
</script>
