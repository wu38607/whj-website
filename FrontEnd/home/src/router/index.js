import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/page/home_page/home.vue';
import Category from '@/page/category_page/category';
import Blog from '@/page/blog_page/blog';
import Book from '@/page/book_page/book';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/category/:name',
      name: 'category',
      component: Category
    }, {
      path: '/blog/:id',
      name: 'blog',
      component: Blog
    }, {
      path: '/catalog/book',
      name: 'book',
      component: Book
    }
  ]
});
