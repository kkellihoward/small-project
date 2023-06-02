<?php

    $inData = getRequestInfo();

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $email = $inData["email"];
    $phone = $inData["phone"];
    $userId = $inData["userId"];

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		// Check for duplicate email/phone
		$stmt = $conn->prepare("SELECT * FROM Contacts WHERE userId = ? AND (email = ? OR phone = ?)");
        $stmt->bind_param("sss", $userId, $email, $phone);
        $stmt->execute();
        $result = $stmt->get_result();
        $isDuplicateContact = mysqli_num_rows($result) > 0;

		if (!$isDuplicateContact)
		{
			$stmt = $conn->prepare("INSERT into Contacts (firstName,lastName,email,phone,userId) VALUES(?,?,?,?,?)");
			$stmt->bind_param("sssss", $firstName, $lastName, $email, $phone, $userId);
			$stmt->execute();
			returnWithError("");
		}
		else
		{
			returnWithError("Duplicate Contact");
		}

		$stmt->close();
		$conn->close();
	}

    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

    function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>