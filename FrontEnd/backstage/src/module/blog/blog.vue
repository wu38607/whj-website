<template>
  <div class="blog-wrapper">
    <h3 class="title">Blog</h3>
    <div class="content">
      <aside class="catalog">
        <ul class="cata-ul">
          <li class="cata-li ellipsis" :class="{on:cataIndex === index}" @click="setBlog(index)" v-for="(item,index) in catalog" :key="index">{{item}}</li>
        </ul>
        <div class="newcata" @click="showCate">新增分类</div>
      </aside>
      <div class="detail">
        <div class="cata-title">
          <h3>{{catalog[cataIndex]}}</h3>
          <span @click="deleteCate(catalog[cataIndex])"  v-show="isCate" class="delete tool">删除</span>
        </div>
        <div class="article-list">
          <ul class="my-ul">
            <li class="my-li" v-for="(item,index) in blogs" :key="index">
              <a :href="`/blog/${item._id}`" target="_blank">
                <h3 class="my-li-title">{{item.title}}</h3>
              </a>
              <div class="my-li-tools">
                <router-link :to="{name:'updateBlog',params: {cate:catalog[cataIndex],id:item._id}}" class="edit tool">编辑</router-link>
                <span style="color:#dedede">&nbsp|&nbsp</span>
                <span class="delete tool"  @click="deleteBlog(item._id,index)">删除</span>
              </div>
            </li>
          </ul>
          <router-link tag="div" :to="{name:'newBlog',params:{cate:catalog[cataIndex]}}" class="newcata">新增文章</router-link>
        </div>
      </div>
    </div>
    <new-cate v-on:closeDialog="closeNewCate" :isCateShow="isCateShow"></new-cate>
  </div>
</template>

<script>
import { eventBus } from '@/eventbus.js';
import NewCate from '@/components/new_cate/category';
export default {
  components: {
    'new-cate': NewCate
  },
  data() {
    return {
      catalog: [],
      blogs: [],
      cataIndex: 0,
      isCateShow: false
    };
  },
  computed: {
    isCate() {
      return this.catalog.length > 0;
    }
  },
  methods: {
    closeNewCate() {
      this.isCateShow = false;
    },
    getBlogSheetAsync(cate, cb) {
      let data = {
        'name': cate,
        'range': {
          'start': 0,
          'length': -1
        }
      };
      this.$http.post('/api/public/blogsheet.json', data).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          cb(res.data);
        } else {
          alert('博客加载失败或没有博客');
        }
      });
    },
    setBlog(index) {
      let name = this.catalog[index];
      this.getBlogSheetAsync(name, (data) => {
        this.blogs = data.blogs;
        this.cataIndex = index;
      });
    },
    showCate() {
      this.isCateShow = true;
    },
    deleteBlog(id, index) {
      var r = confirm('确认删除？');
      if (r) {
        let data = {
          _id: id
        };
        this.$http.post('/api/admin/blog/delete', data).then((res) => {
          res = res.body;
          if (res.errno === this.ERR_OK) {
            alert('删除成功');
            this.blogs.splice(index, 1);
          } else {
            alert('删除失败');
          }
        });
      }
    },
    deleteCate(cataName) {
      let data = {
        name: cataName
      };
      var r = confirm('请先删除博客？');
      if (r) {
        this.$http.post('/api/admin/category/delete', data).then((res) => {
          res = res.body;
          if (res.errno === this.ERR_OK) {
            alert('删除成功');
            this.catalog.splice(this.cataIndex, 1);
            this.setBlog(this.cataIndex);
          } else {
            alert('删除失败');
          }
        });
      }
    }
  },
  created() {
    eventBus.$on('onAddCate', (data) => {
      this.catalog.push(data);
    });
    eventBus.$on('onBlogNew', (data, cateName = this.catalog[this.cataIndex]) => {
      if (cateName === this.catalog[this.cataIndex]) {
        this.blogs.push(data);
      } else {
        let cateIndex = -1;
        this.catalog.some((item, index) => {
          if (item === cateName) {
            cateIndex = index;
            return true;
          }
        });
        this.setBlog(cateIndex);
      }
    });
    eventBus.$on('onBlogUpdate', (data) => {
      let oldId = data.oldId;
      let blogIndex = -1;
      this.blogs.some((item, index) => {
        if (item._id === oldId) {
          blogIndex = index;
          return true;
        }
      });
      blogIndex !== -1 && this.blogs.splice(blogIndex, 1, data.blog);
    });
    this.$http.get('/api/public/categories.json').then((res) => {
      res = res.body;
      if (res.errno === this.ERR_OK) {
        this.catalog = res.data;
        this.getBlogSheetAsync(this.catalog[0], (data) => {
          this.blogs = data.blogs;
          this.cataIndex = 0;
        });
      } else {
        alert('目录请求失败');
      }
    });
  }
};
</script>

<style scoped lang="stylus">
  a
    text-decoration none

  .blog-wrapper
    box-sizing border-box
    .content
      display flex
      flex-direction row
      flex-wrap nowrap
      .catalog
        flex-basis 150px
        max-height 350px
        margin-right 1px
        max-width 150px
        border 1px solid rgba(117,117,117,0.3)
        border-radius 5px
        background #fff
        .cata-ul
          overflow-y scroll
          text-align center
          max-height 320px
          min-height 320px
          overflow-y  scroll
          .on
             color #00cfe1 !important
          .cata-li
            font-size 18px
            line-height 36px
            border-bottom 1px solid rgba(117,117,117,0.3)
            user-select none
            color #2d2929
            &:hover
              cursor pointer
              background #dedede
              color #00cfe1
      .detail
        flex 1
        border-radius 5px
        margin-left 1px
        height 350px
        border 1px solid rgba(117,117,117,0.3)
        background #fff
        .cata-title
          padding 3px
          border-bottom 1px solid #000
          h3
            display inline-block
            font-size 20px
            font-weight normal
</style>