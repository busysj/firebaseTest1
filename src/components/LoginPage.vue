<template>
  <div>
    <h1>로그인 페이지입니다</h1>
    <form @submit.prevent="DoLogin">
      <label>이메일</label>
      <input type="text" v-model="sEmail" /> <br />
      <label>비밀번호</label>
      <input type="password" v-model="sPassword" /> <br />
      <input type="submit" value="회원가입" />
    </form>
  </div>
</template>

<script>
export default {
  date() {
    return {
      sEmail: "",
      sPassword: "",
    };
  },
  methods: {
    DoLogin() {
      this.$store.dispatch("DoLogin", {
        pEmail: this.sEmail,
        pPassword: this.pPassword,
      });
    },
  },
};
</script>
