<template>
  <div class="container">

<!-- Shoping Cart Section Begin -->
    <section class="shoping-cart spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="shoping__cart__table">
                        <table>
                            <thead>
                                <tr>
                                    <th class="shoping__product">Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  v-for="(product,key) in list" :key="key">
                                    <td class="shoping__cart__item">
                                        <img :src="'data:image/jpeg;base64,'+product.info.image">
                                        <h5> {{ product.info.name }} </h5>
                                    </td>
                                    <td class="shoping__cart__price">
                                        {{ product.info.price }}$
                                    </td>
                                    <td class="shoping__cart__quantity">
                                        <div class="quantity">
                                            <div class="pro-qty">
                                                <input type="text" value="1" @keyup="updateQuantity(product.id, $event)">
                                            </div>
                                        </div>
                                    </td>
                                    <td class="shoping__cart__total">
                                        {{ product.info.price * product.quantity }}
                                    </td>
                                    <td class="shoping__cart__item__close">
                                        <span class="icon_close"></span>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Shoping Cart Section End -->


 
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
    //   list: [{
    //   'id' : 123,
    //   'quantity' : 1,
    //   'info' : {
    //     'name' : 234,
    //     'price' : 200,
        
    //     'description' : 'afdsf',
    //     'image' : 'fasfsd'
    //   }
    // }]
      //sum: 0
      list: []
    };
  },
  computed: {
   list1 () {
    // return [{
    //   'id' : 123,
    //   'quantity' : 1,
    //   'info' : {
    //     'name' : 234,
    //     'price' : 200,
        
    //     'description' : 'afdsf',
    //     'image' : 'fasfsd'
    //   }
    // }]
    //return this.$store.state.products.cart;
//     cart.forEach((element) => {
//       if(!element.quantity) {
//         element.quantity = 1;
//       }
      
// });
//return cart;
     //return this.$store.state.products.cart
    },
    user () {
     return this.$store.state.users.user
    },
    sum() {
          return this.list.reduce((accumulator, object) => {
          return accumulator + parseInt(object.info.price * object.quantity);
        }, 0);
    }
  },
  mounted() {
  //console.log(this.list)
  this.getList();
  console.log(this.list)
    //this.getCart();
  },

  created() {
    //console.log(this.list);

  //this.sum = sum;
  },
  methods: {
      checkout() {
      if(!this.user) {
        alert('Vui long dang nhap')
      } else {
        //alert('Mua thanh cong')
        let uid = this.user.uid;
        console.log(this.user.uid)

                const db = this.$fire.firestore;
      db.collection("orders").add({
    user: this.user.uid,
    orders: JSON.stringify(this.list),
})
.then(() => {
    alert('Purchase successfully')
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});


      }
    },
    getList() {
           const db = this.$fire.firestore;
      db.collection("orders").where("user", "==", this.user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // let payload = {
            //   'id' : doc.id,
            //   'info' : doc.data()
            // }
            let data = doc.data();
            this.list = JSON.parse(data.orders);
            //this.list.push(payload)
            //this.$store.commit('products/add', payload);
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }
  },
  
}
</script>
<style scoped>
.shoping__cart__item img{
  max-width: 100px;
}
</style>s