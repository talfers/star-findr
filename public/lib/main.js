/*$('#see-more').click(seeMore());

var n = 15;

var seeMore = function(results){
    results.slice(n, n+15).forEach(function(item){
        if(item.data[0].media_type !== 'video'){
            $('#pod').append(
                "<a class='item' href='/search/" + item.data[0].nasa_id + "'>" + 
                    "<div class='img' style='background-image: url(" + item.links[0].href + ");'></div>" + 
                    "<h4 class='title'>" + item.data[0].title + "</h4>" + 
                    "<p class='desc'>" + item.data[0].description.substring(0, 120) + "..." + "</p>" + 
                    "</a>"
                )
        } else {
        }
        });
}*/