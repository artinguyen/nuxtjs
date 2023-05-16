<template>
	<ul class="pagination">
  		<li class="page-item" v-for="index in count" :key="index"><a class="page-link" href="#" @click="showPage(index - 1)">{{ index }}</a></li>
	</ul>
</template>

<script>
export default {
  	name: 'Paging',
   	props: ['count'],
   	data: function() {
    return {
	      paging: 2,
	    };
  	},
   	methods: {
	    showPage(index) {
  		const db = this.$fire.firestore;
      this.$store.commit('users/setListDefault');
	    var first = db.collection("users")
        .orderBy("username").get().then((documentSnapshots) => {
      // Get the last visible document
      if(index == 0) {
        db.collection("users")
          .orderBy("username")
            .limit(2).get().then((querySnapshot) => {
    	    	  //this.count = Math.round(querySnapshot.docs.length / this.paging)
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

      	index = 0;
      } else {
	  	   index = (index * this.paging ) - 1;
	  	   var lastVisible =  documentSnapshots.docs[ index ];

	        db.collection("users")
	          .orderBy("username")
	          .startAfter(lastVisible)
	          .limit(2).get().then((querySnapshot) => {
		        querySnapshot.forEach((doc) => {
		            // doc.data() is never undefined for query doc snapshots
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
	    }
	    });
  		},	
  	} // Methods
}
</script>
