# Change Log
## 1.0.0
修改了componentsItem.js文件，实现了以下功能：

- 添加了getFirstLineTitle函数，用于读取md文件的第一行内容作为标题
- 修改了目录和文件的处理逻辑，现在会自动读取对应md文件的第一行作为标题
- 对于目录类型的组件，会读取index.md的第一行作为标题
- 对于单文件类型的组件，直接读取对应md文件的第一行作为标题
- 如果无法读取文件或获取标题，会使用原始文件名作为标题