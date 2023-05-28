<template>
<div class="row justify-content-center">
<div class="row justify-content-center">
  <div class="col-md-6 justify-content-center">
            <div class="_product-detail-content">
               <p class="_p-name"> {{ detail.name }} </p>
               <img class="pic-1" :src="'data:image/jpeg;base64,'+detail.image">
               <div class="_p-price-box">
                  <div class="p-list">
                     
                     <span class="price">Price: {{ detail.price }}$ </span>
                  </div>
                  <div class="_p-add-cart">
                     <div class="_p-qty">
                        <span>Add Quantity</span>
                        <div class="value-button decrease_" id="" value="Decrease Value">-</div>
                        <input type="number" name="qty" id="number" value="1" />
                        <div class="value-button increase_" id="" value="Increase Value">+</div>
                     </div>
                  </div>
                  <div class="_p-features">
                     <span> Description About this product: </span>
                     {{ detail.description }}                     
                  </div>
                  <form action="" method="post" accept-charset="utf-8">
                     <ul class="spe_ul"></ul>
                     <div class="_p-qty-and-cart">
                        <div class="_p-add-cart">
                           <button class="btn-theme btn buy-btn" tabindex="0">
                           <i class="fa fa-shopping-cart"></i> Buy Now
                           </button>
                           <button class="btn-theme btn btn-success" @click.prevent="addCart()">
                           <i class="fa fa-shopping-cart"></i> Add to Cart
                           </button>    
                        </div>
                     </div>
                  </form>
               </div>
               </div>
               </div>
               </div>
               </div>
</template>
<script>
export default {
  name: 'IndexPage',
  data: function() {
    return {
      user_id: '',
      paging: 2,
      count: 0,
      email: '',
      password: '',
      amount: 0,
      listId: [],
      detail: {},
      detialId: ''
    };
  },
  computed: {
  /*
   detail () {
     return this.$store.state.products.product
    },
    */
    cart () {
     return this.$store.state.products.cart
    }
  },
  mounted() {
    //this.getList();
    //console.log(this.$route.params.id)
    const db = this.$fire.firestore;
    var docRef = db.collection("products").doc(this.$route.params.id);
let self = this;
docRef.get().then((doc) => {
    if (doc.exists) {

            self.detailId =  doc.id;
            self.detail = doc.data();
            //console.log(self.detail)
    //this.$store.commit('products/setProduct', payload);
        //console.log("Document data:", doc.data());
        //console.log(this.detail1);
    } else {
        // doc.data() will be undefined in this case
        //console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});


  },
  created() {
    console.log(this.detail1);
  },
  methods: {
    addCart() {
    //console.log(this.detail); return false;
      //alert('abc')
      var check = false;
      //var list = this.$store.state.products.product;
      //console.log(this.cart)
      
      for (var i = 0; i < this.cart.length; i++) {
        if(this.cart[i].id == this.detailId) {
          check = true;
          break;
        }
      }
      if(!check) {
        let payload = {
              'id' : this.detailId,
              'info' : this.detail,
            }
        this.$store.commit('products/setCart', payload);
      }
      
      
    },
  	getList() {
      //this.$store.commit('users/setListDefault');
      const db = this.$fire.firestore;
      db.collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let payload = {
              'id' : doc.id,
              'info' : doc.data()
            }
            this.$store.commit('products/add', payload);
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },
  },
  
}
</script>
<style scoped>
._product-detail-content {
    background: #fff;
    padding: 15px;
    border: 1px solid lightgray;
}
._product-detail-content p._p-name {
    color: black;
    font-size: 20px;
    border-bottom: 1px solid lightgray;
    padding-bottom: 12px;
}
.p-list span {
    margin-right: 15px;
}
.p-list span.price {
    font-size: 25px;
    color: #318234;
}
._p-qty > span {
    color: black;
    margin-right: 15px;
    font-weight: 500;
}
._p-qty .value-button {
    display: inline-flex;
    border: 0px solid #ddd;
    margin: 0px;
    width: 30px;
    height: 35px;
    justify-content: center;
    align-items: center;
    background: #fd7f34;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
}

._p-qty .value-button {
    border: 0px solid #fe0000;
    height: 35px;
    font-size: 20px;
    font-weight: bold;
}
._p-qty input#number {
    text-align: center;
    border: none;
    border-top: 1px solid #fe0000;
    border-bottom: 1px solid #fe0000;
    margin: 0px;
    width: 50px;
    height: 35px;
    font-size: 14px;
    box-sizing: border-box;
}
._p-add-cart {
    margin-left: 0px;
    margin-bottom: 15px;
}
.p-list {
    margin-bottom: 10px;
}
._p-features > span {
    display: block;
    font-size: 16px;
    color: #000;
    font-weight: 500;
}
._p-add-cart .buy-btn {
    background-color: #fd7f34;
    color: #fff;
}
._p-add-cart .btn {
    text-transform: capitalize;
    padding: 6px 20px;
    /* width: 200px; */
    border-radius: 52px;
}
._p-add-cart .btn {
    margin: 0px 8px;
}
</style>