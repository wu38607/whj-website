<template>
  <my-dialog v-on:onclose="closeDialog" :isShow="isEditShow">
    <div class="book-wrapper">
      <textarea class="title title-hook" rows="1" v-model="book.title"></textarea>
      <div class="content-wrapper">
        <my-imgUpload class="imge" v-on:onImgChange="upLaodImg" :imgSrc="book.cover" :tip="'+添加封面'" :imgWidth="140" :imgHeight="168"></my-imgUpload>
        <textarea placeholder="输入导语..." rows="5" class="guide guide-hook" v-model="book.guide"></textarea>
      </div>
      <div class="book-tool">
        <span class="btn" @click="submit">确定</span>
      </div>
    </div>
  </my-dialog>
</template>

<script>
import Dialog from '@/components/dialog/dialog';
import ImgUplaod from '@/components/img_upload/img_upload';
export default {
  props: {
    isEditShow: false,
    book: {
      type: Object,
      default: () => {
        return {
          title: '',
          guide: '',
          cover: '',
          name: ''
        };
      }
    }
  },
  components: {
    'my-dialog': Dialog,
    'my-imgUpload': ImgUplaod
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
    upLaodImg(data) {
      this.$http.post('/api/admin/other/image/post', data).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          this.book.cover = res.data.url;
        } else {
          alert('图片加载失败');
        }
      });
    },
    submit() {
      this.$http.post('/api/admin/other/book/update', this.book).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          alert('更新成功');
          this.closeDialog();
          this.$emit('updated', this.book);
        } else {
          alert('更新失败');
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
  .book-wrapper
    text-align center
    .title
      text-align center
      font-size 25px
      line-height 25px
      margin 0
      padding 5px 0
      resize none
      border-radius 3px
    .content-wrapper
      margin 10px 0 0 0
      .img-wrapper
        vertical-align bottom
      .guide
        vertical-align bottom
        padding 0
        font-weight lighter
        height 167px
        width 500px
        resize none
        font-size 18px
        line-height 35px
    .book-tool
      margin 10px 0 0 0
</style>
