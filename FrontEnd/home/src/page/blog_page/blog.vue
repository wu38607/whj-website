<template>
  <div class="blog-wrapper">
    <div class="article-wrapper">
      <my-article class="my-article" :blog="blog"></my-article>
      <my-neighbor :neighbor="neighbor" class="my-neighbor"></my-neighbor>
    </div>
    <my-aside class="my-aside"></my-aside>
  </div>
</template>

<script>
import Article from '@/components/article/article';
import Neighbor from '@/components/neighbor/neighbor';
import Asidenav from '@/components/asidenav/asidenav';
import { eventBus } from '@/eventbus.js';
export default {
  components: {
    'my-article': Article,
    'my-neighbor': Neighbor,
    'my-aside': Asidenav
  },
  data() {
    return {
      blog: {
        article: '',
        time: {
          year: 0,
          month: 0,
          day: 0
        },
        category: ''
      },
      neighbor: {}
    };
  },
  methods: {
    setBlogAsync(id) {
      this.$http.get(`/api/public/blog/${id}.json`).then((response) => {
        response = response.body;
        if (response.errno === this.ERR_OK) {
          this.blog = response.data.blog;
          this.neighbor = response.data.neighbor;
          this.changeTitle(this.blog.title);
        }
      });
    },
    changeTitle(title) {
      eventBus.$emit('changeTitle', title);
    }
  },
  created() {
    this.changeTitle('文章加载中...');
    let id = this.$route.params.id;
    this.setBlogAsync(id);
  },
  watch: {
    '$route': function (newValue, oldValue) {
      let id = newValue.params.id;
      this.setBlogAsync(id);
    }
  }
};
</script>

<style scoped lang="stylus">
  .blog-wrapper
    max-width 1000px
    &:before,&:after
      content ''
      display table
      clear both
    .my-article
      margin-bottom 20px
    .my-aside
      position relative
      float right
      top 100px
      right 200px
  @media all and (min-width: 930px)
    .article-wrapper
      float left
      .my-article
        width 700px
  @media all and (max-width: 930px)
    .article-wrapper
      width 100%
      .my-article
        margin 20 auto
    .my-aside 
      display none
</style>
