$(document).ready(function(){
 

$(document).ready(function(){
  $("#2").fadeTo( 5, 0.6 );
    $("#3").fadeTo(5, 0.6);
    $("#1").fadeTo(5, 0.6);
});
       
$("#1").hover(function(){
    $("#1").fadeTo(5, 1);
});
       
$("#1").mouseleave(function(){
    $("#1").fadeTo(5, 0.6);
});
             
 $("#2").hover(function(){
    $("#2").fadeTo(5, 1);
}); 
       
$("#2").mouseleave(function(){
    $("#2").fadeTo(5, 0.6);
}); 
       
$("#3").hover(function(){
    $("#3").fadeTo(5, 1);
}); 
       
$("#3").mouseleave(function(){
    $("#3").fadeTo(5, 0.6);
});
    
    });

$(function(){

    $(".navbar a, footer a").on("click", function(event){
    
        event.preventDefault();
        var hash = this.hash;
        
        $('body,html').animate({scrollTop: $(hash).offset().top} , 900 , function(){window.location.hash = hash;})
        
    });

})