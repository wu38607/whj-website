<template>
  <transition name="slide">
    <div @click="goTop" v-show="isShow" class="up-wrapper">
      <i  class="icon-up"></i>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    inv: {
      type: Number,
      default: 300
    },
    boundary: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    goTop() {
      let top = document.body.scrollTop;
      if (navigator.userAgent.indexOf('Firefox') > -1) {
        top = document.documentElement.scrollTop;
      }
      let step = top / (this.inv / 10);
      let id = setInterval(() => {
        if (top <= 0) {
          clearInterval(id);
        } else {
          top -= step;
          window.scrollTo(0, top);
        }
      }, 10);
    }
  },
  mounted() {
    window.onscroll = () => {
      let top = document.body.scrollTop;
      if (navigator.userAgent.indexOf('Firefox') > -1) {
        top = document.documentElement.scrollTop;
      }
      if (top > this.boundary) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    };
  }
};
</script>

<style scoped lang="stylus">
  .slide-enter-active 
    transition all .5s;
  .slide-enter 
    transform translateX(80px)
  .slide-leave-active
    transition all .5s
    transform translateX(80px)
  .up-wrapper
    box-sizing border-box
    padding 15px
    .icon-up
      font-size 30px
      padding 5px
      border-radius 50%
      box-shadow 0 1px 3px 1px rgba(0,0,0,0.16)
      background #00cfe1
      text-align center
      line-height 25px
      &:before
        color #fff
      &:hover,&:active
        cursor pointer
        box-shadow 0 1px 3px 3px rgba(0,0,0,0.16)
      &:active
        transform translateY(2px)
</style>
