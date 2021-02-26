 const marked = require('marked');

 module.exports = source => {
     const html = marked(source)
    // 返回 html 字符串交给下一个 loader 处理
    return html
 }