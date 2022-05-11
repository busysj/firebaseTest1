<template>
  <div>
    <h1>시작 페이지</h1>
    <a @click="fnDoGoogleLogin_Popup">구글로그인</a> <br />
    <br />
    <a @click="$router.push('/login')">이메일로그인</a>
  </div>
</template>

<script>
export default {
  methods: {
    fnDoGoogleLogin_Popup() {
      this.$store.dispatch("fnDoGoogleLogin_Popup");
    },
  },
};
</script>
