/*
Email Signature Generator

@author: Ethan Lin
@url: https://github.com/oel-mediateam/uwextendedcampus-email-signature
@version: 1.0.0
@license: GNU GENERAL PUBLIC LICENSE v3

Email signature generator for UW Extended Campus
Copyright (C) 2019  Ethan Lin and UW Extended Campus

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

$( document ).ready( function() {
    
    let signatureComponents = {
        "firstName": "",
        "middleInitial": "",
        "lastName": "",
        "credential": "",
        "firstTitle": "",
        "secondTitle": "",
        "firstUnitProgram": "",
        "firstWebsite": "",
        "secondUnitProgram": "",
        "secondWebsite": "",
        "phoneNumber": "",
        "email": "",
        "valid": false
    };
    
    // enable phone number formatting
    $( "#phoneInput" ).inputmask({"mask": "[(999) 999-9999][, Ext. [999]{0,1}]{0,1}"});
    
    /* on form input changes */
    
    // first name
    $( "#firstNameInput" ).on( "focus", function() {
        
        $( "#firstName" ).addClass( "mark" );
        
    } );
    
    $( "#firstNameInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.firstName = titleCase( value );
        this.value = signatureComponents.firstName;
        
        $( "#firstName" ).html( signatureComponents.firstName ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.firstName = "";
            $( "#firstName" ).addClass( "text-muted" ).removeClass( "mark" ).html( "First Name" );
        }
        
        if ( signatureComponents.lastName.length ) {
            autoFillEmail();
        }
        
    } );
    
    // middle initial
    $( "#mInitialInput" ).on( "focus", function() {
        
        $( "#middleInitial" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#mInitialInput" ).on( "input paste", function() {
        
        let value = this.value.replace( /[^A-Za-z\.]/, "" );
        this.value = value
        
    } );

    $( "#mInitialInput" ).on( "blur", function() {
        
        let value = this.value.replace(".", "").trim();
        let newValue = "";
        
        if ( value.length ) {
            [...value].forEach( c => c != "." ? newValue += c + "." : newValue += "" );
        } else {
            newValue = value;
        }
        
        signatureComponents.middleInitial = newValue.toUpperCase();
        
        this.value = signatureComponents.middleInitial;
        $( "#middleInitial" ).html( signatureComponents.middleInitial ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.middleInitial = "";
            $( "#middleInitial" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "Middle Initial" );
        }
        
    } );
    
    // last name
    $( "#lastNameInput" ).on( "focus", function() {
        
        $( "#lastName" ).addClass( "mark" );
        
    } );
    
    $( "#lastNameInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.lastName = titleCase( value );
        this.value = signatureComponents.lastName;
        
        $( "#lastName" ).html( signatureComponents.lastName ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.lastName = "";
            $( "#lastName" ).addClass( "text-muted" ).removeClass( "mark" ).html( "Last Name" );
        }
        
        if ( signatureComponents.firstName.length ) {
            autoFillEmail();
        }
        
    } );
    
    // credential
    $( "#credentialInput" ).on( "focus", function() {
        
        $( "#credential" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#credentialInput" ).on( "blur", function() {
        
        signatureComponents.credential = this.value.trim();
        
        $( "#credential" ).html( ", " + signatureComponents.credential ).removeClass( "text-muted mark" );
        
        if ( this.value.trim().length === 0 ) {
            this.value = "";
            signatureComponents.credential = "";
            $( "#credential" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( ", Credential" );
        }
        
    } );
    
    // 1st title
    $( "#titleInput" ).on( "focus", function() {
        
        $( "#title" ).addClass( "mark" );
        
    } );
    
    $( "#titleInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.firstTitle = titleCase( value );
        this.value = signatureComponents.firstTitle;
        
        $( "#title" ).html( signatureComponents.firstTitle ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.firstTitle = "";
            $( "#title" ).addClass( "text-muted" ).removeClass( "mark" ).html( "Job Title 1" );
        }
        
    } );
    
    // 2nd title
    $( "#titleOptionalInput" ).on( "focus", function() {
        
        $( "#titleOptional" ).removeClass( "d-none" ).addClass( "mark" )
        
    } );
    
    $( "#titleOptionalInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.secondTitle = titleCase( value );
        this.value = signatureComponents.secondTitle;
        
        $( "#titleOptional" ).html( signatureComponents.secondTitle + "<br>" ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.secondTitle = "";
            $( "#titleOptional" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "Job Title 2<br>" );
        }
        
    } );
    
    // 1st business unit or program
    $( "#businessUnitInput" ).on( "focus", function() {
        
        $( "#businessUnit" ).addClass( "mark" );
        
    } );
    
    $( "#businessUnitInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.firstUnitProgram = titleCase( value );
        this.value = signatureComponents.firstUnitProgram;
        
        $( "#businessUnit" ).html( signatureComponents.firstUnitProgram ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.firstUnitProgram = "";
            $( "#businessUnit" ).addClass( "text-muted" ).removeClass( "mark" ).html( "Business Unit or Program" );
        }
        
    } );
    
    // 1st program website
    $( "#programWebsiteInput" ).on( "focus", function() {
        
        $( "#programWebsite" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#programWebsiteInput" ).on( "blur", function() {
        
        let value = this.value.trim().toLowerCase();
        
        value = value.replace(/http(s)?:\/\//gi, "");
        signatureComponents.firstWebsite = value;
        this.value = signatureComponents.firstWebsite;
        
        $( "#programWebsite" ).html( "| " + signatureComponents.firstWebsite ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.firstWebsite = "";
            $( "#programWebsite" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "| Website" );
        }
        
    } );
    
    // 2nd business unit or program and program website
    $( "#businessUnitOptionalInput, #programWebsiteOptionalInput" ).on( "focus", function() {
        
        $( "#2ndBusinessUnit" ).removeClass( "d-none" );
        
        if ( this.id === "businessUnitOptionalInput" ) {
            
            $( "#businessUnitOptional" ).removeClass( "d-none" ).addClass( "mark" );
            
        }
        
        if ( this.id === "programWebsiteOptionalInput" ) {
            
            $( "#businessUnitOptional" ).removeClass( "d-none" );
            $( "#programWebsiteOptional" ).removeClass( "d-none" ).addClass( "mark" );
            
        }
        
    } );
    
    $( "#businessUnitOptionalInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.secondUnitProgram = titleCase( value );
        this.value = signatureComponents.secondUnitProgram;
        
        $( "#businessUnitOptional" ).html( signatureComponents.secondUnitProgram ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            
            this.value = "";
            signatureComponents.secondUnitProgram = "";
            $( "#businessUnitOptional" ).addClass( "text-muted" ).removeClass( "mark" ).html( "2nd Business Unit or Program" );
            
            if ( signatureComponents.secondWebsite.length == 0 ) {
                
                $( "#2ndBusinessUnit" ).addClass( "d-none" );
                $( "#businessUnitOptional" ).addClass( "d-none" );
                
            }
            
        }
        
    } );
    
    $( "#programWebsiteOptionalInput" ).on( "blur", function() {
        
        let value = this.value.trim().toLowerCase().replace(/http(s)?:\/\//gi, "");
        
        signatureComponents.secondWebsite = value;
        this.value = signatureComponents.secondWebsite;
        
        $( "#programWebsiteOptional" ).html( "| " + signatureComponents.secondWebsite ).removeClass( "text-muted mark" );
        $( "#businessUnitOptionalInput" ).attr("required", true);
        
        if ( value.length === 0 ) {
            
            this.value = "";
            signatureComponents.secondWebsite = "";
            $( "#programWebsiteOptional" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "| Website" );
            
            if ( signatureComponents.secondUnitProgram.length == 0 ) {
                
                $( "#2ndBusinessUnit" ).addClass( "d-none" );
                $( "#businessUnitOptional" ).addClass( "d-none" )
                $( "#businessUnitOptionalInput" ).attr("required", false);
                
            }
            
        }
        
    } );
    
    // phone number
    $( "#phoneInput" ).on( "focus", function() {
        
        $( "#phoneOptional" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#phoneInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.phoneNumber = value;
        this.value = signatureComponents.phoneNumber;
        
        $( "#phoneOptional" ).html( signatureComponents.phoneNumber + " |" ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.phoneNumber = "";
            $( "#phoneOptional" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "(123) 456-7890 |" );
        }
        
    } );
    
    // email local-part
    $( "#emailInput" ).on( "focus", function() {
        
        $( "#email" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#emailInput" ).on( "blur", function() {
        
        let value = this.value.trim().toLowerCase();
        
        signatureComponents.email = value + "@uwex.edu";
        this.value = value;
        
        $( "#email" ).html( signatureComponents.email + " |" ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.email = "";
            $( "#email" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "first.last@uwex.edu |" );
        }
        
    } );
    
    // form validation on submit and get signature button click
    $( "#signatureForm.needs-validation" ).on( "submit", function( event ) {
        
        event.preventDefault();
        event.stopPropagation();
        
        signatureComponents.valid = this.checkValidity();
        $( this ).addClass( "was-validated" );
        
        if ( signatureComponents.valid ) {
            
            getSignature();
            
        } else {
            
            alert( "missing" );
            
        }

    } );
    
    $( ".getSignatureBtn" ).on( "click", function( event ) {
        
        event.preventDefault();
        event.stopPropagation();
        
        $( "#submitBtn" ).click();
        
        return false;
        
    } );
    
    // clear button
    $( "#clearBtn" ).on( "click", function() {
        
        $( "input" ).not( "input[type=button], input[type=submit]" ).val( "" ).blur();
        $( "#signatureForm.needs-validation" ).removeClass( "was-validated" );
        
    } );
    
    function autoFillEmail() {
        
        if ( signatureComponents.firstName.length == 0 || signatureComponents.lastName.length == 0 ) {
            
            $( "#email" ).addClass( "d-none" );
            $( "#emailInput" ).val( "" ).blur();
            return;
            
        }
        
        $( "#email" ).removeClass( "d-none" );
        $( "#emailInput" ).val( signatureComponents.firstName.toLowerCase() + "." + signatureComponents.lastName.toLowerCase() ).blur();
        
    }
    
    // get signature function
    function getSignature() {
        
        let fullName = signatureComponents.firstName + " " + signatureComponents.middleInitial + " " + signatureComponents.lastName;
        let credential = signatureComponents.credential.length ? ", " + signatureComponents.credential : "";
        let firstUnitProgram = signatureComponents.firstUnitProgram + ( signatureComponents.firstWebsite.length ? " | " + signatureComponents.firstWebsite : "" );
        let phoneNumber = signatureComponents.phoneNumber.length ? signatureComponents.phoneNumber + " | " : "";
        let email = signatureComponents.email.length ? signatureComponents.email + " | " : "";
        let contactInfo = phoneNumber + email + "ce.uwex.edu";
        let image = "<img nosend='1' width='199px' height='63px' src='https://media.uwex.edu/app/tools/email-signature-generator/images/logo.jpg' alt='University of Wisconsin Extended Campus' />";
        let signature = "";
        
        signature += "<p style='color:#000;margin:0in;font-family:\"Calibri\",sans-serif;line-height=0.1in;font-size:11.0pt;'><b>" + fullName + credential + "</b><br>";
        
        signature += "<b>" + signatureComponents.firstTitle + "</b><br>";
        
        if ( signatureComponents.secondTitle.length ) {
            signature += "<b>" + signatureComponents.secondTitle + "</b><br>";
        }
        
        signature += firstUnitProgram + "<br>";
        
        if ( signatureComponents.secondUnitProgram.length ) {
            
            let secondUnitProgram = signatureComponents.secondUnitProgram + ( signatureComponents.secondWebsite.length ? " | " + signatureComponents.secondWebsite : "" );
            
            signature += secondUnitProgram + "<br>";
            
        }
        
        signature += contactInfo;
        
        signature += "<br><br>" + image + "</p>";
        
        $( "#artboard" ).html( signature );
        
        copyToClipboard();
        
    }
    
    
    function copyToClipboard() {
        
        selectText("artboard");
        
        try {
            
            // Now that we've selected the anchor text, execute the copy command  
            var successful = document.execCommand('copy');  
            
            if ( successful ) {
                
                alert( "success" );
                
            } else {
                
                alert( "unsuccessful" );
                
            }
            
        } catch ( err ) {
            
            alert( "error" );
             
        }
        
        // Remove the selections - NOTE: Should use
        // removeRange(range) when it is supported  
        window.getSelection().removeAllRanges();
        
    }
    
    function alert( type ) {
        
        let id = "";
        let msg = "";
        let tag = "";
        
        switch ( type ) {
            
            case "success":
                id = "signatureSuccess";
                tag = "success";
                msg = "<strong>Success!</strong> Your email signature has been copied to your computer's clipboard.";
            break;
                
            case "missing":
                id = "signatureError";
                tag = "danger";
                msg = "<strong>Oops!</strong> Please enter all required information.";
            break;
                
            case "unsuccessful":
                id = "signatureError";
                tag = "danger";
                msg = "<strong>Oh no!</strong> Your email signature was not copied successfully. Please try again.";
            break;
                
            case "error":
                id = "signatureError";
                tag = "danger";
                msg = "<strong>Please try a different web browser</strong> Your current web browser does not supports copying to clipboard.";
            break;
                
        }
        
        $( "#submitBtn" ).parent().before( "<div id=\"" + id + "\" class=\"alert alert-" + tag + " alert-dismissible fade show\" role=\"alert\">" + msg+ "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>" );
        
        let dismissTimer = window.setTimeout( function() {

            $( "#" + id ).alert( "close" );
            window.clearInterval( dismissTimer );
            
        }, 6000 );
        
    }
    
} );

function titleCase( str ) {
    
    let splitStr = str.toLowerCase().split( " " );
    let skipWords = ["of", "the"];
    
    for ( let i = 0; i < splitStr.length; i++ ) {
    
        if ( !skipWords.includes( splitStr[i] ) ) {
            
            splitStr[i] = splitStr[i].charAt( 0 ).toUpperCase() + splitStr[i].substring( 1 );
            
        }
           
    }
    
    return splitStr.join( " " );
    
}

function selectText( id ) {
    
    let sel, range;
    let el = document.getElementById(id);

    if ( window.getSelection && document.createRange ) { 
        
        sel = window.getSelection();
        
        range = document.createRange(); //range object
        range.selectNodeContents( el ); //sets Range
        sel.removeAllRanges(); //remove all ranges from selection
        sel.addRange( range );
        
    }
    
}