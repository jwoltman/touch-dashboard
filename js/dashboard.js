// Execute functions after DOM has loaded
$(document).ready(function(){
	// Call dock plugin on a <div> containing <img>'s
	$('#dock').dock({ zoomFactor : 2.00, zoomWidth : 90, timeOut : 70 });


	$('#dock').find('a').click(function() {
		var link = $(this).attr('href');

		$('#contentframe').attr('src', link);

		return false;
	});

	view(1);
});

view = function(index) {
	var links = $('#dock a');

	setTimeout(function() {
		$('#contentframe').attr('src', links[index]);

		if (index >= links.length) {
			index = 0;
		} else {
			index = index + 1;
		}

		view(index);
	}, 3000); // Roteer om de 3000 milliseconden
}