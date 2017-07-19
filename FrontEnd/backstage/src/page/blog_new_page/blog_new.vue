<template>
  <my-editor :blogProp="blog" v-on:onDataCahnge="upDateBlog">
    <div class="tools">
      <span class="btn" @click="submit">发布</span>
      <span class="btn" @click="save">保存</span>
    </div>
  </my-editor>
</template>

<script>
import Editor from '@/components/editor/editor';
import { eventBus } from '@/eventbus.js';
export default {
  name: 'Blog_New',
  components: {
    'my-editor': Editor
  },
  data() {
    return {
      blog: {
        title: '',
        guide: '',
        article: '', // html
        md: '', // markdown
        category: this.$route.params.cate
      }
    };
  },
  methods: {
    submit() {
      if (this.blog.title === '') {
        alert('请输入标题');
        return;
      }
      this.$http.post('/api/admin/blog/post', this.blog).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          let data = {
            _id: res.data._id,
            title: this.blog.title
          };
          alert('上传成功！');
          eventBus.$emit('onBlogNew', data);
          this.$router.push('/admin');
        } else {
          alert('上传失败！');
        }
      });
    },
    save() {
      this.$http.post('/api/admin/draft/post', this.blog).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          let draftData = {
            _id: res.data._id,
            title: this.blog.title
          };
          eventBus.$emit('onNewDraftSave', draftData);
          alert('保存成功！');
          this.$router.push('/admin');
        } else {
          alert('保存失败');
        }
      });
    },
    upDateBlog(data) {
      this.blog = data;
    }
  },
  mounted() {
    eventBus.$emit('changeTitle');
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
