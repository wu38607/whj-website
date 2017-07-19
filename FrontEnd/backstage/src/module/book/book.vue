<template>
  <div class="book-wrapper">
    <h3 class="title">Book</h3>
    <div class="content">
      <ul class="my-ul">
        <li class="my-li" v-for="(item,index) in books" :key="index">
          <a :href="`/book/${item.name}`" target="_blank">
            <h3 class="my-li-title">{{item.title}}</h3>
          </a>
          <div class="my-li-tools">
            <span class="edit tool" @click="editBook(index)">编辑</span>
          </div>
        </li>
      </ul>
      <div class="newcata" @click="refresh">刷新</div>
    </div>
    <my-editor :book="book" v-on:closeDialog="closeEdit" v-on:updated="updated" :isEditShow="isEditShow"></my-editor>
  </div>
</template>

<script>
import BookEdit from '@/components/pop_book/pop_book';
export default {
  components: {
    'my-editor': BookEdit
  },
  data() {
    return {
      books: [],
      isEditShow: false,
      book: {},
      bookIndex: -1
    };
  },
  created() {
    this.$http.get('/api/public/book.json').then((response) => {
      response = response.body;
      if (response.errno === this.ERR_OK) {
        this.books = response.data.reverse();
      } else {
        alert('书籍加载失败');
      }
    });
  },
  methods: {
    refresh() {
      this.$http.post('/api/admin/other/book/refresh').then((res) => {
        res = res.body;
        if (res.errno === 0) {
          alert('刷新成功');
          this.books = res.data;
        } else {
          alert('刷新失败');
        }
      });
    },
    updated(data) {
      console.log(data);
      this.books.splice(this.bookIndex, 1, data);
    },
    closeEdit() {
      this.isEditShow = false;
    },
    editBook(index) {
      this.book = this._copy(this.books[index]);
      this.bookIndex = index;
      this.isEditShow = true;
    },
    _copy(data) {
      let blog = {};
      for (let attr in data) {
        blog[attr] = data[attr];
      }
      return blog;
    }
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