<template>
  <div>
    <div class="title-wrapper">
      <textarea spellcheck="false" placeholder="标题" rows="1" class="title text" v-model.trim="blog.title"></textarea>
    </div>
    <div class="guide-wrapper">
      <textarea spellcheck="false" placeholder="导语" rows="2" class="guide text" v-model="blog.guide"></textarea>
    </div>
    <mavon-editor :scrollStyle="true" class="editor" v-model="blog.md" v-on:change="valueChange" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    blogProp: {
      type: Object,
      default: function () {
        return {
          title: '',
          guide: '',
          article: '', // html
          md: '', // markdown
          category: '',
          pv: -1
        };
      }
    }
  },
  data() {
    return {
      blog: this.blogProp
    };
  },
  watch: {
    blog: {
      handler: function (newValue, oldValue) {
        let blogData = this._copy(newValue);
        blogData.guide = blogData.guide || this._filter(blogData.md).substr(0, 60);
        this.$emit('onDataCahnge', blogData);
      },
      deep: true
    }
  },
  methods: {
    valueChange(text, renderText) {
      this.blog.article = renderText;
    },
    _filter(text) {
      return text.replace(/[^0-9a-zA-Z\u4e00-\u9fa5.，,。？“”]+/g, '');
    },
    _copy(obj) {
      let newobj = {};
      for (let attr in obj) {
        newobj[attr] = obj[attr];
      }
      return newobj;
    },
    _initBlog(obj) {
      for (let attr in obj) {
        obj[attr] = '';
      }
    }
  },
  deactivated() {
    this._initBlog(this.blog);
  }
};
</script>

<style lang="stylus">
  .cate-wrapper
    text-align center
    .cate-tip
      vertical-align top
      font-size 20px
      line-height 35px
    .cate-ok
      vertical-align top
    .my-select
      margin 0 15px
  .text
    min-height 35px
    width 100%
    border-radius 5px
    resize none
    border none
  .title-wrapper
    margin 60px auto 0
    max-width 420px
    border-radius 5px
    .title
      font-size 25px
      line-height 35px
      box-shadow 0 0 1px 1px rgba(0,0,0,0.157)
      text-align center
      padding 5px !important

  .guide-wrapper
    margin 10px auto 0
    max-width 620px
    border-radius 5px
    .guide
      font-size 18px
      line-height 25px
      box-shadow 0 0 1px 1px rgba(0,0,0,0.157)
      padding 10px 15px
</style>
