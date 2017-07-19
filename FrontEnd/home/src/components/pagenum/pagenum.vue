<template>
  <div class="page-wrapper">
    <span class="page" @click="emitEvent(prePage)">上一页</span>
    <div class="pagenum-wrapper" @mouseout="listShow=false" @mouseover="listShow=true">
      <span class="pagenum">{{nowIndex}}</span>
      <ul class="num-ul" v-show="listShow" @mouseout="listShow=false" @mouseover="listShow=true">
        <li class="num-li" @click="emitEvent(n)" v-for="n in pageCount" :key="n">{{n}}</li>
      </ul>
    </div>
    <span class="page" @click="emitEvent(nextPage)">下一页</span>
  </div>
</template>

<script>
export default {
  props: {
    pageCount: {
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      listShow: false,
      nowIndex: 1
    };
  },
  computed: {
    prePage() {
      if (this.nowIndex === 1) {
        return 1;
      } else {
        return this.nowIndex - 1;
      }
    },
    nextPage() {
      if (this.nowIndex === this.pageCount) {
        return this.pageCount;
      } else {
        return this.nowIndex + 1;
      }
    }
  },
  methods: {
    emitEvent(index) {
      this.listShow = false;
      this.nowIndex = index;
      this.$emit('pageClick', index - 1);
    }
  }
};
</script>

<style scoped lang="stylus">
  ul
    list-style none
    margin 0
    padding 0
  .page-wrapper
    .page
      font-size 18px
      line-height 18px
      padding 5px
      color #727272
      background #f6f6f6
      transition all 0.5s
      border-radius 3px
      user-select none
      &:hover,&:active
        color #00bcd4
        background #dedede
        cursor pointer
    .pagenum-wrapper
      position relative
      display inline-block
      min-width 30px
      text-align center
      &:hover
        cursor pointer
      .pagenum
        font-size 17px
      .num-ul
        position absolute
        width 100%
        text-align center
        background #fff
        box-shadow 0px 2px 8px 1px rgba(0,0,0,0.2)
        .num-li
          font-size 17px
          line-height 17px
          padding  5px 0
          border-bottom 1px dashed #dedede
          &:hover
            background #dedede
</style>
