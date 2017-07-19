<template>
  <div class="input-wrapper">
    <input :readonly="readonly" v-model="curItem"  type="text" class="categories">
    <i class="pulldown" :class="{up: isListShow}" @click="isListShow = !isListShow"></i>
    <ul class="list" v-show="isListShow">
      <li class="item" v-for="(item,index) in list" :key="index" @click="chooseItem(index)">{{item}}</li>
    </ul>
</div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    chooseItem(index) {
      this.curIndex = index;
      this.isListShow = false;
      this.$emit('onItemChange', index);
    },
    closeList() {
      this.isListShow = false;
    }
  },
  computed: {
    curItem() {
      return this.list[this.curIndex];
    }
  },
  data() {
    return {
      isListShow: false,
      curIndex: 0
    };
  },
  mounted() {
    this.$emit('onItemChange', this.curIndex);
  }
};
</script>

<style scoped lang="stylus">
  .input-wrapper
    position relative
    display inline-block
    .categories
      width: 200px
      padding: 5px
      line-height: 20px
      font-size: 17px
      outline-color: rgb(60, 60, 60);
      border: 2px inset rgb(242, 241, 240)
      border-radius: 4px
      text-align center
    .pulldown
      position: absolute
      display: block
      top: 12px
      right: 14px
      border-top: 8px solid #000
      border-right: 8px solid transparent
      border-bottom: 8px solid transparent
      border-left: 8px solid transparent 
      &:hover
        cursor pointer 
    .up
      top: 5px !important
      border-top: 8px solid transparent !important
      border-right: 8px solid transparent !important
      border-bottom: 8px solid #000 !important
      border-left: 8px solid transparent !important 
  .list
    position relative
    margin: 0
    padding: 0
    max-height 130px
    overflow-y scroll
    background #dfdfdf
    border-radius: 4px
    .item
      box-sizing border-box
      padding 4px 0
      list-style: none
      color #2d2929
      font-size: 17px
      text-align center
      border-bottom 1px solid rgba(0,0,0,0.2)
      &:last-child
        border-radius: 0 0 4px 4px
      &:hover
        cursor: pointer
        background #d2d2d2
</style>
