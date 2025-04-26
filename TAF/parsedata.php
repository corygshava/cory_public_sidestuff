<?php
	header('Content-Type: application/json');

	$toshow = file_get_contents('data.json');

	echo $toshow;
?>