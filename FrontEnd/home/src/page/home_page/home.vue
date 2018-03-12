<template>
  <div class="home-wrapper">
    <my-slider v-on:clickImg="goUrl" :sliders="sliders" :inv="4000" class="my-slider"></my-slider>
    <ul>
      <li class="blog-item" v-for="(blog,index) in blogs" :key="index">
        <my-sheet :blog="blog" class="my-sheet"></my-sheet>
      </li>
    </ul>
    <my-pagenum :pageCount="pagecount" v-on:pageClick="goPage" class="my-pagenum"></my-pagenum>
  </div>
</template>

<script>
import Sheet from '@/components/sheet/sheet';
import Slider from '@/components/slider/slider';
import Pagenum from '@/components/pagenum/pagenum';
import { eventBus } from '@/eventbus.js';
import { personConfig } from '@/../config_person.js';
export default {
  components: {
    'my-sheet': Sheet,
    'my-slider': Slider,
    'my-pagenum': Pagenum
  },
  data() {
    return {
      blogs: [],
      sliders: [
        {
          img: require('../../../static/img/slider_default.png'),
          title: personConfig.title,
          url: '/'
        }
      ],
      pagecount: 1
    };
  },
  methods: {
    goUrl(index) {
      console.log(this.sliders[index].url);
      let url = this.sliders[index].url.replace(/https:\/\/www.wuhongjiang.com|http:\/\/www.wuhongjiang.com/, '');
      console.log(url);
      this.$router.push(url);
    },
    goPage(page) {
      let start = page * 10;
      let length = 10;
      this.getSheetAsync(start, length, (data) => {
        data = data.sort((v1, v2) => {
          return v2._id - v1._id;
        });
        this.blogs = data;
        window.scrollTo(0, 0);
      });
    },
    getSheetAsync(start, length, cb) {
      let data = {
        'start': start,
        'length': length
      };
      this.$http.post('/api/public/sheet.json', data).then((response) => {
        response = response.body;
        if (response.errno === this.ERR_OK) {
          cb(response.blogs);
        } else {
          alert('博文加载失败。');
        }
      });
    }
  },
  mounted() {
    eventBus.$emit('changeTitle', personConfig.title);
    this.getSheetAsync(0, 10, (data) => {
      data = data.sort((v1, v2) => {
        return v2._id - v1._id;
      });
      this.blogs = data;
    });
    this.$http.get('/api/public/pagecount.json').then((response) => {
      response = response.body;
      if (response.errno === this.ERR_OK) {
        this.pagecount = response.pagecount;
      }
    });
    this.$http.get('/api/public/slider.json').then((res) => {
      res = res.body;
      if (res.errno === this.ERR_OK) {
        let data = res.data;
        if (data.length > 0) {
          data.forEach((item, index) => {
            item.img = item.img === '' ? require('../../../static/img/slider_default.png') : item.img;
          });
          this.sliders = res.data;
        }
      } else {
        alert('幻灯片加载失败');
      }
    });
  }
};
</script>

<style scoped lang="stylus">
  ul
    list-style none
    margin 0
    padding 0
  .home-wrapper
    max-width 980px
    .my-slider
      margin-bottom: 20px
  .blog-item
    margin-bottom 20px
  .my-pagenum
    margin 30px auto
    text-align center
</style>
