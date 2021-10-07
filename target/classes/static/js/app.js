var app = (function () {
    
    let _authorName = "";
    let _blueprints = [];
    let _provider = api;
    let _isAPIProvider = true;
    let _currentBlueprint = {};
    let _newPoints = 0;

    let _setTotalPoints = function(){
        let content = "Total points: " + _blueprints.reduce((previous, current) => {return previous + current.points.length}, _newPoints)
        $('#total_points').text(content); 
    }

    let _generateBlueprintsTable = function(){
        _setTotalPoints();
        $("#blueprints_table"+" tr:not(:first-child)").remove();
        $('#author_header').text(_authorName+"'s blueprints");
        _blueprints.map((item) => {
            let row = $("<tr></tr>");
            $("<td>"+item.name+"</td>").appendTo(row);
            $("<td>"+item.points.length+"</td>").appendTo(row);
            $('<td><input name="'+ item.name +'"type="button" value="Open" class="btn btn-secondary open_button"></td>').appendTo(row);
            row.appendTo("#blueprints_table");
        });
        
        for(let button of document.getElementsByClassName('open_button')){
            button.addEventListener('click',() => { _currentBlueprint = button.name; drawBlueprint(button.name) });
        };
    };

    let _setCurrentBlueprint = function(event,blueprint){
        _currentBlueprint = blueprint;
        _drawBlueprint(null,_currentBlueprint);
    }

    let _drawBlueprint = function(event,blueprint){
        let first = true;
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for(let point of blueprint.points){
            if (first) {
                ctx.moveTo(point.x, point.y);
                first = false;
            }
            else {
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
        };
    };

    let _mapBlueprints = function(event, blueprints){
        _blueprints = blueprints.map((item) => { return { name: item.name, points: item.points }} );
        _generateBlueprintsTable();
    };

    let changeProvider = function(){
        if(_isAPIProvider) _provider = _provider;
        else _provider = api;
        _isAPIProvider = !_isAPIProvider;
    }

    let setAuthorName = function(name){
        _authorName = name;
        _provider.getBlueprintsByAuthor(name, _mapBlueprints);
        view.showBlueprintEditor();
    };

    let getBlueprints = function() {
        return _blueprints;
    };

    let addNewPoint = function(coord){
        _newPoints += 1;
        _currentBlueprint.points.push(coord);
        _drawBlueprint(null,_currentBlueprint);
        _setTotalPoints();
    }

    let drawBlueprint = function(name){
        _newPoints = 0;
        _setTotalPoints();
        $('#blueprint_header').text(name);
        _provider.getBlueprintsByNameAndAuthor(name,_authorName, _setCurrentBlueprint);
    };

    let createNewBlueprint = function(){
        _currentBlueprint = {};
        _currentBlueprint["author"] = _authorName;
        _currentBlueprint["name"] = document.getElementById("newBlueprint_name").value;
        _currentBlueprint["points"] = [];
        _currentBlueprint["isNew"] = true;
        saveBlueprint();
    }

    let _redrawAll = function(){
        setAuthorName(_authorName);
        drawBlueprint(_currentBlueprint.name);
    }

    let saveBlueprint = function() {
        if (_currentBlueprint.isNew){
            console.log(_currentBlueprint);
            let newBlueprint = { author: _currentBlueprint.author, points: _currentBlueprint.points, name: _currentBlueprint.name };
            api.createBlueprint(newBlueprint, _redrawAll);
        }else{
            console.log('here');
            api.updateBlueprint(_authorName+"/"+_currentBlueprint.name, _currentBlueprint, _redrawAll);
        }
    }

    let deleteBlueprint = function() {
        api.deleteBlueprint(_authorName+"/"+_currentBlueprint.name, () => {setAuthorName(_authorName);});
    }

    return {
        setAuthorName: setAuthorName,
        getBlueprints: getBlueprints,
        changeProvider: changeProvider,
        addNewPoint: addNewPoint,
        createBlueprint: createNewBlueprint,
        saveBlueprint: saveBlueprint,
        deleteBlueprint: deleteBlueprint
    };

})();