export const state = () => ({
  list: [],
   user: false,
   doc_id: '',
   payload: {}
})

export const mutations = {
  add(state, obj) {
    state.list.push(obj)
  },
  SET_LIST_DEFAULT(state) {
    state.list = []
  },
  SET_USER(state, user) {
        state.user = user
    },
  setDocId(state, id) {
    state.doc_id = id;
  },
  setPayload(state, payload) {
    state.payload = payload;
  }
}

export const getters = {
  authUser: (state) => {
    return state.user;
  },
  list: (state) => {
    return state.list;
  },
  getUser(state) {
        return state.user
    },
    isLoggedIn(state) {
        let userLoggedIn = false
        if (state.user) {
            userLoggedIn = true
        }
        return userLoggedIn
    }
};

export const actions = {
  setName({ commit }, newValue) {
    commit("SET_USER_NAME", newValue);
  },
  async onAuthStateChangedAction(state, { authUser, claims }) {
        if (!authUser) {
            state.commit('SET_USER', null)
        } else {
            const { uid, email } = authUser
            state.commit('SET_USER', {
                uid,
                email,
            });
        }
    },
};