let map;

$(function(){
    let id= parseId(window.location.search);
    getDetail(id);

    showMap();

    
});

function showMap(){
map = new google.maps.Map(document.getElementById('map'), {
    zoom:12,
    center: {
        lat:33.3617,
        lng:126.5292
    }   
});
}

function showMarker(lat,lng){

    let pos= {
    lat: lat,
    lng: lng
    };

    new google.maps.Marker({
        position:pos,
        map:map
    });
    map.panTo(pos);
}

function getDetail(id){
    let url = 'https://javascript-basic.appspot.com/locationDetail';

    $.getJSON(url,{
        id:id
    }, function(r){
        $('.detail-header-name').html(r.name);
        $('.detail-header-city-name').html(r.cityName);
        $('.detail-desc-text').html(r.desc);
        
        let $gallery = $('#detail-images-show');
        let images = r.subImageList;

        for(let i =0; i<images.length;i++){
            let $image = $('<img src="'+images[i]+'" />');
            $gallery.append($image);
            console.log($gallery);
        }

    $(document).ready(function(){
        $('#detail-images-show').slick({
            dots:true,
            slideToShow:1
        });
    });

    showMarker(r.position.x, r.position.y);

    $('.btn-register').click(function(){
        var myTrips = Cookies.getJSON('MYTRIPS');
        if(!myTrips){
        myTrips=[];
        }
        myTrips.push({
            id:id,
            name: r.name,
            cityName:r.cityName,
            x: r.position.x,
            y: r.position.y
        });

        Cookies.set('MYTRIPS',myTrips);

        alert('여행지가 등록되었습니다!');
    });

    });
    
    
    
}

function parseId(str){
    let s =str.substring(1);
    let args =s.split('&');

    for(let i=0; i<args.length;i++){
        let arg = args[i];
        let tokens =arg.split('=');

        if(tokens[0]==='id')
        return tokens[1];    }
        return null;
}

