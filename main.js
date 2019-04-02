var isDrag=false;
var start=false;
var end=false;
let canvas=$('.canva');
let w=$(canvas).width();
let h=$(canvas).height();
let x=$(canvas).offset().left;
let y=$(canvas).offset().top;
var set = new Array();
let obj={
    parent_x: -1,
    parent_y: -1,
    f: Number.MAX_SAFE_INTEGER,
    g: Number.MAX_SAFE_INTEGER,
    h: Number.MAX_SAFE_INTEGER
}

function getXY(ele){
    return [$(ele).data('x'), $(ele).data('y')];
}


function getHVal(ele,dest){
    

}

function aStar(){
    let start = $('.starter');
    let end = $('.ender');
    
    let s={
        ...$(start).data('obj'),
        x: $(start).data('x'),
        y: $(start).data('y'),
        ele: start
    }

    s.f=0;
    s.g=0;
    s.h=0;
    s.parent_x=s.x;
    s.parent_y=s.y;

    let e={
        ...$(end).data('obj'),
        x: $(end).data('x'),
        y: $(end).data('y'),
        ele: end
    }
    
    console.table([s,e]);
    let north=$(canvas).find(`[data-x='${s.x}'][data-y='${s.y-20}']`);
    let south=$(canvas).find(`[data-x='${s.x}'][data-y='${s.y+20}']`);
    let west=$(canvas).find(`[data-x='${s.x-20}'][data-y='${s.y}']`);
    let east=$(canvas).find(`[data-x='${s.x+20}'][data-y='${s.y}']`);
    let northEast=$(canvas).find(`[data-x='${s.x+20}'][data-y='${s.y-20}']`);
    let northWest=$(canvas).find(`[data-x='${s.x-20}'][data-y='${s.y-20}']`);
    let southWest=$(canvas).find(`[data-x='${s.x-20}'][data-y='${s.y+20}']`);
    let southEast=$(canvas).find(`[data-x='${s.x+20}'][data-y='${s.y+20}']`);
    // console.log('north', north)
    // console.log('south', south)
    // console.log('east', east)
    // console.log('west', west)
    // console.log('northEast', northEast)
    // console.log('northW', northWest)
    // console.log('southW', southWest)
    // console.log('southE', southEast)

    set.push([0,s]);
    let found=false;
    while(set.length>0){
        let current = set.shift();
        let i = current[1].ele;
        $(i).attr("done",1);
        
    }




}


$(function(){
    for(let i = 1;i<=w/20;i++){
        for(let j = 1; j<=h/20;j++){
            let ele = $('<button>').css({
                "height": "20px",
                "width": "20px"
            });
            $(canvas).append(ele);
            $(ele).attr("data-x", Math.floor($(ele).offset().left-x)).attr("data-y",Math.floor($(ele).offset().top-y)).attr('data-obj', JSON.stringify(obj)).attr('done',0);
        }
    }
    $('.start').click(function(){
        start=true;
    });

    $('.end').click(function(){
        end=true;
    });

    $('button').not('.end').mousedown(function(){
        if(!start && !end){
            isDrag=true;
        } else {
            console.log("ok");
            if($('.starter').length==0){
                $(this).addClass('starter');
            } else if($('.ender').length==0){
                    $(this).addClass('ender');
            }
        }
    })
    .mousemove(function(){
        if(isDrag){
            $(this).addClass('block');
        }
    })
    .mouseup(function(){
        let wasDragging = isDrag;
        isDrag = false;
        if (wasDragging) {
            console.log("Lifted");
    }
    });

    $('.play').click(aStar);
});


