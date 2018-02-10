var audio = new Audio('audio/birch.mp3');
audio.loop=true;
audio.play();


$('.searchlight')
    .on('mousemove', function(event) {
        $(this).addClass('on').css({'margin-left': event.pageX - 50, 'margin-top': event.pageY - 50});
    })
    .on('mouseout', function(event) {
        $(this).removeClass('on');
    })


    .on('click', function(event) {
      var e = new jQuery.Event("click");
e.clientX = event.clientX;
e.clientY = event.clientY;
      //  $(this).css('z-index,30'); //go behind the glass
        $('#themap').trigger(e);

    })

;
