/* eslint-disable */

/*
1.render 函数三个参数
2.  标记组件为 functional，这意味它是无状态 (没有响应式数据:data)，无实例 (没有 this 上下文)。
3. // 为了弥补缺少的实例; 提供第二个参数作为上下文
 */

/*
组件需要的一切都是通过context(上下文)传递，包括：

props：提供所有 prop 的对象
children: VNode 子节点的数组
slots: function returning a slots object
scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽以及函数形式的普通插槽的对象。
data： 传递给组件的数据对象，作为 createElement 的第二个参数传入组件
parent：对父组件的引用
listeners: (2.3.0+) 一个包含了所有在父组件上注册的事件侦听器的对象。这只是一个指向 data.on 的别名。
injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。
 */
export default {
  /*
   */
  functional: true,
  render(createElement, { props, data, children }) {
    let delay = props.delay || 250
    // 定义函数组件的根元素(容器组件)
    let tag = props.tag || "span"
    let animation = props.animation || "entranceFromRight"

    if (props.fromTop != undefined) animation = "entranceFromTop"
    if (props.fromRight != undefined) animation = "entranceFromRight"
    if (props.fromBottom != undefined) animation = "entranceFromBottom"
    if (props.fromLeft != undefined) animation = "entranceFromLeft"

    // children 为虚拟 dom:为每个虚拟 dom(item)添加staticStyle,添加staticClass 是固定写法
    if (children) {
      debugger
      children.forEach((child, index) => {
        // 每个子组件animationDelay 是不同的延迟时间是不同的
        child.data.staticStyle = {
          opacity: 0,
          // 在动画结束后，元素的样式设置为动画的最后一帧的样式
          animationFillMode: "forwards",
          // 控制动画延迟播放
          animationDelay: index * delay + "ms"
        }
        // 每个子组件的 class 是 扩写;而 style 不一样
        child.data.staticClass += " " + animation
      })
    }
    // 完全透明的传入任何特性、事件监听器、子结点等。
    return createElement(tag, children)
  }
}
