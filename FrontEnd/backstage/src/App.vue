<template>
  <div>
    <my-header class="my-header"></my-header>
    <transition name="faden">
      <keep-alive exclude="Blog_update,Draft_update,Blog_New">
        <router-view class="view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import header from '@/components/header/header';
export default {
  components: {
    'my-header': header
  }
};
</script>

<style lang="stylus">
  @import './common/stylus/base.styl'
  @import './common/stylus/btn.styl'
  @import './common/fonticon/style.css'
  ::-webkit-scrollbar
    width 5px
  ::-webkit-scrollbar-track
    background-color #fff
  ::-webkit-scrollbar-thumb
    background-color #DAE4E5

  .faden-enter-active, .fade-leave-active 
    transition: opacity .5s
  .faden-enter, .fade-leave-to
    opacity: 0
    
  body
    margin 0
    padding 0
    background #f6f6f6
    .my-header
      position fixed
      top 0
      left 0
      width 100%
      z-index 100
    .view
      margin-top 45px
      z-index 0
</style>
