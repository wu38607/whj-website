<template>
  <my-dialog v-on:onclose="closeDialog" :isShow="isSliderShow">
    <div class="slider-wrapper">
      <my-imgUpload v-on:onImgChange="upLaodImg" :imgSrc="sliderData.img" :tip="'+添加封面'" :imgWidth="490" :imgHeight="150"></my-imgUpload>
      <div class="outer">
        <div class="content-wrapper">
          <span class="text">标题：</span>
          <input class="title" type="text" v-model="sliderData.title">
        </div>
        <div class="content-wrapper">
          <span class="text">链接：</span>
          <input class="title" type="text" v-model="sliderData.url">
        </div>
      </div>
      <div class="slider-tools">
        <span class="btn" @click="isNewSlider?submitSlider():updateSlider()">确定</span>
      </div>
    </div>
  </my-dialog>
</template>

<script>
import Dialog from '@/components/dialog/dialog';
import ImgUplaod from '@/components/img_upload/img_upload';
export default {
  props: {
    isSliderShow: {
      type: Boolean,
      default: false
    },
    sliderProps: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      sliderData: this.sliderProps
    };
  },
  computed: {
    isNewSlider() {
      return this.sliderData._id === -1;
    }
  },
  components: {
    'my-dialog': Dialog,
    'my-imgUpload': ImgUplaod
  },
  methods: {
    closeDialog() {
      this._clearPage();
      this.$emit('closeDialog');
    },
    upLaodImg(data) {
      this.$http.post('/api/admin/other/image/post', data).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          this.sliderData.img = res.data.url;
        }
      });
    },
    updateSlider() {
      this.$http.post('/api/admin/slider/post', this.sliderData).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          let data = this._copy(this.sliderData);
          alert('幻灯片更新成功');
          this.$emit('onUpDateSlider', data);
          this.closeDialog();
        } else {
          alert('幻灯片更新失败');
        }
      });
    },
    submitSlider() {
      this.$http.post('/api/admin/slider/post', this.sliderData).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          alert('幻灯片添加成功');
          let data = {
            _id: res.data._id,
            title: this.sliderData.title,
            url: this.sliderData.url,
            img: this.sliderData.img
          };
          this.$emit('onAddSlider', data);
          this.closeDialog();
        } else {
          alert('幻灯片添加失败');
        }
      });
    },
    _copy(obj) {
      let newobj = {};
      for (let attr in obj) {
        newobj[attr] = obj[attr];
      }
      return newobj;
    },
    _clearPage() {
      this.sliderData.img = '';
      this.sliderData.url = '';
      this.sliderData.title = '';
      this.sliderData._id = -1;
    }
  }
};
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/btn.styl' 
  .slider-wrapper
    position relative
    width 500px
    margin 0 auto
    .img-wrapper
      position relative
      display inline-block
      border-radius 3px
      margin 10px auto
      width 490px
      height 150px
      transition background .5s
      border 1px solid #dedede
      &:hover
        cursor pointer
        background #dedede
        .add-cover
          color #000
      &:active
        transform scale(0.99)
      img
        border none
        border-radius 3px
        width 100%
        height 100%
      .add-cover
        position absolute
        top 50%
        left 50%
        font-size 20px
        line-height 20px
        user-select none
        margin-left -48px
        margin-top -10px
        color #2b2626
        transition color .5s
    .outer
      position relative
      width 300px
      margin 0 auto
      .content-wrapper
        box-sizing border-box
        margin-bottom 10px
        :last-child
          margin 0
        .text
          font-size 20px
          line-height 22px
        .title
          width 200px
          font-size 16px
          line-height 25px
          padding 2px 
    .slider-tools
      text-align center
</style>
