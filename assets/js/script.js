(function (window) {

	var submitButton      = $('#submit');
	var keyForm           = $('#friendship-key');
	var minecraftNameForm = $('#minecraft-name');

	submitButton.on('click', function () {

		var key          = keyForm.val();
		var minecraftName = minecraftNameForm.val();

		if (key.length === 0) {

			alert('The friendship key should not be empty!');
			return;

		}

		if (minecraftName.length === 0) {

			alert('Your minecraft name should not be empty');
			return;

		}


		$.post('/api/check-friendship', {minecraftName: minecraftName, key: key}, function (response) {
			
			//Super lazy but backend sends a string response that indicates success or failure.
			alert(response)

		});

	});

}(window));