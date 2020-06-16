$(function(){
    $(window).scroll(function(){
        let top = $(window).scrollTop();

        if(top >0)
        $('#header').addClass('inverted');
        else 
        $('#header').removeClass('inverted');
    });


$(window).trigger('scroll');


let dpFrom = $('#from').datepicker({
    dateFormat : 'yy-mm-dd',
    minDate:0,
    onSelect: function(){
        dpTo.datepicker('option','minDate', dpFrom.datepicker('getDate'));
    }
});
dpFrom.datepicker('setDate', new Date());

let dpTo =$('#to').datepicker({
    dateFormat:'yy-mm-dd',
    minDate:0
});
dpTo.datepicker('setDate', 4);


function search(from, to){
let url = 'https://javascript-basic.appspot.com/searchLocation';

$.getJSON(url, {
    from:from,
    to: to
}, function(r){
    let $list =$('#list-panel');

    for(let i=0; i<r.length;i++){
        let data = r[i];
        let $item = createListItem(data);
        $list.append($item);
    }
    $('#list-bg').show();
});

}

$('#form-search').submit(function(e){
    e.preventDefault();

    let from = $('#from').val();
    let to = $('#to').val();

    search(from, to);
});

});

function createListItem(data){
    let $tmpl = $('#list-item-template').clone().removeAttr('id');

    $tmpl.find('.list-item-image').attr('src',data.titleImageUrl);
    $tmpl.find('.list-item-name').html(data.name);
    $tmpl.find('.list-item-city-name').html(data.cityName);

    $tmpl.click(function(e){
        let url = 'detail.html?id=' + data.id;
        window.location = url;
    });
    return $tmpl
}