<template>
  <div class="img-wrapper img-hook" @click="clickInput">
    <img :src="imgSrc" />
    <span v-show="isTipShow" class="add-cover">{{tip}}</span>
    <input type="file" style="display:none" id="elInput" @change="upLoadImg">
  </div>
</template>

<script>
export default {
  props: {
    imgWidth: {
      type: Number,
      default: 0
    },
    imgHeight: {
      type: Number,
      default: 0
    },
    tip: {
      type: String,
      default: '+添加图片'
    },
    imgSrc: {
      type: String,
      default: ''
    }
  },
  computed: {
    isTipShow() {
      return this.imgSrc === '';
    }
  },
  methods: {
    clickInput() {
      document.getElementById('elInput').click();
    },
    upLoadImg(event) {
      let files = event.target.files;
      if (!/image/.test(files[0].type)) {
        return;
      }
      var form = new FormData();
      form.append('image', files[0]);
      this.$emit('onImgChange', form);
    }
  },
  mounted() {
    let el = document.getElementsByClassName('img-hook')[0];
    el.style.width = this.imgWidth + 'px';
    el.style.height = this.imgHeight + 'px';
  }
};
</script>

<style scoped lang="stylus">
  .img-wrapper
    position relative
    display inline-block
    border-radius 3px
    margin 0px auto
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
</style>
