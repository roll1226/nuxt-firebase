import firebase from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()
const postsRef = db.ref("/posts")

export const state = () => {
  return {
    user: undefined,
    posts: []
  }
}

export const mutations = {
  ...firebaseMutations,
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  async loginWithUserName() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
      var user = result.user
      postsRef.push().set({
        name: user.displayName
      })
  },
  addComments({ state } , payload) {
    const date = new Date()
    postsRef.push().set({
        comment: payload,
        user: state.user.name,
        date: `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
      })
  },
  INIT_POSTS: firebaseAction(({
    bindFirebaseRef
  }) => {
    return new Promise((resolve) => {
      bindFirebaseRef('posts', postsRef, {
        resolve
      })
    })
  }),
  async INIT_USERS({
      commit
  }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit("setUser", {
          name: user.displayName
        })
      } else {
        commit("setUser", null)
      }
    })
  }
}
