var canvas=(function(){
  
    //private variables
    let canvas, context;
    
    let _getPos = function(el) {
        var rect=el.getBoundingClientRect();
        return {
            x: Math.round(rect.left), 
            y: Math.round(rect.top)
        };
    }

    let _savePoint = function(x,y){
        app.addNewPoint({x: x, y: y});
    }

    let init = function(){
            
        canvas = document.getElementById("canvas"), 
        context = canvas.getContext("2d");
        //if PointerEvent is suppported by the browser:
        if(window.PointerEvent) {
            canvas.addEventListener("pointerdown", function(event){
                let point = _getPos(canvas);
                _savePoint(event.pageX-point.x,event.pageY-point.y);    
            });
        }
        else {
            canvas.addEventListener("mousedown", function(event){
                let point = _getPos(canvas);
                _savePoint(event.pageX-point.x,event.pageY-point.y);  
            });
        }

        saveButton = document.getElementById("save");
        deleteButton = document.getElementById("delete");

        saveButton.addEventListener("click", app.saveBlueprint);
        deleteButton.addEventListener("click", app.deleteBlueprint);
        //Falta el delete
    }

    //returns an object with 'public' functions:
    return {
      //function to initialize application
        init: init
    };
    
})();
