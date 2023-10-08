# 多文本收起展开

<Wrap>
  <LineClamp :lineClamp="2">
      浮动元素是如何定位的
      正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
      <a href="https://juejin.cn/post/6963904955262435336">实现方式</a>
  </LineClamp>
</Wrap>

<Wrap>

  `:lineClamp="3"`
  <LineClamp :lineClamp="3">
      浮动元素是如何定位的
      正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。
  </LineClamp>
</Wrap>

<Wrap>
  <LineClamp>
      浮动元素是如何定位的
  </LineClamp>
</Wrap>
