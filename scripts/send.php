<?php

    // Only process POST reqeusts.
    if ( $_SERVER["REQUEST_METHOD"] == "POST" && isset( $_REQUEST ) ) {
        
        require_once( "secrect.php" );
        
        $firstName = strip_tags( $_POST["firstName"] );
        $middleInitial = strip_tags( $_POST["middleInitial"] );
        $lastName = strip_tags( $_POST["lastName"] );
        $credential = strip_tags( $_POST["credential"] );
        
        $jobTitle = strip_tags( $_POST["jobTitle"] );
        // $businessUnit = strip_tags( $_POST["businessUnit"] );

        $email = filter_var( $_POST["email"], FILTER_SANITIZE_EMAIL );
        $phoneNumber = strip_tags( $_POST["phoneNumber"] );
        
        // $firstWebsite = filter_var( $_POST["firstWebsite"], FILTER_SANITIZE_URL );
        // $secondWebsite = filter_var( $_POST["secondWebsite"], FILTER_SANITIZE_URL );

        // Check that data was sent to the mailer.
        if ( !filter_var( $email, FILTER_VALIDATE_EMAIL ) && isset( $_POST["recaptcha"] ) ) {
            
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
            
        }

        // verify reCAPTCHA
        $reCAPTCHAurl = "https://www.google.com/recaptcha/api/siteverify";
        $data = array( "secret" => RECAPTCHA_KEY, "response" => $_POST["recaptcha"] );
        
        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query( $data )
            )
        );
        
        $context  = stream_context_create( $options );
        $result = file_get_contents( $reCAPTCHAurl, false, $context );
        
        if ( $result === FALSE ) {
            
            http_response_code(403);
            echo "There was a problem with your submission, please try again.";
            
        } else {
            
            $response = json_decode( $result, true );
            
            if ( $response["success"] ) {
                
                date_default_timezone_set("America/Chicago");
                
                // Set the recipient email address.
                $recipient = EMAIL_RECIPIENT;
        
                // Set the email subject.
                $subject = "Business Card Request - $firstName $lastName";
        
                // Build the email content.
                $email_content = "<html><body>";
                $email_content .= "<p>Hello,</p>";
                $email_content .= "<p><b>$firstName $lastName</b> submitted a request for new business cards. The details for the business card are as follows:</p>";
                $email_content .= "<p><b>First Name:</b> $firstName<br><b>Middle Initial:</b> $middleInitial<br><b>Last Name:</b> $lastName<br><b>Credential(s):</b> $credential</p>";
                // $email_content .= "<p><b>Job Title:</b> $jobTitle<br><b>Business Unit:</b> $businessUnit<p>";
                $email_content .= "<p><b>Job Title:</b> $jobTitle</p>";
                $email_content .= "<p><b>Email:</b> $email<br><b>Phone:</b> $phoneNumber</p>";
                // $email_content .= "<p><b>Website 1:</b> $firstWebsite<br><b>Website 2:</b> $secondWebsite</p>";
                $email_content .= "<p>If you have any questions and/or concerns about this request, please contact <b>$firstName $lastName</b> directly.</p>";
                $email_content .= "<p><i>This email was generated on behalf of $firstName $lastName's request for a new business card. Replying to this email will send the message to $email.</i></p>";
                $email_content .= "<p>Thank you.</p><p style='color: #ccc;'><small>" . date("m-d-Y h:ia") . "</small></p>";
                $email_content .= "</body></html>";
        
                // Build the email headers.
                $email_headers = "From: $firstName $lastName <$email>\r\n";
                $email_headers .= "Reply-To: $email\r\n";
                $email_headers .= "Bcc: $email\r\n";
                $email_headers .= "MIME-Version: 1.0\r\n";
                $email_headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                
                // Send the email.
                if ( mail( $recipient, $subject, $email_content, $email_headers ) ) {
                    
                    http_response_code(200);
                    
                } else {
                    
                    // Set a 500 (internal server error) response code.
                    http_response_code(500);
                    echo "Oops! Something went wrong and we couldn't send your message.";
                    
                }
                
            } else {
                
                http_response_code(403);
                echo "There was a problem with your submission, please try again.";
                
            }
            
        }

    } else {
        
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
        
    }

?>