WebPage API
===

## 交互协议

``` javascript
requestUrl = '/api/public/sheet.json'

method = 'POST'

request = {
  data: {
    start: Number // 博客起始索引
    end: Number // 博客终止索引
  }
}

response = {
  errno: Number // err 1, no err 0
  blogs: [
        {
      id: Number,
      title: String,
      guide: String,
      time: {
        year: Number,
        month: Number,
        day: Number
      },
      pv: Number
      category: String
    }
  ]
}
```

``` javascript
requestUrl = '/api/public/pagecount.json'

method = 'GET'
// 默认10章分页
response = {
  errno: Number,
  pagecount: Number
}
```  

``` javascript
requestUrl = '/api/public/categories.json'

method = 'GET'

response = {
  errno: Number,
  data: [
    name: String,
    name: String
  ]
}
```

``` javascript
requestUrl = '/api/public/blogsheet.json'

method = 'POST'

request = {
  data: {
    name: String,
    range: {
      start: Number
      length: Number // -1 加载全部
    }
  }
}

response = {
  errno: Number,
  data: {
    pagecount: Number
    blogs: [ {
        title: String,
        _id: Number
        time: {
          year: Number,
          month: Number,
          day: Number
        }
      }]
  }
}
```

``` javascript
requestUrl = '/api/public/blog/${id}.json'

method = 'GET'

response = {
  errno: Number,
  data: {
    blog: {
      _id: Number,
      title: String,
      guide: String,
      article: String,
      md: String,
      time: {
        year: Number,
        month: Number,
        day: Number
      },
      pv: Number
      category: String
    },
    neighbor: {
      pre: {
        _id: Number, // -1 没有了
        title: String
      },
      next: {
        _id: Number, // -1 没有了
        title: String        
      }
    }
  }
}
```  

```javascript
requestUrl = '/api/public/book.json'

method = 'GET'

response = {
  errno: 0,
  data: [
    {
      name: String,
      title: String,
      guide: String,
      pv: Number,
      cover: String, //封面链接，默认空字符串
      time: {
        year: Number,
        month: Number,
        day: Number
      }
    }
  ]
}
```

```javascript
requestUrl = '/api/public/slider.json'

method = 'GET'

response = {
  errno: 0,
  data: [
    {
      img: String, // url
      title: String,
      url: String
    },
    {
      img: String, // url
      title: String,
      url: String
    }    
  ]
}
```
```javascript
requestUrl = '/api/login'

method = 'POST'

request = {
  username: String
  password: String
}

response = {
  errno: 0
}
```