//Test Function for functionality of the textarea div
	function rando_string() /*for testing text area capabilities*/
	{
		var btxt = new Array(36);
		for ( var i=0; i<36; i++ )
		{
			var temp1 = "", temp2 = "";
			/*gives numbers 1 to 5*/
			num1 = Math.floor(Math.random()*5) + 1; /*randomizes number of words in sentence*/
			for ( var j=0; j<=num1; j++ )
			{
				num2 = Math.floor(Math.random()*5) + 1; /*randomizes number of letters in word*/
				for ( var k=0; k<=num2; k++ )
				{
					temp1 = temp1 + "x";
				}
				temp2 = temp2 + " " + temp1;
			}
			btxt[i] = temp2;
		}
		/*returns a full array of 36 random sized sentences made of random sized words*/
		return btxt;
	}
	/*print function for full array - used for testing*/
	$("#textarea_wrapper").on("click", function() {
		$("#intro").remove();
		var n = new Array(36);
		n = rando_string();
		for ( var i = 0; i<36; i++ )
		{
			$("#textarea_wrapper ul").append( '<li> > ' + n[i] + '</li>' );
			if ( i %2 == 0 || i == 0 ) /* if (even line number) */
			{
				$("#textarea_wrapper li:last").addClass("p1t");
			}
			else /* if (odd line number) */
			{
				$("#textarea_wrapper li:last").addClass("p2t");
			}
		}