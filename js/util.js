export default {
    // js设置rem大小
    setBodyFontSize: function() {
        var ready = false;
        function handler(){
            if(ready){
                console.log("ready:",ready)
                return;
            }
            // let clientWidth = document.body.clientWidth;
            let clientWidth = window.innerWidth;
            ready = true;
            console(((clientWidth/1337)*12).toString())
        }
        function handler2(){
            console.log("resize");
            console.log((window.innerWidth/1337)*12)
        }
        if(document.addEventListener) {
            document.addEventListener("DOMContentLoaded",handler,false);
            document.addEventListener("readystatechange",handler,false);
            window.addEventListener("load",handler,false);
            window.addEventListener("resize",handler2,false);
        }
        else if(document.attachEvent) {
            document.addEventListener("onreadystatechange",handler,false);
            window.attachEvent("onload",handler);
            console.log("attachEvent");
        }
    }
}