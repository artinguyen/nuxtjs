export const state = () => ({
  list: [],
   product: false,
   doc_id: '',
   payload: {}
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
    }
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
};