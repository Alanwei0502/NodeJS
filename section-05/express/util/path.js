const path = require('path');

module.exports = path.dirname(require.main.filename); // 因為現在專案是把所有課程檔案都放在一起，所以無法使用這個方式
