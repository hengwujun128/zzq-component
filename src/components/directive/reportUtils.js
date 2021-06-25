/**
 * 
 * @description this ia a report class
 * @export
 * @class ReportUtil
 */
export default class ReportUtil {
  /* 实例属性 */
  wrapper
  publicData
  observer 
  observerOptions = {
    root: null,
    rootMargin: '-60px'
  }
  
  constructor(wrapper,...rest) {
    this.wrapper = wrapper;
    this.queue = []; // collect report Data
    this.init();
  }

  init() {
    if (IntersectionObserver) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) =>{
          this.reportHandler(entry)
        })
      },{...this.observerOptions,root: this.wrapper})
    }
  }
  add(el, binding) {
    this.publicData = binding.value?.public
    this.observer && this.observer.observe(el)
  }
}
