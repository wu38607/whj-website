<template>
  <div>
    <ul class="book-ul">
      <li class="book-li" v-for="(item,index) in books" :key="index">
        <my-book class="my-book" :book="item"></my-book>
      </li> 
    </ul>
  </div>
</template>

<script>
import Book from '@/components/booksheet/booksheet';
import { eventBus } from '@/eventbus.js';
export default {
  components: {
    'my-book': Book
  },
  data() {
    return {
      books: [
        {
          _id: -1,
          title: '正在加载...',
          guide: '',
          pv: 0,
          cover: '',
          time: {
            year: 0,
            month: 0,
            day: 0
          }
        }
      ]
    };
  },
  created() {
    eventBus.$emit('changeTitle', 'book');
    this.$http.get('/api/public/book.json').then((response) => {
      response = response.body;
      if (response.errno === this.ERR_OK) {
        this.books = response.data.reverse();
      } else {
        alert('书籍加载失败');
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
  .book-ul
    max-width 750px
    margin 0 auto
    .book-li
      margin-bottom 20px
      :last-child
        margin-bottom 0
</style>
