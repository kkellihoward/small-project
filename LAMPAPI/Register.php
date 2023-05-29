<?php

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error)
        returnWithError($conn->connect_error);
    else 
    {
        $stmt = $conn->prepare("INSERT INTO Users 
                               (firstName,lastName,login,password) VALUES (?,?,?,?)");
        $stmt->bind_param("ssss", $inData["firstName"],  
                          $inData["lastName"], $inData["login"], $inData["password"]);
        $stmt->execute();

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

    function returnWithError($err)
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}