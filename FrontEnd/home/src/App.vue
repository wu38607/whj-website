<template>
  <div @click="hideMenu">
    <my-header class="my-head"></my-header>
    <my-menu style="top:-340px" class="menu-container"></my-menu>
     <transition name="faden"> 
      <router-view class="view"></router-view>
     </transition> 
    <my-up class="up-wrapper"></my-up>
  </div>
</template>

<script>
import header from '@/components/header/header';
import menu from '@/components/menu/menu';
import upbutton from '@/components/upbutton/upbutton';
import { eventBus } from '@/eventbus.js';
export default {
  components: {
    'my-header': header,
    'my-menu': menu,
    'my-up': upbutton
  },
  methods: {
    hideMenu() {
      eventBus.$emit('hideMenu');
    }
  }
};
</script>

<style lang="stylus">
  @import './common/fonticon/style.css'
  ::-webkit-scrollbar
    width 5px
  ::-webkit-scrollbar-track
    background-color #DAE4E5
  ::-webkit-scrollbar-thumb
    background-color #00cfe1

  .faden-enter-active, .fade-leave-active 
    transition: opacity .5s
  .faden-enter, .fade-leave-to
    opacity: 0
  
  body
    margin: 0
    background #f6f6f6
    .header
      position fixed
      z-index 100
      width 100%
      top 0
      left 0
    .menu-container
      position fixed
      z-index 50
    .view
      margin 75px auto 0
    .up-wrapper
      position fixed
      bottom 60px
      right 10px
</style>
