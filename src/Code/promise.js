
/* -------------------------------------------------------------------------- */
/*                                     第一题                                    */
/* -------------------------------------------------------------------------- */
console.log(1)
setTimeout(() => console.log(2), 1000)

const startMs = Date.now()
// eslint-disable-next-line no-empty
while (Date.now() - startMs < 2000) {}

console.log(3)

setTimeout(() => console.log(4))

new Promise((resolve, reject) => {
  console.log(5)
  foo.bar()
}).then(() => console.log(6)).catch(() => console.log(7)).then(() => console.log(8))

console.log(9)

/* -------------------------------------------------------------------------- */
/*                               第一题 end                                    */
/* -------------------------------------------------------------------------- */

// 1,3,5,9,7,8,2,4
