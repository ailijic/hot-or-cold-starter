
$(document).ready(function(){
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
    /*
    $("#guessButton").click(function guessButton(){
        var num = $('#userGuess').get(0);
        console.log("test");
        console.log(num);
        $(".guessBox").append("<li>"+num+"</li>");
        });
     */
    $("#myForm").submit(function(event) {
        var val = $("#userGuess").val();
        //alert("Val = "+val);
        $(".guessBox").append("<li>"+ val +"</li>");
    });
    /*--- Generate Random value for the user ---*/
    function getRandomInt() {
        return 51; // For testing only (comment out later)
        // return Math.floor(100 * Math.random());
    };
    /*--- Setup new game ---*/
    /*--- Update the number of guesses ---*/
    /*--- Respond to the users guess submission ---*/
    /*--- Check if the users guess is valid ---*/
});


