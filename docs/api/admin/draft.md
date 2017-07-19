Draft API
===

``` javascript
requestUrl = '/api/admin/draft/get'
method = 'POST'

response = {
  errno: Number,
  data: [
    {
      _id: Number,
      name: String
    },
    {
      _id: Number,
      name: String
    }
  ]
}
```  
``` javascript
requestUrl = '/api/admin/draft/post'
method = 'POST'

request = {
  title: String,
  guide: String,
  md: String, // markdown 
}

response = {
  errno: Number,
  data: {
    _id: Number // new id
  }
}
```

``` javascript
requestUrl = '/api/admin/draft/update'
method = 'POST'

request = {
  _id: Number
  title: String,
  guide: String,
  md: String, // markdown 
}

response = {
  errno: Number
}
```

``` javascript
requestUrl = '/api/admin/draft/delete'
method = 'POST'

request = {
  _id: Number
}

response = {
  errno: Number
}
```

``` javascript
requestUrl = '/api/admin/draft/:id.json'
method = 'POST'

request = {
  _id: Number
}

response = {
  errno: Number
  data: {
    title: String,
    guide: String,
    md: String // markdown 
  }
}
```  