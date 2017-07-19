<template>
  <div>
    <transition name="fade">
      <div class="login-wrapper" v-show="logshow">
        <div class="login_form">
          <span class="close" @click="hide">x</span>
          <input class="item" v-model="username" id="username" name="username" placeholder="邮箱" autofocus="" type="email">
          <input class="item" v-model="password" id="password" name="password" placeholder="密码" type="password">
          <input class="item submit" value="站长登陆" type="button" @click="login">
        </div>
      </div>
    </transition>
    <transition v-if="logshow" name="fade">
      <div class="overview" @click="hide"></div>
    </transition>
    <div class="flash log-successed" v-if="isSuccessedShow">登录成功</div>
    <div class="flash log-failed" v-if="isfailedShow">登录失败</div>
  </div>
</template>

<script>
const ERR_OK = 0;
export default {
  props: {
    logshow: false
  },
  data() {
    return {
      username: '',
      password: '',
      isSuccessedShow: false,
      isfailedShow: false
    };
  },
  methods: {
    hide() {
      this.$emit('onHide');
    },
    login() {
      let data = {
        username: this.username,
        password: this.password
      };
      this.$http.post('/api/login', data).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.showFlash(0);
          this.$emit('showFlash', ERR_OK);
          window.location = '/admin';
        } else {
          this.showFlash(1);
        }
      });
    },
    showFlash(status) {
      if (status === 0) {
        this.isSuccessedShow = true;
        setTimeout(() => {
          this.isSuccessedShow = false;
          this.logshow = false;
        }, 300);
      } else {
        this.isfailedShow = true;
      }
      setTimeout(() => {
        this.isfailedShow = false;
      }, 500);
    }
  }
};
</script>

<style lang="stylus">

  .fade-enter-active,.fade-leave-active
    transition: opacity 0.5s
  .fade-enter,.fade-leave-active
    opacity: 0

  .flash
    position: fixed
    box-sizing: border-box
    margin-left: -52px
    left: 50%
    top: 200px
    width: 104px
    z-index: 100
    padding: 12px
    font-size: 20px
    line-height: 20px
    border-radius: 10px
    color: #fff
    &.log-successed
      background: #27abf9
    &.log-failed
      background: red

  .overview
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: rgba(0,0,0,0.3)
    z-index: 50
  .login-wrapper
    position: fixed
    z-index: 100
    left: 50%
    top: 40%
    width: 315px
    height: 160px
    margin-left: -157px
    margin-top: -80px
    .login_form
      background: #fff
      padding: 10px
      border-radius: 10px
      .item
        display: block
        border: 1px solid gray
        border-radius: 5px
        background: #f3f4f5
        padding: 5px
        width: 280px
        margin: 20px auto
      .submit
        margin: 10px auto 0
        background: #86CE2F
        &:hover
          cursor: pointer
      .close
        position: absolute
        right: 5px
        top: -5px
        padding: 5px
        &:hover
          cursor: pointer

</style>
