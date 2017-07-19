<template>
  <section class="sheet-wrapper">
    <h3 class="title">
      <router-link :to="{name:'blog',params:{id:blog._id}}" tag="span" class="title-link">{{blog.title}}</router-link>
    </h3>
    <div class="guide">
      <p>{{blog.guide}}</p>
      <router-link :to="{name:'blog',params:{id:blog._id}}" tag="span" class="more">&nbsp阅读全文...</router-link>
    </div>
    <div class="sheet-foot">
       <router-link tag="span" class="cate" :to="{name:'category',params:{name:blog.category}}" >{{blog.category}}</router-link>
       <span class="pv-wrapper">
        <i class="icon-eye"></i>
        <span class="pv">{{blog.pv}}</span>
       </span>
       <time class="time">{{`${blog.time.year}年${blog.time.month}月${blog.time.day}日`}}</time>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      blog: {}
    },
    data() {
      return {
        blogUrl: '/blog/' + this.blog._id
      };
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/wave.styl'
  a
    text-decoration none
  .sheet-wrapper
    box-sizing border-box
    padding 15px 10px 10px
    border-radius 5px
    background #fff
    box-shadow 0 1px 2px rgba(151,151,151,0.58)
    .title
      margin 0 0 10px 0
      padding 0
      .title-link
        position relative
        margin 0 0 10px 0
        padding 0
        font-size 24px
        font-weight lighter 
        line-height 24px    
        color #00BCD4
        &:hover
          cursor pointer
        wave(#00BCD4)
    .guide
      margin-bottom 10px
      font-weight normal 
      p
        margin 0 0 3px 3px
        font-weight lighter
        font-size 16px
        line-height 25px
        opacity 0.8
      .more
        color #00BCD4
        &:hover
          cursor pointer
    .sheet-foot
      border-top 1px solid #dfdfdf
      padding-top 5px
      .cate
        display inline-block
        padding 3px
        border-radius 3px
        background #8bc34a
        color #fff
        &:hover
         cursor pointer
      .pv-wrapper
        color #949494
        position relative
        margin-left 5px
        .icon-eye,.pv
          position static
          font-size 15px
          line-height 15px
          vertical-align baseline
      .time
        float right
        line-height 30px
        font-size 15px
        font-weight normal
        color #727272
</style>
