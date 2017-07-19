<template>
  <div class="home-wrapper">
    <div class="pv">
      <span>今日访问量:{{pv[0]}} &nbsp|&nbsp</span>
      <span>总访问量:{{pv[1]}}</span>
    </div>
    <div class="wrapper">  
      <my-blog class="my-blog"></my-blog>
      <my-draft class="my-draft"></my-draft>
      <my-slider class="my-slider"></my-slider>
      <my-book class="my-book"></my-book>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventbus.js';
import Blog from '@/module/blog/blog';
import Book from '@/module/book/book';
import Draft from '@/module/draft/draft';
import Slider from '@/module/slider/slider';
export default {
  components: {
    'my-blog': Blog,
    'my-book': Book,
    'my-draft': Draft,
    'my-slider': Slider
  },
  data() {
    return {
      pv: [],
      isSliderShow: false,
      sliderProps: {
        _id: -1,
        title: '',
        img: '',
        url: ''
      }
    };
  },
  mounted() {
    eventBus.$emit('changeTitle', '后台管理');
  },
  created() {
    this.$http.post('/api/admin/other/pv.json').then((res) => {
      res = res.body;
      if (res.errno === this.ERR_OK) {
        this.pv = res.data;
      } else {
        alert('访问量加载失败');
      }
    });
  }
};
</script>

<style lang="stylus">
  .home-wrapper
    box-sizing border-box
    position relative
    .pv
      position relative
      padding-right 10px
      text-align right
      font-size 14px
      line-height 30px
      color #757575
    .wrapper
      position relative
      &:after,&:before
        content ''
        display table
        clear both
      .my-blog,
      .my-book,
      .my-draft
      .my-slider
        box-sizing border-box
        float left
        padding 10px 30px 20px
  @media all and (min-width: 880px)
    .my-blog,.my-book,.my-draft,.my-slider
      width 50%
  @media all and (max-width: 880px)
    .my-blog,.my-book,.my-draft,.my-slider
      width 100%
</style>
