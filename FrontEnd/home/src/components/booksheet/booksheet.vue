<template>
  <section class="book-section">
    <div class="img-wrapper">
      <img :src="cover" >
    </div>
    <div class="content">
      <a :href="'/book/'+ book.name" target="_blank"><h3 class="name">{{book.title}}</h3></a>
      <div class="guide">
        <p>{{book.guide}}</p>
      </div>
      <div class="foot">
        <time>Last updated {{`${book.time.year}-${book.time.month}-${book.time.day}`}}</time>
        <span class="see">
          <i class="icon-eye"></i>
          <span class="seenum">{{book.pv}}</span>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
    };
  },
  computed: {
    cover() {
      if (this.book.cover === '') {
        return require('./assets/default.svg');
      } else {
        return this.book.cover;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/wave.styl'
  .book-section
    position relative
    display flex
    box-sizing border-box
    padding 12px
    background #fff
    border-radius 4px
    border 1px solid #e8eaed
    box-shadow 1px 2px 3px 0 rgba(0,0,0,.1)
    &:hover
      box-shadow 1px 2px 3px 2px rgba(0,0,0,.1)
    .img-wrapper
      margin-right 15px
      width 70px
      height 84px
      img
        width 100%
        height 100%
        opacity 0.8
    .content
      position relative
      box-sizing border-box
      flex 1
      .name
        position relative
        display inline-block
        margin 0
        padding 0
        font-size 20px
        font-weight 500
        color #00bcd4
        wave(#00BCD4)
      .guide
        position relative
        p
          margin 3px 0
          padding 0
          font-size 14px
          font-weight normal
          opacity .8
      .foot
        position relative
        margin-top 10px
        color #737373
        time
          margin-right 10px
        .see
          vertical-align bottom
          .icon-eye
            position absolute
            top 1px
            left 165px
          .seenum
            position absolute
            left 185px
</style>
