<template>
  <my-dialog v-on:onclose="closeDialog" :isShow="isCateShow">
    <div class="newcate">
      <span class="title">新增分类：</span>
      <input type="text" class="cate-name" v-model="cateName">
      <span class="btn" @click="submit">确认</span>
    </div>
  </my-dialog>
</template>

<script>
import Dialog from '@/components/dialog/dialog';
import { eventBus } from '@/eventbus.js';
export default {
  props: ['isCateShow'],
  components: {
    'my-dialog': Dialog
  },
  data() {
    return {
      cateName: '请输入分类名'
    };
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
    submit() {
      if (this.cateName === '') {
        alert('请输入分类名');
        return;
      }
      let data = {
        name: this.cateName
      };
      this.$http.post('/api/admin/category/post', data).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          eventBus.$emit('onAddCate', this.cateName);
          this.cateName = '请输入分类名';
          alert('新增分类成功');
          this.closeDialog();
        } else {
          alert('新增分类失败');
        }
      });
    }
  }
};
</script>

<style lang="stylus">
  .newcate
    position relative
    margin 10px auto
    text-align center
    .title
      font-size 20px
    .cate-name
      font-size 20px
      line-height 20px
      padding 3px
</style>
