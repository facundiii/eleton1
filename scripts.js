window.parent.postMessage({ action: "ready" }, "*");  

window.console = new Proxy(console, {  
  get(target, prop) {  
    if (["log", "warn", "error"].includes(prop)) {  
      return new Proxy(target[prop], {  
        apply(fn, thisArg, args) {  
          fn.apply(thisArg, args);  
          window.parent.postMessage(  
            {  
              action: "console",  
              type: prop,  
              args: args.map((arg) => {  
                try {  
                  return JSON.stringify(arg).replace(/^["']|["']$/g, "");  
                } catch (e) {  
                  return arg;  
                }  
              }),  
            },  
            "*"  
          );  
        },  
      });  
    }  
    return target[prop];  
  },  
});