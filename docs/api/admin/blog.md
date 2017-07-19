Blog API
===

``` javascript
requestUrl = '/api/admin/blog/post'
method = 'POST'

request = {
  title: String,
  guide: String,
  article: String, // html
  md: String, // markdown 
  category: String
}

response = {
  errno: Number
  data: {
    _id: Number,
  }
}
```

``` javascript
requestUrl = '/api/admin/blog/update'
method = 'POST'

request = {
  _id: Number
  title: String,
  guide: String,
  article: String, // html
  md: String, // markdown 
  category: String,
  pv: Number
}

response = {
  errno: Number,
  data: {
    _id: Number　// 更新id
  }
}
```
``` javascript
requestUrl = '/api/admin/blog/delete'
method = 'POST'

request = {
  _id: Number
}

response = {
  errno: Number
}
```

``` javascript
requestUrl = '/api/admin/category/post'
method = 'POST'

request = {
  name: String
}

response = {
  errno: Number
}
```  

``` javascript
requestUrl = '/api/admin/category/update'
method = 'POST'

request = {
  oldName: String,
  newName: String
}

response = {
  errno: Number
}
```  

``` javascript
requestUrl = '/api/admin/category/delete'
method = 'POST'

request = {
  name: String
}

response = {
  errno: Number
}
```