var api = (function () {

    var mockdata = [];

    let _getMockData = async function(uri){
        await $.getJSON(uri, (data) => { mockdata = data; });
    }

    return {

        getBlueprintsByAuthor: function(author, callback) {
            _getMockData("localhost:8080/blueprints/"+author);  
            callback(null, mockdata[author]);
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            _getMockData("localhost:8080/blueprints/"+author+"/"+name);
            blueprint = mockdata[author].find(function(blueprint) {
                return blueprint.name == name
            });
            callback(null, blueprint);
        },

        test: _getMockData
    }

})();