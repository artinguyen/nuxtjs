export const state = () => ({
  list: [],
   product: {},
   doc_id: '',
   payload: {},
   cart: []
})

export const mutations = {
  add(state, obj) {
    state.list.push(obj)
  },
  setListDefault(state) {
    state.list = []
  },
  setProduct(state, product) {
        state.product = product
    },
  setDocId(state, id) {
    state.doc_id = id;
  },
  setPayload(state, payload) {
    state.payload = payload;
  },
  setCart(state, id) {
    state.cart.push(id)
  },
  setQuantity(state, {productId, quantity}) {
    state.cart.forEach((element) => {
          if(element.id == productId) {
            element.quantity = quantity;
          }
      
    });
    console.log(state.cart)
  }
}

export const getters = {
  authProduct: (state) => {
    return state.product;
  },
  list: (state) => {
    return state.list;
  },
  getProduct(state) {
        return state.product
    },
    isLoggedIn(state) {
        let productLoggedIn = false
        if (state.product) {
            productLoggedIn = true
        }
        return productLoggedIn
    },
};

export const actions = {
  async onAuthStateChangedAction(state, { authproduct, claims }) {
        if (!authproduct) {
            state.commit('setproduct', null)
        } else {
            const { uid, email } = authproduct
            state.commit('setproduct', {
                uid,
                email,
            });
        }
    },
        setPrice(state, productId, price) {
          console.log('1')
          return state.cart = [
          {
      'id' : 123,
      'quantity' : 1,
      'info' : {
        'name' : 234,
        'price' : 200,
        
        'description' : 'afdsf',
        'image' : 'fasfsd'
      }
    }]
      //     console.log('1')
      // state.commit('setPrice', productId, price)
    }
};