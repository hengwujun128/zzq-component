/**
 * Number(): 可以用于任何数据类型转换成数值；
 * parseInt()、parseFloat(): 专门用于把字符串转换成数值；
 *
 */
// 匹配 float [0-9]*.?[0-9]+, 小数部分只有一位
const floatRegexp = '[-+]?[0-9]*.?[0-9]+'

// 100px,100,100%
const types = [
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}px$`),
  },
  {
    name: '%',
    regexp: new RegExp(`^${floatRegexp}%$`),
  },
  /**
   * Fallback optopn
   * If no suffix specified, assigning "px"
   */
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}$`),
  },
]
// 值为字符串做判断,返回一个对象字面量
var getType = (value) => {
  if (value === 'auto') {
    return {
      type: value,
      value: 0,
    }
  }

  for (var i = 0; i < types.length; i++) {
    const type = types[i]
    // 进行正则匹配,返回一个对象
    if (type.regexp.test(value)) {
      return {
        type: type.name,
        value: parseFloat(value),
      }
    }
  }

  return {
    type: '',
    value: value,
  }
}

export const parse = (value) => {
  switch (typeof value) {
    case 'number':
      return {
        type: 'px',
        value,
      }
    case 'string':
      return getType(value)
    default:
      return {
        type: '',
        value,
      }
  }
}
// es6 module
export default parse
