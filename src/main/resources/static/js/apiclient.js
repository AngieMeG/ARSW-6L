var api = (function () {

    let mockdata = [];

    let _getMockData = function(uri, callback){
        $.getJSON(uri, function(data) { mockdata = data; callback(); } );
    }

    let _postMockData = function(data){
        return $.ajax({
            url: "http://localhost:8080/blueprints",
            type: 'POST',
            data: data,
            contentType: "application/json",
            error: function(req, err){ console.log('Error: ' + err); }
        });
    }

    let _putMockData = function(resource, data){
        return $.ajax({
            url: "http://localhost:8080/blueprints/"+resource,
            type: 'PUT',
            data: data,
            contentType: "application/json",
            error: function(req, err){ console.log('Error: ' + err); }
        });
    }

    let _deleteMockData = function(resource){
        return $.ajax({
            url: 'http://localhost:8080/blueprints/'+resource,
            type: 'DELETE',
        });
    }

    return {

        getBlueprintsByAuthor: function(author, callback) {
            _getMockData("http://localhost:8080/blueprints/"+author, function(data){
                callback(null, mockdata);
            });    
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            _getMockData("http://localhost:8080/blueprints/"+author+"/"+name, function(){
                callback(null, mockdata);
            });
        },

        createBlueprint: function(data,callback){

            _postMockData(JSON.stringify(data)).then(callback);
        },

        updateBlueprint: function(resource,data,callback){
            _putMockData(resource,JSON.stringify(data)).then(callback);
        },

        deleteBlueprint: function(resource,callback){
            _deleteMockData(resource).then(callback);
        }
    }

})();
