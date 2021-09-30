var api = (function () {

    let mockdata = [];

    let _getMockData = function(uri, callback){
        $.getJSON(uri, function(data) { mockdata = data; callback(); } );
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
        }
    }

})();