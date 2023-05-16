<template>
  <div>
    <h1> This is header</h1>
    	<ul>
	    	<li><NuxtLink to="drop">Drop page</NuxtLink></li>
	    	<li><NuxtLink to="add">Add page</NuxtLink></li>
	    	<li><a href="#" @click="logout">Logout</a></li>
	    </ul>
  </div>
</template>
<script>
  export default {
    methods: {
        async logout() {
      	await this.$fire.auth.signOut();
      	this.$router.replace("/login");
    	},
    },
  }
</script>
<style>
li {
	padding: 4px;
	margin: 4px;
	float: right;
}
</style>