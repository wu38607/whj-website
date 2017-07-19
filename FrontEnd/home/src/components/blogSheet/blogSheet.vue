<template>
  <div class="blog" @click="goBlog"> 
    <time class="time">{{`${data.time.year}年${data.time.month}月${data.time.day}日`}}</time>
    <div class="title">{{data.title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          title: '正在加载...',
          _id: -1,
          time: {
            year: 0,
            month: 0,
            day: 0
          }
        };
      }
    }
  },
  methods: {
    goBlog() {
      this.$router.push('/blog/' + this.data._id);
    }
  }
};
</script>

<style scoped lang="stylus">
  .blog
    padding 5px 10px
    width 250px
    margin 0 0 30px
    border 1px solid rgba(0,207,225,0.5)
    border-radius 10px
    box-shadow 0 1px 2px rgba(0,207,225,0.5)
    background #fff
    &:hover
      cursor pointer
      transform scale(1.05)
    &:active
      transform scale(1)
    .time
      line-height 30px
      font-size 15px
      font-weight normal
      color #727272
    .title
      margin 10px 0
      font-size 24px
      font-weight lighter
      line-height 24px
      color #2ca9b9
</style>
