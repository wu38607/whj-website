<template>
  <my-editor :blogProp="blog" v-on:onDataCahnge="upDateBlog">
    <div class="tools">
      <span class="btn" @click="submit">发布</span>
      <span class="btn" @click="save">保存</span>
    </div>
    <my-dialog v-on:onclose="closeDialog" :isShow="isCateShow">
      <div class="cate-wrapper">
        <span class="cate-tip">目录分类:</span>
        <my-select v-on:onItemChange="onItemChange" class="my-select" :list="catelog"></my-select>
        <span class="btn cate-ok" @click="submitDraft">确定</span>
      </div>
    </my-dialog>
  </my-editor>
</template>

<script>
import { eventBus } from '@/eventbus.js';
import Editor from '@/components/editor/editor';
import Dialog from '@/components/dialog/dialog';
import Select from '@/components/beauty_select/beauty_select';
export default {
  name: 'Draft_update',
  components: {
    'my-editor': Editor,
    'my-dialog': Dialog,
    'my-select': Select
  },
  data() {
    return {
      blog: {
        title: '',
        guide: '',
        article: '', // html
        md: '', // markdown
        category: this.curCate
      },
      isCateShow: false,
      catelog: [],
      curCate: -1
    };
  },
  methods: {
    submitDraft() {
      if (this.blog.title === '') {
        alert('请输入标题');
        return;
      };
      this.blog.category = this.curCate;
      this.$http.post('/api/admin/blog/post', this.blog).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          let data = {
            '_id': res.data._id,
            'title': this.blog.title
          };
          alert('上传成功！');
          console.log(this.$route.params.id);
          eventBus.$emit('onDeleteDraft', { '_id': this.$route.params.id });
          eventBus.$emit('onBlogNew', data, this.curCate);
          this.closeDialog();
          this.$router.push('/admin');
        } else {
          alert('上传失败！');
        }
      });
    },
    submit() {
      this._setCateAsync(() => {
        this.isCateShow = true;
      });
    },
    save() {
      this.blog._id = this.$route.params.id;
      this.$http.post('/api/admin/draft/update', this.blog).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          eventBus.$emit('onExistDraftSave', this.blog);
          alert('保存成功！');
          this.$router.push('/admin');
        } else {
          alert('保存失败');
        }
      });
    },
    upDateBlog(data) {
      this.blog = data;
    },
    _setCateAsync(cb) {
      this.$http.get('/api/public/categories.json').then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          let data = res.data;
          this.catelog = [];
          data.forEach((item, index) => {
            this.catelog.push(item);
          });
          cb();
        } else {
          alert('目录请求失败');
        }
      });
    },
    closeDialog() {
      this.isCateShow = false;
    },
    onItemChange(index) {
      this.curCate = this.catelog[index];
    }
  },
  mounted() {
    eventBus.$emit('changeTitle');
    let id = this.$route.params.id;
    this.$http.post(`/api/admin/draft/${id}.json`).then((res) => {
      res = res.body;
      if (res.errno === this.ERR_OK) {
        let draft = res.data;
        this.blog.title = draft.title;
        this.blog.md = draft.md;
        this.blog.guide = draft.guide;
      }
    });
  }
};
</script>

<style lang="stylus">
  .editor
    z-index 0 !important
    margin 10px auto 0
    height 600px  
    max-width 1360px
  .tools
    display flex
    flex-direction row
    justify-content space-between
    margin 30px auto
    width 150px
</style>
