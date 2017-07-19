数据库设计
===

## UID
```javascript
{
  uid: Number
}
```

## 博客
```javascript
{
  _id: Number,
  title: String,
  guide: String,
  article: String, // html
  md: String, // markdown 
  time: {
    year: Number,
    month: Number,
    day: Number
  },
  pv: Number
  category: String
}
```  

## 目录  
```javascript
{
  name: String
  blogs: [
    id: Number,
    id: Number
  ]
}
```  

## book  
```javascript
{
  name: String // 英文名称　索引
  title: String,
  guide: String,
  pv: Number,
  cover: String, //封面链接
  time: {
    year: Number,
    month: Number,
    day: Number
  }
}
```  

## draft
```javascript
{
  _id: Number,
  title: String,
  guide: String,
  md: String,
  time: {
    year: Number,
    month: Number,
    day: Number
  }
}
```  
## slider
```javascript
{
  _id: Number
  img: String, // url
  title: String,
  url: String
}
```

## pv
```javascript
{
  _id: 0
  totalpv: Number
}
```