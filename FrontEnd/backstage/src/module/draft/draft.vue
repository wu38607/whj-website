<template>
  <div class="book-wrapper">
    <h3 class="title">Draft</h3>
    <div class="content">
      <ul class="my-ul">
        <li class="my-li" v-for="(item,index) in drafts" :key="index">
          <h3 class="my-li-title">{{item.title}}</h3>
          <div class="my-li-tools">
            <router-link tag="span" :to="{name:'updateDraft', params:{id:item._id}}" class="edit tool">编辑</router-link>
            <span style="color:#dedede">&nbsp|&nbsp</span>
            <span class="delete tool" @click="deleteDraft(item._id,index)">删除</span>
          </div>
        </li>
      </ul>
      <router-link tag="div" :to="{name:'newDraft'}" class="newcata">新增草稿</router-link>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventbus.js';
export default {
  data() {
    return {
      drafts: []
    };
  },
  methods: {
    deleteDraft(id, index) {
      this._delete(id, () => {
        alert('删除成功！');
        this.drafts.splice(index, 1);
      });
    },
    _delete(id, cb) {
      let data = {
        '_id': id
      };
      this.$http.post('/api/admin/draft/delete', data).then((res) => {
        res = res.body;
        if (res.errno === this.ERR_OK) {
          cb();
        } else {
          alert('删除失败');
        }
      });
    }
  },
  created() {
    this.$http.post('/api/admin/draft/get').then((res) => {
      res = res.body;
      if (res.errno === this.ERR_OK) {
        this.drafts = res.data;
      } else {
        alert('草稿箱加载失败');
      }
    });
    eventBus.$on('onNewDraftSave', (data) => {
      this.drafts.push(data);
    });
    eventBus.$on('onExistDraftSave', (data) => {
      let id = data._id;
      let draftIndex = '-1';
      this.drafts.some((item, index) => {
        if (item._id === id) {
          draftIndex = index;
          return true;
        }
      });
      draftIndex !== -1 && this.drafts.splice(draftIndex, 1, data);
    });
    eventBus.$on('onDeleteDraft', (data) => {
      let oldId = data._id;
      this._delete(oldId, () => {
        let draftIndex = '-1';
        this.drafts.some((item, index) => {
          if (item._id === oldId) {
            draftIndex = index;
            return true;
          }
        });
        draftIndex !== -1 && this.drafts.splice(draftIndex, 1);
      });
    });
  }
};
</script>

<style scoped lang="stylus">
  .book-wrapper
    box-sizing border-box
    .content
      background #fff
      border 1px solid rgba(117,117,117,0.3)
      border-radius 5px
      .my-ul
        height 320px !important
        .my-li
          h3
            &:hover
              cursor default !important
              text-decoration-line none !important
</style>