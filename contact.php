<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    # FIX: Replace this email with recipient email
    $mail_to = "jonesruskin77@gmail.com";
    
    # Sender Data
    $name = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["Name"])));
    $email = filter_var(trim($_POST["Email"]), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST["Phone"]);
    $message = trim($_POST["Message"]);
    $regarding = trim($_POST["Regarding"]);
    
    if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR empty($phone) OR empty($regarding) OR empty($message)) {
        # Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }
    
    # Mail Content
    $content = "Name: $name\n";
    $content .= "Phone: $phone\n";
    $content .= "Email: $email\n\n";
    $content .= "Regarding: $regarding\n";
    $content .= "Message:\n$message\n";


    # email headers.
    $headers = "From: $name &lt;$email&gt;";

    # Send the email.
    $success = mail($mail_to, $regarding, $content, $headers);
    if ($success) {
        # Set a 200 (okay) response code.
        http_response_code(200);
        echo "<p class='response-msg'>Thank you! We will be in touch with you shortly.</p>";
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
