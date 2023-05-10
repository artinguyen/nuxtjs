<template>
  <div class="container">
  <a href="#" @click="logout">Logout</a>
      <Table :list="list" />
      <Paging :count="count"/>
  </div>
</template>
<style>
a {
  float: right;
}
</style>
<script>
export default {
  name: 'IndexPage',
  data: function() {
    return {
      user_id: '',
      paging: 2,
      count: 0,
      email: '',
      password: ''
    };
  },
  computed: {
   list () {
     return this.$store.state.users.list
    }
  },
  mounted() {
  	this.getList();
  	this.getAll();
  },
  methods: {
  	// signIn() {
  	// 	this.$fire.auth
   //    .signInWithEmailAndPassword(this.email, this.password)
   //    .then((userCredential) => {
   //      const authUser = {
   //        uid: userCredential.user.uid,
   //        email: userCredential.user.email,
   //      };
   //      this.$store
   //        .dispatch("users/onAuthStateChangedAction", {
   //          authUser,
   //        })
   //        .then(() => {
   //          this.$router.replace("/");
   //        })
   //        .catch((error) => {
   //          console.log("User State error", error);
   //        });
   //    })
   //    .catch((error) => {
   //      console.log("Login error", error);
   //      this.snackbar = true;
   //      this.errorMessage = error.message;
   //    });
  	// },
  	async logout() {
      await this.$fire.auth.signOut();
      this.$router.replace("/login");
    },
  	getAll() {
  		const db = this.$fire.firestore;
	  	db.collection("users").orderBy('username')
	    .get()
	    .then((querySnapshot) => {
	    	this.count = Math.round(querySnapshot.docs.length / this.paging)
	    })
	    .catch((error) => {
	        console.log("Error getting documents: ", error);
	    });
  	},
  	getList() {
    	this.$store.commit('users/SET_LIST_DEFAULT');
    	const db = this.$fire.firestore;
    	db.collection("users").orderBy('username').limit(2)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let payload = {
            	'id' : doc.id,
            	'info' : doc.data()
            }
            this.$store.commit('users/add', payload);
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
  	},
  },
  
}
</script>
