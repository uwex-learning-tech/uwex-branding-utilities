/*
Email Signature Generator

@author: Ethan Lin
@url: https://github.com/uwex-learning-tech/uwex-branding-utilities
@version: 1.0.1
@license: GNU GENERAL PUBLIC LICENSE v3

Email signature generator for UW Extended Campus
Copyright (C) 2022  Ethan Lin and UW Extended Campus

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

import '../css/email.scss';
import $ from "jquery";
import Inputmask from "inputmask";
import { titleCase, selectText, trim } from './common';
import 'bootstrap/js/dist/alert';

$( function() {
    
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
        "changeNotice": "",
        "pronouns": "",
        "valid": false
    };
    
    // enable phone number formatting
    //$( "#phoneInput" ).inputmask({"mask": "[(999) 999-9999][, Ext. [999]{0,1}]{0,1}"});
    Inputmask( "(999) 999-9999[, Ext. [9{1,4}]]" ).mask( document.getElementById( "phoneInput" ) );
    
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
        let newValue = value;
        
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
        
        let value = trim( this.value.trim().toLowerCase().replace(/http(s)?:\/\//gi, ""), "/" );
        
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
        
        let value = trim( this.value.trim().toLowerCase().replace(/http(s)?:\/\//gi, ""), "/" );
        
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

        if ( value.endsWith( ", Ext." ) ) {
            value = value.replace(", Ext.", "");
        }
        
        signatureComponents.phoneNumber = value;
        this.value = signatureComponents.phoneNumber;
        
        $( "#phoneOptional" ).html( signatureComponents.phoneNumber + " |" ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.phoneNumber = "";
            $( "#phoneOptional" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "(123) 456-7890 |" );
            $( '#phoneChangedNotice' ).prop( 'disabled', true );
        } else {
            $( '#phoneChangedNotice' ).prop( 'disabled', false );
        }
        
    } );
    
    // email local-part
    $( "#emailInput" ).on( "focus", function() {
        
        $( "#email" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#emailInput" ).on( "blur", function() {
        
        let value = this.value.trim().toLowerCase();
        
        signatureComponents.email = value + "@uwex.wisconsin.edu";
        this.value = value;
        
        $( "#email" ).html( signatureComponents.email + " |" ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.email = "";
            $( "#email" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "first.last@uwex.wisconsin.edu |" );
            $( '#emailChangedNotice' ).prop( 'disabled', true );
        } else {
            $( '#emailChangedNotice' ).prop( 'disabled', false );
        }
        
    } );

    // change notice
    $( "#phoneChangedNotice" ).on( 'change', function( evt ) {
        
        let emailCheckbox = $( "#emailChangedNotice" )[0];
        let messageContainer = $( "#phoneEmailChangedNoticeOptional" );

        if ( evt.currentTarget.checked || emailCheckbox.checked ) {
            messageContainer.removeClass( "d-none" );
            messageContainer.next().removeClass( "d-none" );
        } else {
            messageContainer.addClass( "d-none" );
            messageContainer.next().addClass( "d-none" );
        }

        if ( evt.currentTarget.checked ) {
            messageContainer.html( "*Check out my new phone number!" );
        } else if ( emailCheckbox.checked ) {
            messageContainer.html( "*Check out my new email address!" );
        } else {
            messageContainer.html( "" );
        }

        if ( evt.currentTarget.checked && emailCheckbox.checked ) {
            messageContainer.html( "*Check out my new phone number and email address!" );
        }

        signatureComponents.changeNotice = messageContainer.text();

    } );

    $( "#emailChangedNotice" ).on( 'change', function( evt ) {
        
        let phoneCheckbox = $( "#phoneChangedNotice" )[0];
        let messageContainer = $( "#phoneEmailChangedNoticeOptional" );

        if ( evt.currentTarget.checked || phoneCheckbox.checked ) {
            messageContainer.removeClass( "d-none" );
            messageContainer.next().removeClass( "d-none" );
        } else {
            messageContainer.addClass( "d-none" );
            messageContainer.next().addClass( "d-none" );
        }

        if ( evt.currentTarget.checked ) {
            messageContainer.html( "*Check out my new email address!" );
        } else if ( phoneCheckbox.checked ) {
            messageContainer.html( "*Check out my new phone number!" );
        } else {
            messageContainer.html( "" );
        }

        if ( evt.currentTarget.checked && phoneCheckbox.checked ) {
            messageContainer.html( "*Check out my new phone number and email address!" );
        }

        signatureComponents.changeNotice = messageContainer.text();

    } );

    // pronouns
    $( "#pronounsInput" ).on( "focus", function() {
        
        $( "#pronounsOptional" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#pronounsInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        signatureComponents.pronouns = "<a href='https://media.uwex.edu/content/uwex/resources/pronouns-usage-guide.pdf' target='_blank'>Pronouns</a>: " + value;
        this.value = value;
        
        $( "#pronounsOptional" ).html( signatureComponents.pronouns ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            signatureComponents.pronouns = "";
            $( "#pronounsOptional" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "Pronouns:" );
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
        let contactInfo = phoneNumber + email + "uwex.wisconsin.edu";
        let pronouns = signatureComponents.pronouns;
        let image = "<img nosend='1' width='199px' height='63px' src='https://media.uwex.edu/app/tools/uwex-branding-utilities/images/logo.jpg' alt='University of Wisconsin Extended Campus' />";
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

        if ( signatureComponents.changeNotice.length ) {
            signature += "<br><b style='color:#f00;'>"  + signatureComponents.changeNotice + "</b>";
        }

        if ( pronouns.length ) {
            signature += "<br>" + pronouns;
        }
        
        signature += "<br><br>" + image + "</p>";
        
        $( "#artboard" ).html( signature );
        
        copyToClipboard( signature );
        
    }
    
    function copyToClipboard( signature ) {
        
        try {
            
            if ( navigator.clipboard && 
            typeof( ClipboardItem ) != "undefined" && 
            typeof( Blob ) != "undefined" ) {
                
                const blobInput = new Blob( [signature], {type: "text/html" } );
                const clipboardItemInput = new ClipboardItem( {'text/html' : blobInput } );
                navigator.clipboard.write( [clipboardItemInput] ).then( function() {
                    alert( "success" );
                }, function() {
                    alert( "unsuccessful" );
                } );

            } else {

                copyToClipboardAlt();

            }
            
        } catch ( err ) {
            
            console.error('Failed to copy!', err);
            alert( "error" );
             
        }
        
    }

    function copyToClipboardAlt() {

        let successful = false;

        selectText( "artboard" );
        successful = document.execCommand( "copy" );

        if ( successful ) {
        
            alert( "success" );
            
        } else {
            
            alert( "unsuccessful" );
            
        }
  
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
                msg = "<strong>Please try a different web browser.</strong> Your current web browser does not supports copying to clipboard.";
            break;
                
        }
        
        $( "#submitBtn" ).parent().before( "<div id=\"" + id + "\" class=\"alert alert-" + tag + " alert-dismissible fade show\" role=\"alert\">" + msg+ "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>" );
        
        let dismissTimer = window.setTimeout( function() {

            $( "#" + id ).alert( "close" );
            window.clearInterval( dismissTimer );
            
        }, 6000 );
        
    }
    
} );