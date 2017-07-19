<template>
  <div class="neighbor">
    <div class="page-item left" @click="preBlog" v-if="preId !== -1">
      <div class="item pre-item">&lt &nbspPre</div>
      <h3 class="title">{{preTitle}}</h3>
    </div>
    <div class="page-item right" @click="nextBlog" v-if="nextId !== -1">
      <div class="item next-item">Next&nbsp &gt</div>
      <h3 class="title">{{nextTitle}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    neighbor: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      preTitle: '',
      nextTitle: '',
      preId: -1,
      nextId: -1
    };
  },
  methods: {
    preBlog() {
      this.$router.push('/blog/' + this.preId);
      window.scrollTo(0, 0);
    },
    nextBlog() {
      this.$router.push('/blog/' + this.nextId);
      window.scrollTo(0, 0);
    }
  },
  watch: {
    neighbor: function(newValue, oldValue) {
      this.preTitle = newValue.pre.title;
      this.nextTitle = newValue.next.title;
      this.preId = newValue.pre._id;
      this.nextId = newValue.next._id;
    }
  }
};
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/wave.styl'
  h3
    margin 0
    padding 0
  .left
    float left
  .right
    float right
  .neighbor
    .page-item
      position relative
      wave(#00cfe1)
      user-select none
      margin-bottom 10px
      &:active
        transform scale(0.97)
      &:hover
        cursor pointer
      .title
        font-size 25px
        font-weight lighter
        color #00cfe1
        &:before
          content ''
          display table
          clear both
      .item
        position relative
        font-size 18px
        color #525151
      .pre-item
        float left
      .next-item
        float right
</style>
