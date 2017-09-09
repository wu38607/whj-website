<template>
  <div class="cate-wrapper">
    <my-catelist :curIndex="curIndex" v-on:clickItem="goCategory" :allList="list" class="my-catelist"></my-catelist>
    <div class="right">
      <div class="blog-list">
        <my-blog :data="item" v-for="(item,index) in blogs" :key="index"></my-blog>
      </div>
      <my-pagenum :pageCount="pagecount" v-on:pageClick="goPage" class="my-pagenum"></my-pagenum>
    </div>
  </div>
</template>

<script>
import Pulldown from '@/components/pulldown/pulldown';
import BlogSheet from '@/components/blogSheet/blogSheet';
import Pagenum from '@/components/pagenum/pagenum';
import { eventBus } from '@/eventbus.js';
export default {
  components: {
    'my-catelist': Pulldown,
    'my-blog': BlogSheet,
    'my-pagenum': Pagenum
  },
  data() {
    return {
      list: [],
      blogs: [{
        title: '正在加载...',
        time: {
          year: 0,
          month: 0,
          day: 0
        }
      }],
      curIndex: 0,
      pagecount: 1
    };
  },
  methods: {
    goPage(page) {
      let start = page * 14;
      let length = 14;
      this.setBlogData(this.list[this.curIndex], start, length);
    },
    setBlogData(cateName, start, length) {
      this._getBlogSheetAsync(cateName, start, length, (data) => {
        this.pagecount = data.pagecount;
        let blogs = data.blogs;
        blogs = blogs.sort((v1, v2) => {
          return v2._id - v1._id;
        });
        this.blogs = blogs;
        this.changeCurIndex();
      });
    },
    goCategory(index) {
      this.$router.push('/category/' + this.list[index]);
    },
    _getBlogSheetAsync(cate, start, length, cb) {
      let data = {
        'name': cate,
        'range': {
          start,
          length
        }
      };
      this.$http.post('/api/public/blogsheet.json', data).then((response) => {
        response = response.body;
        if (response.errno === this.ERR_OK) {
          cb(response.data);
        }
      });
    },
    changeCurIndex() {
      let name = this.$route.params.name;
      this.list.some((item, index) => {
        if (item === name) {
          this.curIndex = index;
          return true;
        }
      });
    }
  },
  created() {
    eventBus.$emit('changeTitle', '目录');
    this.$http.get('/api/public/categories.json').then((response) => {
      response = response.body;
      if (response.errno === this.ERR_OK) {
        this.list = response.data.reverse();
        let name = this.$route.params.name;
        if (name === 'none') {
          name = this.list[0];
          this.$router.push('/category/' + name);
        } else {
          this.setBlogData(name, 0, 14);
        }
      } else {
        alert('分类加载失败');
      }
    });
  },
  watch: {
    '$route': function (newValue, oldValue) {
      let name = newValue.params.name;
      if (name === 'none') {
        this.$router.push('/category/' + this.list[0]);
      } else {
        this.setBlogData(name, 0, 14);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
  ul 
    padding 0
    margin 0
    list-style none
  .cate-wrapper
    box-sizing border-box
    max-width 900px
    &:after,&:before
      content ''
      display table
      clear both
    .right
      .blog-list
        display flex
        flex-wrap wrap
      .my-pagenum
        text-align center
  @media all and (min-width:750px)
    .my-catelist
      float left
    .right
      float right
      .blog-list
        width 630px
        justify-content space-between
  @media all and (max-width:750px)
    .my-catelist
      position relative
      margin 0 auto 20px
    .blog-list
      position relative
      justify-content space-around
      margin 0 auto
  @media all and (max-width:550px)
      .blog-list
        justify-content center !important
</style>
