Slider API
===

``` javascript
requestUrl = '/api/admin/slider/delete'
method = 'POST'

request = {
  _id: Number
}

response = {
  errno: Number
}
```

``` javascript
requestUrl = '/api/admin/slider/post'
method = 'POST'

request = {
  img: String, // name
  title: String,
  url: String
}

response = {
  errno: Number,
  data: {
    _id: Number
  }
}
```
