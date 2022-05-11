import Vue from "vue";
import Vuex from "vuex";
import "@/datasources/firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import router from "@/router";

const auth = getAuth();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oUser: null,
  },
  getters: {
    fnGetUser(state) {
      return state.oUser;
    },
    fnGetAuthStatus(state) {
      return state.oUser != null;
    },
  },
  mutations: {
    fnSetUser(state, payload) {
      state.oUser = payload;
    },
  },
  actions: {
    fnRegisterUser({ commit }, payload) {
      createUserWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
        .then((pUserInfo) => {
          commit("fnSetUser", {
            email: pUserInfo.user.email,
          });
          router.push("/main");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    DoLogin({ commit }, payload) {
      signInWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
        .then((pUserInfo) => {
          commit("fnSetUser", {
            id: pUserInfo.user.uid,
            name: pUserInfo.user.displayName,
            email: pUserInfo.user.email,
            photoURL: pUserInfo.user.photoURL,
          });
          router.push("/main");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    fnDoGoogleLogin_Popup({ commit }) {
      const oProvider = new GoogleAuthProvider();
      oProvider.addScope("profile");
      oProvider.addScope("email");

      signInWithPopup(auth, oProvider)
        .then((pUserInfo) => {
          commit("fnSetUser", {
            id: pUserInfo.user.uid,
            name: pUserInfo.user.displayName,
            email: pUserInfo.user.email,
            photoURL: pUserInfo.user.photoURL,
          });
          router.push("/main");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  modules: {},
});
