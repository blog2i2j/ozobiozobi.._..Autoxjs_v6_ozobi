
module.exports = function(runtime, global){
    var floaty = {};

    floaty.window = function(xml){
        if(typeof(xml) == 'xml'){
            xml = xml.toXMLString();
        }
        let window;
         ui.run(()=>{
         window = wrap(runtime.floaty.window(function(context, parent){
                      runtime.ui.layoutInflater.setContext(context);
                      return runtime.ui.layoutInflater.inflate(xml.toString(), parent, true);
                 }));
         })
        return window;
    }

    floaty.rawWindow = function(xml){
        if(typeof(xml) == 'xml'){
            xml = xml.toXMLString();
        }
        let window;
        ui.run(()=>{
        window = wrap(runtime.floaty.rawWindow(function(context, parent){
             runtime.ui.layoutInflater.setContext(context);
             return runtime.ui.layoutInflater.inflate(xml.toString(), parent, true);
        }));
        })
        return window;
    }

    floaty.keepScreenOn = function(){
        runtime.floaty.keepScreenOn(true);
    };

    function wrap(window){
        var proxyObject = new com.stardust.autojs.rhino.ProxyJavaObject(global, window, window.getClass());
        var viewCache = {};
        proxyObject.__proxy__ = {
            set: function(name, value){
                window[name] = value;
            },
            get: function(name) {
               var value = window[name];
               if(typeof(value) == 'undefined'){
                   if(!value){
                        value = window.findView(name);
                   }
                   if(!value){
                      value = undefined;
                   }
               }
               return value;
            }
        };
        return proxyObject;
    }
    
    floaty.closeAll = runtime.floaty.closeAll.bind(runtime.floaty);

    floaty.checkPermission = runtime.floaty.checkPermission.bind(runtime.floaty);

    floaty.requestPermission = runtime.floaty.requestPermission.bind(runtime.floaty);

    return floaty;
}

