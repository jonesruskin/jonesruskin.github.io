<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    # FIX: Replace this email with recipient email
    $mail_to = "jonesruskin77@gmail.com";
    
    # Sender Data
    $name = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["name"])));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST["phone"]);
    $subject = trim($_POST["message"]);
   
    $filename = $_FILES['attach']['name'];
    $fileerror = $_FILES['attach']['error'];

    $boundary =md5(date('r', time())); 

    
if($fileerror == 0){
    $headers = "From: $name &lt;$email&gt;";
    $headers .= "\r\nMIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"_1_$boundary\"";
    $attachment = chunk_split(base64_encode(file_get_contents($_FILES['attach']['tmp_name'])));

    $content = "Name: $name\n";
    $content .= "Phone: $phone\n";
    $content .= "Email: $email\n\n";
    $content .= "Message:\n$subject\n";

    $message="This is a multi-part message in MIME format.

--_1_$boundary
Content-Type: multipart/alternative; boundary=\"_2_$boundary\"

--_2_$boundary
Content-Type: text/plain; charset=\"iso-8859-1\"
Content-Transfer-Encoding: 7bit

$content

--_2_$boundary--
--_1_$boundary
Content-Type: application/octet-stream; name=\"$filename\" 
Content-Transfer-Encoding: base64 
Content-Disposition: attachment 

$attachment
--_1_$boundary--";
}

else if($fileerror == 4){
    $headers = "From: $name &lt;$email&gt;";

    $message = "Name: $name\n";
    $message .= "Phone: $phone\n";
    $message .= "Email: $email\n\n";
    $message .= "Message:\n$subject\n";
}



    
    if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($phone) OR empty($message)) {
        # Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }
    
    


  

    # Send the email.
    $success = mail($mail_to, $name, $message, $headers);
    if ($success) {
        # Set a 200 (okay) response code.
        http_response_code(200);
        header("Location: thank-you.html");
    } else {
        # Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Something went wrong, we couldn't send your message.";
    }

    } else {
        # Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }
 
?>
