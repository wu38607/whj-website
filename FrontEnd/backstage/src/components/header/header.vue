<template>
  <div class="header">
    <a href="/home" class="icon-home" @click="goHome"></a>
    <div class="title">{{title}}</div>
    <h1 class="seoh">{{title}}</h1>
  </div>
</template>

<script>
import { eventBus } from '@/eventbus.js';
export default {
  data() {
    return {
      title: '后台管理'
    };
  },
  created() {
    eventBus.$on('changeTitle', () => {
      this._changeTitle();
    });
  },
  methods: {
    _changeTitle() {
      let name = this.$route.name;
      if (name === 'updateBlog') {
        this.title = '修改文章';
      } else if (name === 'newBlog') {
        this.title = '新增文章';
      } else if (name === 'updateDraft') {
        this.title = '更新草稿';
      } else if (name === 'newDraft') {
        this.title = '新增草稿';
      } else {
        this.title = '后台管理';
      }
    }
  },
  watch: {
    '$route': function (to, from) {
      this._changeTitle();
    }
  }
};
</script>

<style scoped lang="stylus">
  a
    text-decoration none
  .header
    display flex
    flex-direction row
    padding 5px
    background #00cfe1
    box-shadow 0 2px 5px 2px rgba(0,0,0,0.16)
    .seoh
      display none
    .icon-home
      position absolute
      left 10px
      top 10px
      color #fff
      font-size 25px
      &:hover
        cursor pointer
    .title
      display inline-block
      margin 0
      padding 0  
      width 100%
      color  #fff
      text-align:center
      font-size 25px
      line-height 35px
      user-select none
      &:hover
        cursor default
      
</style>