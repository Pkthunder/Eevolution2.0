//stores the multiplier value for each stat stage from -6 to +6
//array is indexed with an offset of +6 (stage number + 6 = index number)
var stageLibrary = [.25, .285, .33, .4, .5, .66, 1, 1.5, 2, 2.5, 3, 3.5, 4]

//value is the stage value, either -2, -1, 1, or 2
function modifyStat( stage_ptr, stat_ptr, orig_ptr, value ) {

	console.log("modifying stats by" + value);
	var index = stage_ptr+value;
	if ( index > 6  || index < -6 ) {
		console.log("Cannot raise/lower stat - its maxed out");
		return false; //did not succeed
	}
	index = index+6; //+6 for index offset of stageLibrary array
	stat_ptr = orig_ptr * stageLibrary[index];
	stage_ptr++;
	return true; //succeeded
}