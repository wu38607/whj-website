<template>
  <div class="cate-list">
    <ul class="cate-ul">
      <li class="cate-li" @click="emitClick(index)" :class="{on: index===nowIndex}" v-for="(item, index) in list" :key="index">{{item}}</li>
      <li class="cate-li" v-if="allList.length > 5" @click="toggleShow" v-html="arrow"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    allList: {
      type: Array,
      defalut: () => []
    },
    curIndex: {
      type: Number,
      defalut: 0
    }
  },
  data() {
    return {
      list: [],
      isShow: true,
      arrow: '&#8744',
      nowIndex: 0
    };
  },
  methods: {
    toggleShow() {
      if (this.list.length === this.allList.length) {
        this.list = this.allList.slice(0, 5);
        this.arrow = '&#8744';
      } else {
        this.list = this.allList;
        this.arrow = '&#8743';
      }
    },
    emitClick(index) {
      this.nowIndex = index;
      this.$emit('clickItem', index);
    }
  },
  watch: {
    allList: function(newValue, oldValue) {
      this.list = newValue.slice(0, 5);
    },
    curIndex: function(newValue, oldValue) {
      this.nowIndex = newValue;
    }
  }
};
</script>

<style scoped lang="stylus">
  ul 
    padding 0
    margin 0
    list-style none
  .cate-list
    background #fff
    max-width 200px
    .cate-ul
      border 1px solid rgba(0,207,225,0.5)
      box-shadow 0 1px 2px rgba(0,207,225,0.5)
      .on
        color #00cfe1 !important
      .cate-li
        font-size 20px
        line-height 50px
        padding 0 20px
        border-bottom 1px solid rgba(0,0,0,0.1)
        text-align center
        color #2d2929
        &:last-child
          border-bottom none
          color #727272
          &:hover
            background #fff
            color #2d2929
        &:hover
          cursor pointer
          background #dedede
          color #00cfe1
</style>
