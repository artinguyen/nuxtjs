<template>
  <div>
	<!-- The Modal -->
  <div class="modal fade" id="myModal" ref="delete">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" @click="closeModal('delete')">×</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          Do you want to delete the user?
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="deleteItem">Ok</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal" @click="closeModal('delete')">Cancel</button>
        </div>
        
      </div>
    </div>
  </div>


  <div class="modal fade" id="updateModal" ref="update" :class="show">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"  @click="closeModal('update')">×</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" required v-model="user.username">
          <br/>
          <label for="psw"><b>Password</b></label>
          <input type="text" placeholder="Enter Password" name="password" required v-model="user.password">
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="updateItem">Update</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal" @click="$emit('closeModal')">Cancel</button>
        </div>
        
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  	name: 'Modal',
    props: ['user', 'show'],
    methods: {
      // closeModal(type) {
      //   //this.show = false;
      //   if(type == 'update') {
      //     //this.$refs.update.classList.remove("show-modal");
      //   } else {
      //     //this.$refs.delete.classList.remove("show-modal");
      //   }
        
      // },
      deleteItem() {
        this.closeModal('delete');
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
        this.closeModal();
        const db = this.$fire.firestore;
        var sfDocRef = db.collection("users").doc(this.$store.state.users.doc_id);

        return db.runTransaction((transaction) => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then((sfDoc) => {
              if (!sfDoc.exists) {
                  throw "Document does not exist!";
              }
              let username = this.user.username;
              let password = this.user.password;
              let payload  = { username, password}
              transaction.update(sfDocRef, payload);

          });
        }).then(() => {
            console.log("Transaction successfully committed!");
            //window.location.reload(true)
            this.getList();
            this.closeModal('update');
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
<style>
.show-modal {
  display: block;
  opacity: 1 !important;
}
</style>