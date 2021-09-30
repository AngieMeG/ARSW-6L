var app = (function () {
    
    let _authorName = "";
    let _blueprints = [];

    let getBlueprints= function() {
        return _blueprints;
    };

    let _generateBlueprintsTable = function(tableSelector,pointsSelector){
        let content = "Total points: " + _blueprints.reduce((previous, current) => {return previous + current.points.length}, 0)
        $(pointsSelector).text(content); 
        $(tableSelector+" tr:not(:first-child)").remove();
        $('#author_header').text(_authorName+"'s blueprints");
        _blueprints.map((item) => {
            let row = $("<tr></tr>");
            $("<td>"+item.name+"</td>").appendTo(row);
            $("<td>"+item.points.length+"</td>").appendTo(row);
            $('<td><input name="'+ item.name +'"type="button" value="Open" class="btn btn-secondary open_button"></td>').appendTo(row);
            row.appendTo(tableSelector);
        });
        
        for(let button of document.getElementsByClassName('open_button')){
            button.addEventListener('click',() => { drawBlueprint(button.name) });
        };
    };

    let drawBlueprint = function(name){
        $('#blueprint_header').text(name);
        apimock.getBlueprintsByNameAndAuthor(name, _authorName, _drawBlueprint);
    };

    let _drawBlueprint = function(event,blueprint){
        let first = true;
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext("2d");
        console.log(canvas.width, canvas.height);
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

    let setAuthorName = function(name,tableSelector,pointsSelector){
        _authorName = name;
        apimock.getBlueprintsByAuthor(name, _mapBlueprints);
        _generateBlueprintsTable(tableSelector,pointsSelector);
    };

    let _mapBlueprints = function(event, blueprints){
        _blueprints = blueprints.map((item) => { return { name: item.name, points: item.points }} );
    };

    return {
        setAuthorName: setAuthorName,
        getBlueprints: getBlueprints
    };

  })();