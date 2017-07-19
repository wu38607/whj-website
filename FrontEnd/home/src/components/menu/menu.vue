<template>
  <aside class="menu">
    <div class="brand">
      <div class="img-wrapper">
        <img :src="personConfig.head" @click="goAdminPage">
      </div>
      <div class="person-info">
        <div class="name">{{personConfig.name}}</div>
        <a class="email" :title="personConfig.email" :href="`mailto:${personConfig.email}`" >{{personConfig.email}}</a>
      </div>
    </div>
    <div class="scroll">
      <ul>
        <li @click="goPage('/home')" class="item">
          <i class="icon-home icon"></i>
          <span class="text">Home</span>
        </li>
        <li @click="goPage('/category/none')" class="item">
          <i class="icon-categories icon"></i>
          <span class="text">Categories</span>
        </li>
        <li @click="goPage('/catalog/book')" class="item">
          <i class="icon-book icon"></i>
          <span class="text">Book</span>
        </li>
        <li @click="goGit" class="item">
          <i class="icon-github icon"></i>
          <span class="text">GitHub</span>
        </li>
      </ul>
    </div>
    <my-login v-on:onHide="hideLogin" :logshow="logshow"></my-login>
  </aside>
</template>

<script>
import { eventBus } from '@/eventbus.js';
import Login from '@/components/login/login.vue';
import { personConfig } from '@/../config_person.js';
export default {
  components: {
    'my-login': Login
  },
  data() {
    return {
      logshow: false,
      isRoot: false,
      personConfig: personConfig
    };
  },
  methods: {
    hideLogin() {
      this.logshow = false;
    },
    goGit() {
      window.open(this.personConfig.git);
    },
    goPage(name) {
      this.$router.push(name);
    },
    toggleMenu() {
      this.showMenu();
      this.hideMenu();
    },
    goAdminPage() {
      if (this.isRoot) {
        window.open('/admin');
      } else {
        this.logshow = true;
      }
    },
    showMenu() {
      let elMenu = document.getElementsByClassName('menu-container')[0];
      let height = parseInt(elMenu.style.top);
      if (height < 0) {
        let id = setInterval(() => {
          if (height >= 45) {
            clearInterval(id);
          } else {
            height += 35;
            elMenu.style.top = height + 'px';
          }
        }, 10);
      }
    },
    hideMenu() {
      let elMenu = document.getElementsByClassName('menu-container')[0];
      let height = parseInt(elMenu.style.top);
      if (height > 0) {
        let id = setInterval(() => {
          if (height <= -340) {
            clearInterval(id);
          } else {
            height -= 35;
            elMenu.style.top = height + 'px';
          }
        }, 10);
      }
    }
  },
  mounted() {
    eventBus.$on('toggleMenu', this.toggleMenu);
    eventBus.$on('hideMenu', this.hideMenu);
    this.$http.post('/api/admin/other/authority').then((res) => {
      res = res.body;
      if (res.errno === this.ERR_OK) {
        this.isRoot = true;
      }
    });
  }
};
</script>

<style scoped lang="stylus">
  ul
    list-style none
    padding 0
    margin 0
  .menu
    width 240px
    background #fff
    border 1px solid #3dfff5
    box-shadow 1px 1px 1px 1px rgba(61,255,245,0.16)
    .brand
      box-sizing border-box
      width 240px
      height 200px
      padding 20px 20px
      background url('./assets/brand.png')
      background-size 100%
      .img-wrapper
        img
          width 75px
          height 75px
          border 2px solid #fff
          border-radius 50%
          &:hover
            cursor pointer
      .person-info
        margin-top 10px
        margin-left 5px
        color #4767a7
        .name
          font-size 17px
        .email
          display inline-block
          margin-top 8px
          font-size 15px
          text-decoration none
          color #4767a7
    .scroll
      background #fff
      min-height 170px
      ul
        margin-top 10px
        .item
          color #757575
          padding 10px 5px 5px 15px
          .icon
            font-size 20px
            margin-right 12px
          .text
            font-size 20px
            line-height 20px
          &:hover
            cursor pointer
            background #dedede
            color #00cfe1
</style>