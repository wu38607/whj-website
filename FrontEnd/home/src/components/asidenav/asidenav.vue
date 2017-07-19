<template>
  <aside class="aside">
    <nav class="nav">
      <h4 v-show="isShowToc" class="toc">TOC</h4>
      <ol class="ol-list">
        <li class="nav-item" v-for="(parent,pindex) in topics" :key="pindex">
          <span class="text" :class="{on:parent.num === curIndex}" @click="goAnchor(parent.top)">
            <span>{{`${pindex+1}`}}</span>
            <span>{{parent.name}}</span>
          </span>
          <ol class="ol-list" v-if="parent.children.length>0">
            <li clas="nav-item" v-for="(child, cindex) in parent.children" :key="cindex">
              <span class="text" :class="{on:child.num === curIndex}" @click="goAnchor(child.top)">
                <span>{{`${pindex+1}.${cindex+1}`}}</span>
                <span>{{child.name}}</span>
              </span>
            </li>
          </ol>
        </li>
      </ol>
    </nav>
  </aside>
</template>

<script>
import { eventBus } from '@/eventbus.js';
export default {
  data() {
    return {
      topics: [],
      curIndex: 0
    };
  },
  computed: {
    isShowToc() {
      return this.topics.length > 0;
    }
  },
  methods: {
    goAnchor(top) {
      let nowTop = document.body.scrollTop;
      let step = (top - nowTop) / 20;
      let id = setInterval(() => {
        if (Math.abs(nowTop - top) < 15) {
          window.scrollTo(0, top);
          clearInterval(id);
        } else {
          nowTop += step;
          window.scrollTo(0, nowTop);
        }
      }, 10);
    },
    createNav(elArticle) {
      function Topic(name, top, num) {
        this.name = name;
        this.top = top;
        this.num = num;
        this.children = [];
      }
      Topic.prototype.addChild = function (name, top, num) {
        this.children.push(new Topic(name, top, num));
      };
      function calTop(el) {
        let parent = el.offsetParent;
        let top = el.offsetTop - el.scrollHeight - 10;
        while (parent) {
          top += parent.offsetTop;
          parent = parent.offsetParent;
        }
        return top;
      }
      let topics = [];
      this.topArr = [];
      for (let i = 0, num = 0, n = elArticle.children.length; i < n; i++) {
        let el = elArticle.children[i];
        let name = el.innerText;
        let tagName = el.tagName.toLowerCase();
        if (tagName === 'h1') {
          let top = calTop(el);
          topics.push(new Topic(name, top, num));
          num++;
          this.topArr.push(top);
        } else if (tagName === 'h2') {
          let top = calTop(el);
          topics[topics.length - 1].addChild(name, top, num);
          num++;
          this.topArr.push(top);
        }
      }
      this.topics = topics;
    }
  },
  mounted() {
    eventBus.$on('articleDone', this.createNav);
    window.addEventListener('scroll', () => {
      let curTop = document.body.scrollTop;
      if (navigator.userAgent.indexOf('Firefox') > -1) {
        curTop = document.documentElement.scrollTop;
      }
      for (let i = 0; i < this.topArr.length - 1; i++) {
        let height1 = this.topArr[i];
        let height2 = this.topArr[i + 1];
        if (height2 === undefined || (curTop >= height1 && curTop < height2)) {
          this.curIndex = i;
          return;
        }
      }
    });
  }
};
</script>

<style scoped lang="stylus">
  .on
    background #e8e8e8
    border-left 3px solid #00bcd4
    border-radius 1px
    color #00bcd4 !important
  .text
    display inline-block
    padding 1px 5px
    width 100%
    font-size 17px
    line-height 23px
    color #5d5a5a
    &:hover
      cursor pointer
      color #00bcd4
  .ol-list
    padding-left 20px
    margin 3px 0
    list-style none
    li
      color #5d5a5a
      padding 1px 0
  .aside
    max-width 300px
    .nav
      position fixed
      top 100px
      .toc
        margin 0 0 10px 18px
        color #727272
        font-size 17px
        font-weight 600
</style>
