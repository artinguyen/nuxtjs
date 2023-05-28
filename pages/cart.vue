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
            <div class="row">
                
                <div class="col-lg-6">
                    <div class="shoping__checkout">
                        <ul>
                            <li>Total <span> {{ sum }}$</span></li>
                        </ul>
                        <a href="#" class="primary-btn" @click.prevent="checkout">CHECKOUT</a>
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
    };
  },
  computed: {
   list () {
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
    return this.$store.state.products.cart;
//     cart.forEach((element) => {
//       if(!element.quantity) {
//         element.quantity = 1;
//       }
      
// });
return cart;
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
    updateQuantity(productId, $event) {
      let quantity = ($event.target.value)
      this.$store.commit('products/setQuantity', {productId, quantity});
      //this.list = this.$store.state.products.cart;
          //this.list.forEach((element) => {
            
         // if(element.id == productId) {

            //element.price = 4000;
          //}
      
//});
    //this.list[0].info.price = $event.target.value;
    //console.log(this.list)
    }
  },
  
}
</script>
<style scoped>
.shoping__cart__item img{
  max-width: 100px;
}
</style>s