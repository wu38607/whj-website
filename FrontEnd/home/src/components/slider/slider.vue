<template>
  <div class="slide-wrapper" @mouseover="stopInv" @mouseout="runInv" @click="emitClick">
    <div class="slide-img">
        <transition name="fade">
          <img v-if="isShow" :src="sliders[nowIndex].img">
        </transition>
    </div>
    <i class="icon-arrow-left arrow" @click.stop="goto(preIndex)"></i>
    <i class="icon-arrow-right arrow" @click.stop="goto(nextIndex)"></i>
    <transition name="fade">
      <h2 v-if="isShow" class="title"> {{sliders[nowIndex].title}} </h2> 
    </transition>
    <ul class="slide-page">
      <li class="slide-item" :class="{on : nowIndex === index}" v-for="(item,index) in sliders" :key="index" @click.stop="goto(index)"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      sliders: {
        type: Array
      },
      inv: {
        type: Number,
        default: 1000
      }
    },
    data() {
      return {
        nowIndex: 0,
        isShow: true
      };
    },
    computed: {
      preIndex() {
        if (this.nowIndex === 0) {
          return this.sliders.length - 1;
        } else {
          return this.nowIndex - 1;
        }
      },
      nextIndex() {
        if (this.nowIndex === this.sliders.length - 1) {
          return 0;
        } else {
          return this.nowIndex + 1;
        }
      }
    },
    methods: {
      goto(index) {
        this.isShow = false;
        setTimeout(() => {
          this.isShow = true;
          this.nowIndex = index;
        }, 10);
      },
      runInv() {
        this.invId = setInterval(() => {
          this.goto(this.nextIndex);
        }, this.inv);
      },
      stopInv() {
        clearInterval(this.invId);
      },
      emitClick() {
        this.$emit('clickImg', this.nowIndex);
      }
    },
    mounted() {
      this.runInv();
    }
  };
</script>

<style scoped lang="stylus">
  .fade-enter-active, .fade-leave-active 
    transition: opacity .8s

  .fade-enter, .fade-leave-to 
    opacity: 0
    
  ul
    list-style none
    margin 0
    padding 0
  .slide-wrapper
    position relative
    height 300px
    box-shadow 0 0 2px rgba(151,151,151,0.58)
    &:hover
      cursor pointer
    .slide-img
      position relative
      width 100%
      height 300px
      z-index -1
      overflow hidden
      img
        position absolute
        width 100%
        height 100%
    .title
      position absolute
      top 85px
      left 45px
      margin: 0
      padding: 0
      font-size 25px
      font-weight lighter
      color #fff
    .slide-page
      position absolute
      bottom 20px
      left 50%
      margin-left -30px
      .on
        background #00cfe1 !important
      .slide-item
        float left
        width 15px
        height 15px
        margin-right 15px
        border-radius 50%
        background #dedede
        &:hover
          cursor pointer
        &:last-child
          margin-right 0
    .arrow
      position absolute
      top 130px
      font-size 35px
      color #fff
      &:hover,&:active
        cursor pointer
    .icon-arrow-left
      left 3px
    .icon-arrow-right
      right 3px
</style>
