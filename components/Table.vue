<template>
	<div>
		<table class="table table-striped">
			<thead>
			<tr>
			<th>Username</th>
			<th>Password</th>
			<th colspan="2">Action</th>
			</tr>
			</thead>
			<tbody>
			<tr  v-for="(user,key) in list" :key="key">
			<td>{{ user.info.username }}</td>
			<td>{{ user.info.password }}</td>
			<td><button @click="update(user.id, user.info.username, user.info.password)" class="btn btn-primary">Update </button></td>
			<td><button @click="confirm(user.id)" class="btn btn-danger">Delete </button></td>
			</tr>
			</tbody>
  	  	</table>
  	  	<ModalUpdate ref="child" :user="user"/>

 	</div>
</template>

<script>
export default {
  	name: 'Table',
   	props: ['list'],
   	data: function() {
  		return {
		    user_id: '',
		    user: {
		    	username: '',
		    	password: ''
		    }
		};
 	},
  	methods: {
	    confirm(id) {
	  		this.$refs.child.$refs.delete.className += ' show-modal';
	  		this.$store.commit('users/setDocId', id);
	  	},
	  	update(id, username, password) {
	  		this.$refs.child.$refs.update.className += ' show-modal';
	  		this.user.username = username;
	  		this.user.password = password;
	  		this.$store.commit('users/setDocId', id);
	  		//this.$store.commit('users/setPayload', {username, password});
	  	},	
  	}
}
</script>