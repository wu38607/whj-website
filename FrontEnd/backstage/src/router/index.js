import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/page/home_page/home';
import BlogNew from '@/page/blog_new_page/blog_new';
import BlogUpdate from '@/page/blog_update_page/blog_update';
import DraftNew from '@/page/draft_new_page/draft_new';
import DraftUpdate from '@/page/draft_update_page/draft_update';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: Home
    },
    {
      path: '/admin/blog/:cate/new',
      name: 'newBlog',
      component: BlogNew
    },
    {
      path: '/admin/blog/:cate/:id',
      name: 'updateBlog',
      component: BlogUpdate
    },
    {
      path: '/admin/draft/new',
      name: 'newDraft',
      component: DraftNew
    },
    {
      path: '/admin/draft/:id',
      name: 'updateDraft',
      component: DraftUpdate
    }
  ]
});
