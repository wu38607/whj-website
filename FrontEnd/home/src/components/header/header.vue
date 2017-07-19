<template>
  <div class="header">
    <i class="icon-menu" @click="toggleMenu"></i>
    <div class="title">{{title}}</div>
    <h1 class="seoh">{{title}}</h1>
  </div>
</template>

<script>
import { eventBus } from '@/eventbus.js';
export default {
  data() {
    return {
      title: '404'
    };
  },
  methods: {
    toggleMenu() {
      eventBus.$emit('toggleMenu');
    }
  },
  created() {
    eventBus.$on('changeTitle', (title) => {
      this.title = title;
    });
  }
};
</script>

<style scoped lang="stylus">
  .header
    display flex
    flex-direction row
    padding 5px
    background #00cfe1
    box-shadow 0 2px 5px 2px rgba(0,0,0,0.16)
    .seoh
      display none
    .icon-menu
      position absolute
      margin-left 3px
      font-size 25px
      line-height 35px
      &:before
        color  #fff
      &:hover
        cursor pointer
    .title
      display inline-block 
      padding 0  
      margin 0 auto
      min-width 200px
      width: 100%
      color  #fff
      text-align:center
      font-size 25px
      line-height 35px
      user-select none
      &:hover
        cursor default
</style>