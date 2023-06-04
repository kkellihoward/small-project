<?php

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error)
        returnWithError($conn->connect_error);
    else 
    {
        // Check for duplicate login
        $stmt = $conn->prepare("SELECT * FROM Users WHERE login = ?");
        $stmt->bind_param("s", $inData["login"]);
        $stmt->execute();
        $result = $stmt->get_result();
        $isDuplicateLogin = mysqli_num_rows($result) > 0;

        if (!$isDuplicateLogin)
        {
            $stmt = $conn->prepare("INSERT INTO Users 
                                (firstName,lastName,login,password) VALUES (?,?,?,?)");
            $stmt->bind_param("ssss", $inData["firstName"],  
                              $inData["lastName"], $inData["login"], $inData["password"]);
            $stmt->execute();
            
        }
        else
        {
            returnWithError("Duplicate Login");
        }
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

    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}