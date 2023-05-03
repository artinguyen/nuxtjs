<template>
  <div>
	<!-- The Modal -->
  <div class="modal fade" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">×</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          Do you want to delete the user?
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="deleteItem">Ok</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
        </div>
        
      </div>
    </div>
  </div>

  <div class="modal fade" id="updateModal">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">×</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" required>
          <br/>
          <label for="psw"><b>Password</b></label>
          <input type="text" placeholder="Enter Password" name="password" required>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="updateItem">Update</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
        </div>
        
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  	name: 'Modal',
    methods: {
      deleteItem() {
        $("#myModal").modal('hide');
        const db = this.$fire.firestore;
        db.collection("users").doc(this.$store.state.users.doc_id).delete().then(() => {
          this.getList();
          this.getAll();
          console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
    },
    updateItem() {
      $("#updateModal").modal('hide');
      const db = this.$fire.firestore;
      var sfDocRef = db.collection("users").doc(this.$store.state.users.doc_id);

      return db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(sfDocRef).then((sfDoc) => {
            if (!sfDoc.exists) {
                throw "Document does not exist!";
            }
            let username = $("input[name='username']").val();
            let password = $("input[name='password']").val();
            let payload  = { username, password}
            transaction.update(sfDocRef, payload);

        });
      }).then(() => {
          console.log("Transaction successfully committed!");
          window.location.reload(true)
      }).catch((error) => {
          console.log("Transaction failed: ", error);
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
  }
}
</script>
