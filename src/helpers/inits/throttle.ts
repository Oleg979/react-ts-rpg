export default (f: Function, ms: number): Function => {
    let isThrottled: boolean;
    let savedArgs: any;
    let savedThis: any;
  
    function wrapper(this: any) {
  
      if (isThrottled) { 
        savedArgs = arguments;
        savedThis = this;
        return;
      }
  
      f.apply(this, arguments); 
  
      isThrottled = true;
  
      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
  
    return wrapper;
}