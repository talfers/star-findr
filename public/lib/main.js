var n = $('#pod').children().length;

var seeMore = function(results){
    $(document).ready(function(){
        console.log(n)
        var query = $('#query').attr('data-query');
        console.log(query);
        axios.get('https://images-api.nasa.gov/search?q=' + query)
        .then(function(response){
            var data = response.data.collection.items;
            data.slice(n, n + 15).forEach(function(item){
            var fullDesc = item.data[0].description.substring(0, 120);
            var href = item.links[0].href;
            if(fullDesc.indexOf('<') >= 0){
                var index = fullDesc.indexOf('<');
                fullDesc = fullDesc.substring(0, index);
            }
            if(item.data[0].media_type !== 'video' && href.indexOf(' ') == -1){
                $('#pod').append(
                    "<a class='item' href='/search/" + item.data[0].nasa_id + "'>" + 
                        "<div class='img' style='background-image: url(" + item.links[0].href + ");'></div>" + 
                        "<h4 class='title'>" + item.data[0].title + "</h4>" + 
                        "<p class='desc'>" + fullDesc + "..." + "</p>" + 
                    "</a>"
                    );
            } else {
            }
            });
        n = n + 15;
        })
        .catch(function (err) {
            console.log(err);
        });
    });
};

