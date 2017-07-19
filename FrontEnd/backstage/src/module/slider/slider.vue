<template>
  <div class="book-wrapper">
    <h3 class="title">Slider</h3>
    <div class="content">
      <ul class="my-ul">
        <li class="my-li" v-for="(item,index) in sliders" :key="index">
          <a :href="item.url" target="_blank">
            <h3 class="my-li-title">{{item.title}}</h3>
          </a>
          <div class="my-li-tools">
            <span class="edit tool" @click="showUpDateSlider(item)">更新</span>
            <span style="color:#dedede">&nbsp|&nbsp</span>
            <span class="delete tool" @click="deleteSlider(item._id, index)">删除</span>
          </div>
        </li>
      </ul>
      <div class="newcata" @click="showSlider()">新增幻灯片</div>
    </div>
    <pop-slider v-on:onUpDateSlider="upDateSlider" v-on:onAddSlider="addSlider" v-on:closeDialog="closeNewSlider" :isSliderShow="isSliderShow" :sliderProps="sliderProps"></pop-slider>
  </div>
</template>

<script>
import PoPSlider from '@/components/pop_slider/pop_slider';
export default {
  components: {
    'pop-slider': PoPSlider
  },
  data() {
    return {
      sliders: [],
      isSliderShow: false,
      sliderProps: {
        _id: -1,
        title: '',
        img: '',
        url: ''
      }
    };
  },
  methods: {
    showUpDateSlider(item) {
      this.sliderProps.img = item.img;
      this.sliderProps.url = item.url;
      this.sliderProps.title = item.title;
      this.sliderProps._id = item._id;
      this.isSliderShow = true;
    },
    showSlider() {
      this.isSliderShow = true;
    },
    closeNewSlider() {
      this.isSliderShow = false;
    },
    deleteSlider(_id, index) {
      let r = confirm('确认删除幻灯片？');
      if (!r) return;
      this.$http.post('/api/admin/slider/delete', { _id }).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          alert('幻灯片删除成功');
          this.sliders.splice(index, 1);
        } else {
          alert('幻灯片删除失败');
        }
      });
    },
    addSlider(data) {
      this.sliders.push(data);
    },
    upDateSlider(data) {
      let sliderIndex = -1;
      this.sliders.some((item, index) => {
        if (item._id === data._id) {
          sliderIndex = index;
          return true;
        }
      });
      sliderIndex !== -1 && this.sliders.splice(sliderIndex, 1, data);
    }
  },
  created() {
    this.$http.get('/api/public/slider.json').then((res) => {
      res = res.body;
      if (res.errno === this.ERR_OK) {
        this.sliders = res.data;
      } else {
        alert('幻灯片加载失败');
      }
    });
  }
};
</script>

<style scoped lang="stylus">
  a
    text-decoration none
  .book-wrapper
    box-sizing border-box
    .content
      background #fff
      border 1px solid rgba(117,117,117,0.3)
      border-radius 5px
      .my-ul
        height 320px !important
</style>