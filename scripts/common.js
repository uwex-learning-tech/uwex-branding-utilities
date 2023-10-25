/*!
Email Signature and Business Card

@author: Ethan Lin
@url: https://github.com/oel-mediateam/uwex-branding-utilities
@version: 1.0.1
@license: GNU GENERAL PUBLIC LICENSE v3

Email signature and business card for UW Extended Campus
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

import '../css/common.scss';

function titleCase( str ) {
    
    let splitStr = str.toLowerCase().split( " " );
    let skipWords = ["of", "the", "and"];
    let acronyms = ["uw", "uwex"];
    
    for ( let i = 0; i < splitStr.length; i++ ) {
        
        if ( acronyms.includes( splitStr[i] ) ) {
            
            splitStr[i] = splitStr[i].toUpperCase();
            continue;
            
        }
        
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

function trim( str, chara ) {
    
    let start = 0;
    let end = str.length;
    let res = str.substring( start, end );
    
    if ( str[start] != chara && str[end] != chara ) {
        
        return res;
        
    } else {
        
        if ( str[start] === chara ) {
            start = 1;
        }
                
        if ( str[end - 1] === chara ) {
            end = end -1;
        }
        
        return trim( str.substring( start, end ), chara );
        
    }
    
}

document.addEventListener('DOMContentLoaded', function(event) {
    
    document.getElementsByClassName( 'copyrightYear' )[0].innerHTML = new Date().getFullYear();

});

export {titleCase, selectText, trim };