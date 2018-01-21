### 优化法则：

减少访问 `DOM` 的次数，将更多的运算放在 `ECMAScript` 中运行。

```
  // 较差的写法
  function appendHTML (dom, data) {
    var length = data.length;
    var tmp;
    for (var i = length - 1; i--;) {
      tmp = '<div>' + data[i] + '</div>';
      dom.innerHTML += tmp;
    }
  }

  // 较好的写法
  function appendHTML (dom, data) {
    var length = data.length;
    var html = '';
    for (var i = length - 1; i--;) {
      html += '<div>' + data[i] + '</div>';
    }
    dom.innerHTML += html;
  }
```
---

`innerHTML` 和 `document.createElement()` 作为两种创建 `DOM` 的方法在性能上相差无几（在 webkit 浏览器中后者更快，其他浏览器中前者较快），不过后者是 `web` 标准。

---

创建新元素时，可以使用 `cloneNode()` 方法，它的速度会比 `document.createElement()` 更快一些，该方法还有一个参数(include_all)，用于控制复制的内容，如果指定为 `true` 则会复制当前节点及其后代节点，如果为 `false` 则仅复制当前节点，默认该值为 `false`。

---

`document.getElementsByClassName(), document.getElementsByName(), document.getElementsByTagName(), document.links, document.images, document.forms` 等方法都会返回一个 `HTML` 集合对象（`HTMLCollection`）,这个集合对象中保存的元素都是实时状态的，即如果元素状态改变了，集合中保存的对象也会实时同步。所以在操作这样一个集合对象时，最好将其缓存到一个数组中再进行操作，否则很容易出现性能问题。

---

当需要获取一个元素的子节点时，有 `element.childNodes` 和 `element.nextSibling` 两种方法，在老版本的浏览器中后者更快。

---

可以使用 `querySelectorAll()` 和 `querySelector()` 来获取页面 `DOM` 元素，前者返回的是一个 `NodeList` 对象，不同于 `HTMLCollection`，它保存的元素是非实时的。一般而言，用这两个 `API` 去获取元素，是简单和高效的，不过在使用时需要注意兼容性。

---

当页面所需的 `JS, HTML, CSS, 图片`等下载完之后，浏览器就会解析并生成两大内部数据结构，一个是 `DOM` 树，一个是渲染树。`DOM` 树就是根据 `HTML` 结构生成的树，而渲染树则是在 `DOM` 树上应用了样式的结果，它会隐藏 `display: none` 的节点，并且将节点理解为一个拥有外边距，边框，内边距，内容的一个盒子。一旦渲染树构建完成，浏览器就可以渲染页面了。

在改动样式的时候很容易引起页面的重排和重绘，修改的样式更改了元素的几何大小（或外边距，或内边距，或边框，或内容宽高），这个时候浏览器不得不重新计算页面的布局，这个过程就称之为重排，当重排过程完成后，浏览器需要再次将渲染树绘制到显示器，这个过程称之为重绘。重绘和重排都是非常耗时的行为，所以我们要尽量避免，当然有的时候是不可避免的，那我们要做的就是减少重排和重绘的次数。有以下行为会引起重排：

1. 添加或者删除页面可见的 `DOM` 元素。
2. 页面可见元素位置改变，尺寸改变，内容改变等一切影响元素几何大小的行为。
3. 浏览器尺寸的改变。

由于重排的会产生大量的计算消耗，所以现代浏览器中都会通过队列化修改并批量执行来优化这一过程。不过有一点需要注意的是，当我们去获取页面布局元素时，会导致浏览器的优化付诸东流，比如以下方法：

1. offset(Top | Right | Bottom | Left)
2. scroll(Top | Right | Bottom | Left)
3. client(Top | Right | Bottom | Left)
4. getComputedStyle() (currentStyle in IE)

因为这些元素需要实时的获取浏览器信息，所以会强制浏览器进行重排和重绘。所以可以做的一个优化就是当执行完所有样式改变之后再去获取上述信息。对于改变样式我们可以使用 `cssText({ })` 批量去改变从而降低重排次数，当然现在推荐的方式是为元素添加或者移除 `class`，从而实现样式和 `JS` 的分离。

当我们实现一个列表页，需要由 `AJAX` 获取数据实现分页功能时，经常需要在 `JS` 中创建 `DOM` 节点添加到列表节点的尾部，这个时候定然会引起页面的重排和重绘，不过我们可以通过一些技巧提升性能。

方法1：

1. 将节点的 `display` 属性设置为 `none`
2. 添加数据
3. 恢复节点的 `display` 为非 `none` 值。

缺点：列表页会短暂隐藏，这种方法虽然可以实现，但是不建议使用，因为会给用户很差的体验。

方法2：

1. 创建文档片断(document.createFragment())
2. 添加数据
3. 将文档片断添加到列表页的尾部(appendChild())

现在推荐使用的就是这种方式，因为这种方式产生的 `DOM` 遍历和重排次数最少。

方法3:

1. 使用 element.cloneNode(true) 将列表节点克隆下来
2. 添加数据
3. 用 element.parentNode.replaceChild(new, old) 替代老的列表节点

这种方法我没有尝试过，担心可能会出现页面闪烁的情况。

其实以上三种方法的核心思想就是以下三步：

1. 元素脱离文档
2. 添加数据
3. 将元素带回文档

---

当需要对节点执行动画时，最好将该节点脱离文档流，避免引起页面的重排和重绘。

---

对很大的表格元素，不要使用 :hover 选择器改变某一行节点的背景颜色，性能会降低。

---

多使用事件委托监听事件，可以在事件委托时设置 `stopPropagation()` 禁止事件再向上传递。
