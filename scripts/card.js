/*
Business Card Request Form

@author: Ethan Lin
@url: https://github.com/uwex-learning-tech/uwex-branding-utilities
@version: 1.0.2
@license: GNU GENERAL PUBLIC LICENSE v3

Business card request form for UW Extended Campus
Copyright (C) 2023  Ethan Lin and UW Extended Campus

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

import '../css/card.scss';
import $ from "jquery";
import Inputmask from "inputmask";
import 'bootstrap/js/dist/alert';

import { titleCase } from './common';

$( function() {

    let businessCardComponents = {
        "firstName": "",
        "middleInitial": "",
        "lastName": "",
        "credential": "",
        "jobTitle": "",
        "phoneNumber": "",
        "email": "",
        "valid": false
    };
    
    // enable phone number formatting
    Inputmask( "999.999.9999[x[9{1,4}]]" ).mask( document.getElementById( "phoneInput" ) );
    
    /* on form input changes */
    
    // first name
    $( "#firstNameInput" ).on( "focus", function() {
        
        $( "#firstName" ).addClass( "mark" );
        
    } );
    
    $( "#firstNameInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        businessCardComponents.firstName = titleCase( value );
        this.value = businessCardComponents.firstName;
        
        $( "#firstName" ).html( businessCardComponents.firstName ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            businessCardComponents.firstName = "";
            $( "#firstName" ).addClass( "text-muted" ).removeClass( "mark" ).html( "First Name" );
        }
        
        if ( businessCardComponents.lastName.length ) {
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
        
        businessCardComponents.middleInitial = newValue.toUpperCase();
        
        this.value = businessCardComponents.middleInitial;
        $( "#middleInitial" ).html( businessCardComponents.middleInitial ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            businessCardComponents.middleInitial = "";
            $( "#middleInitial" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "Middle Initial" );
        }
        
    } );
    
    // last name
    $( "#lastNameInput" ).on( "focus", function() {
        
        $( "#lastName" ).addClass( "mark" );
        
    } );
    
    $( "#lastNameInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        businessCardComponents.lastName = titleCase( value );
        this.value = businessCardComponents.lastName;
        
        $( "#lastName" ).html( businessCardComponents.lastName ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            businessCardComponents.lastName = "";
            $( "#lastName" ).addClass( "text-muted" ).removeClass( "mark" ).html( "Last Name" );
        }
        
        if ( businessCardComponents.firstName.length ) {
            autoFillEmail();
        }
        
    } );
    
    // credential
    $( "#credentialInput" ).on( "focus", function() {
        
        $( "#credential" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#credentialInput" ).on( "blur", function() {
        
        businessCardComponents.credential = this.value.trim();
        
        $( "#credential" ).html( ", " + businessCardComponents.credential ).removeClass( "text-muted mark" );
        
        if ( this.value.trim().length === 0 ) {
            this.value = "";
            businessCardComponents.credential = "";
            $( "#credential" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( ", Credential" );
        }
        
    } );
    
    // 1st title
    $( "#titleInput" ).on( "focus", function() {
        
        $( "#title" ).addClass( "mark" );
        
    } );
    
    $( "#titleInput" ).on( "blur", function() {
        
        let value = this.value.trim();
        
        businessCardComponents.jobTitle = titleCase( value );
        this.value = businessCardComponents.jobTitle;
        
        $( "#title" ).html( businessCardComponents.jobTitle ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            this.value = "";
            businessCardComponents.jobTitle = "";
            $( "#title" ).addClass( "text-muted" ).removeClass( "mark" ).html( "Job Title" );
        }
        
    } );
    
    // phone number
    $( "#phoneInput" ).on( "focus", function() {
        
        $( "#phoneOptional" ).removeClass( "d-none" ).addClass( "mark" );
        
    } );
    
    $( "#phoneInput" ).on( "blur", function() {
        
        let value = this.value.trim();

        if ( value.endsWith( "x" ) ) {
            value = value.slice( 0, -1 );
        }
        
        businessCardComponents.phoneNumber = value;
        this.value = businessCardComponents.phoneNumber;
        
        $( "#phoneOptional" ).html( "| " + businessCardComponents.phoneNumber  ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            
            this.value = "";
            businessCardComponents.phoneNumber = "";
            $( "#phoneOptional" ).addClass( "d-none text-muted" ).removeClass( "mark" ).html( "| 123.456.7890" );
            
        }
        
    } );
    
    // email local-part
    $( "#emailInput" ).on( "focus", function() {
        
        $( "#email" ).addClass( "mark" );
        
    } );
    
    $( "#emailInput" ).on( "blur", function() {
        
        let value = this.value.trim().toLowerCase();
        
        businessCardComponents.email = value + "@uwex.wisconsin.edu";
        this.value = value;
        
        $( "#email" ).html( businessCardComponents.email ).removeClass( "text-muted mark" );
        
        if ( value.length === 0 ) {
            
            this.value = "";
            businessCardComponents.email = "";
            $( "#email" ).addClass( "text-muted" ).removeClass( "mark" ).html( "first.last@uwex.wisconsin.edu" );
            
        }
        
    } );
    
    // form validation on submit and get signature button click
    $( "#businessCardForm.needs-validation" ).on( "submit", function( event ) {
        
        event.preventDefault();
        event.stopPropagation();
        
        businessCardComponents.valid = this.checkValidity();
        $( this ).addClass( "was-validated" );
        
        if ( businessCardComponents.valid ) {
            
            grecaptcha.ready( function() {
                
                grecaptcha.execute('6Leld6EUAAAAADFAT4pmzJDYt9zOHgOtSFX_4uLV', {action: 'homepage'} ).then( function( token ) {
                    
                    businessCardComponents.recaptcha = token;
            
                    $.ajax( {
                        
                        type: 'POST',
                        url: $( "#businessCardForm" ).attr( 'action' ),
                        data: businessCardComponents
                        
                    } ).done( function() {
                        
                        displayResult();
                        
                    } ).fail( function( data ) {
                        
                        alert( "error", data.responseText );
                        
                    } );
                    
                } );
                
            } );
            
        } else {
            
            alert( "missing", "" );
            
        }

    } );
    
    // clear button
    $( "#clearBtn" ).on( "click", function() {
        
        $( "input" ).not( "input[type=button], input[type=submit]" ).val( "" ).blur();
        $( "#businessCardForm.needs-validation" ).removeClass( "was-validated" );
        
    } );
    
    function autoFillEmail() {
        
        if ( businessCardComponents.firstName.length == 0 || businessCardComponents.lastName.length == 0 ) {
            
            $( "#emailInput" ).val( "" ).blur();
            return;
            
        }
        
        $( "#emailInput" ).val( businessCardComponents.firstName.toLowerCase() + "." + businessCardComponents.lastName.toLowerCase() ).blur();
        
    }
    
    function alert( type, errMsg ) {
        
        let id = "formError";
        let msg = "";
        let tag = "danger";
        
        switch ( type ) {
            
            case "missing":
            msg = "<strong>Oops!</strong> Please enter all of the required fields.";
            break;
            
            case "error":
            msg = "<strong>Uh-oh!</strong> Not able to submit your request. " + errMsg;
            break;
            
        }
        
        $( "#submitBtn" ).parent().before( "<div id=\"" + id + "\" class=\"alert alert-" + tag + " alert-dismissible fade show mt-3\" role=\"alert\">" + msg+ "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>" );
        
        let dismissTimer = window.setTimeout( function() {

            $( "#" + id ).alert( "close" );
            window.clearInterval( dismissTimer );
            
        }, 10000 );
        
    }
    
    function displayResult() {
        
        $( $( ".content-body" ).parent() ).addClass( "d-none" );
        $( "#result" ).removeClass( "d-none" ).addClass( "d-flex" );
        
        let fullName = businessCardComponents.firstName + ( businessCardComponents.middleInitial.length ? " " + businessCardComponents.middleInitial + " " : " " ) + businessCardComponents.lastName;
        let credential = businessCardComponents.credential.length ? ", " + businessCardComponents.credential : "";
        let phoneNumber = businessCardComponents.phoneNumber.length ? " | " + businessCardComponents.phoneNumber : "";
        
        $( "#card-preview .front .fullName" ).html( fullName );
        $( "#card-preview .front .credential" ).html( credential );
        $( "#card-preview .front .jobTitle" ).html( businessCardComponents.jobTitle );
        $( "#card-preview .front .emailAddress" ).html( businessCardComponents.email );
        $( "#card-preview .front .phoneNumber" ).html( phoneNumber );
        
        // on animation
        $( "#card-preview" ).addClass( "swirl-in-fwd" );
        $( "#card-preview" ).on( "webkitAnimationEnd animationend", function() {
            
            $( this ).removeClass( "swirl-in-fwd" ).addClass( "rotate-vert-center-infinite" );
            $( "#result .thankyou" ).removeClass( "invisible" ).addClass( "visible bounce-top" );
            $( this ).off();
    
        } );
        
        $( "#result .thankyou" ).on( "webkitAnimationEnd animationend", function() {
            
            $( "#result .msg" ).removeClass( "invisible" ).addClass( "visible fade-in-bottom" )
            $( this ).off();
            
        } );
        
    }
    
} );