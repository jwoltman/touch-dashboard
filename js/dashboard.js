// Execute functions after DOM has loaded
$(document).ready(function(){
	// Call dock plugin on a <div> containing <img>'s
	$('#dock').dock({ zoomFactor : 2.00, zoomWidth : 90, timeOut : 70 });


	$('#dock').find('a').click(function() {
		var link = $(this).attr('href');

		$('#contentframe').attr('src', link);

		return false;
	});

});
