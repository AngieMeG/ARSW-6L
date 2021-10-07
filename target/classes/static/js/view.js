var view=(function(){
  
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
    
    let showBlueprintEditor = function(){
        let popup = document.getElementById("blueprintEditor");
        popup.classList.remove("hidden"); 
    }

    let _showPopup = function(){
        let popup = document.getElementById("Popup_window");
        popup.classList.remove("hidden"); 
    }

    let _hidePopup = function(){
        let popup = document.getElementById("Popup_window");
        popup.classList.add("hidden"); 
    }

    let _confirmPopup = function(){
        app.createBlueprint();
        _hidePopup();
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
        popupButton = document.getElementById("popup");
        popupClose = document.getElementById("close_popup");
        popupAccept = document.getElementById("accept_popup");
        

        saveButton.addEventListener("click", app.saveBlueprint);
        deleteButton.addEventListener("click", app.deleteBlueprint);
        popupButton.addEventListener("click", _showPopup);
        popupClose.addEventListener("click", _hidePopup);
        popupAccept.addEventListener("click", _confirmPopup);
        //Falta el delete
    }

    //returns an object with 'public' functions:
    return {
      //function to initialize application
        init: init,
        showBlueprintEditor: showBlueprintEditor
    };
    
})();
