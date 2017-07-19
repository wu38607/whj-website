<template>
  <div class="article-container">
    <article v-hljs v-imgWrap class="article article-hook" ref="elArticle"></article>
    <div class="info">
      <time class="article-time">{{`${blog.time.year}年${blog.time.month}月${blog.time.day}日`}}</time>
      <span class="article-cate" @click="goCategory">{{blog.category}}</span>
      <i class="icon-eye"></i>
      <span class="pv">{{blog.pv}}</span>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventbus.js';
import HLJS from 'HLJS';
export default {
  props: {
    blog: {}
  },
  data() {
    return {
    };
  },
  methods: {
    goCategory() {
      this.$router.push('/category/' + this.blog.category);
    }
  },
  directives: {
    hljs(el) {
      let blocks = el.querySelectorAll('pre code');
      Array.prototype.forEach.call(blocks, HLJS.highlightBlock);
    },
    imgWrap(el) {
      let imgs = el.querySelectorAll('img');
      for (let i = 0; i < imgs.length; i++) {
        let wrap = document.createElement('div');
        let parent = imgs[i].parentElement;
        wrap.className = 'artice-img-wrapper';
        parent.insertBefore(wrap, imgs[i]);
        wrap.appendChild(imgs[i]);
      }
    }
  },
  watch: {
    blog: function (newValue, oldValue) {
      this.$refs.elArticle.innerHTML = newValue.article;
      eventBus.$emit('articleDone', this.$refs.elArticle);
    }
  }
};
</script>

<style lang="stylus">
 @import '../../../static/highligh/styles/default.css'
  h1,h2
    color #00BCD4
    font-weight normal
    position relative
    margin 5px 0
  h1
    font-size 26px
    &:hover
      &:before
        content '#'
        position absolute
        left -15px
        top 5px
  h2
    font-size 23px
    &:hover
      &:before
        content '#'
        position absolute
        left -13px
        top 5px
  blockquote
    position relative
    padding 10px 20px
    border-left 4px solid #00cfe1
    color #6e6e6e
    background #f5f5f5
    font-size 14px
    border-radius 0 2px 2px 0
    margin-left 0
  .article-container
    box-sizing border-box
    position relative
    max-width 700px
    box-shadow 0 0 20px rgba(0,0,0,0.3) 
    border-radius 4px
    .article
      padding 35px 35px 10px 35px
      min-height 750px  
      background #fff
      font-family -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif
      .artice-img-wrapper
        overflow-x auto
    .info
      background #fff
      border-top 1px solid #d4d4d4
      padding 0 20px
      height 40px
      .article-cate
        padding 1px 5px
        font-size 20px
        border-radius 3px
        line-height 40px
        background #8bc34a
        color #fff
        &:hover
          cursor pointer
      .article-time
        float right
        line-height 40px
        font-size 18px
        font-weight normal
        color #727272
      .icon-eye
        margin-left 10px
        font-size 16px
        line-height 16px
        color #949494
      .pv
        position relative
        bottom  1px
        font-size 16px
        line-height 16px
        color #949494
</style>