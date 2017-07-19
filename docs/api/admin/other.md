Ohter API
===

``` javascript
requestUrl = '/api/admin/other/pv.json'
method = 'POST'

response = {
  errno: Number,
  data: [
    todaypv: Number
    totalpv: Number
  ]
}
```

``` javascript
requestUrl = '/api/admin/other/image/post'
method = 'POST'

request = {
  image: FormData
}

response = {
  errno: Number,
  data: {
    url: String // name
  }
}
```

``` javascript
requestUrl = '/api/admin/other/authority'
method = 'POST'

response = {
  errno: Number
}
```

``` javascript
requestUrl = '/api/admin/other/book/update'
method = 'POST'

request = {
  name: String,
  title: String,
  guide: String,
  cover: String, //封面链接
}

response = {
  errno: Number
}
```

``` javascript
requestUrl = '/api/admin/other/book/refresh'
method = 'POST'

response = {
  errno: Number,
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