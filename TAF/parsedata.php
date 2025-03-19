<?php
	header('Content-Type: application/json');

	// just a refresher on how objects work
	$testobj = {
		'con' => "test item",
		'thenwhat' => 'show it off'
	}
	$toshow = file_get_contents('data.json');

	echo $toshow;
?>