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
function titleCase(e){let t=e.toLowerCase().split(" "),s=["of","the"];for(let e=0;e<t.length;e++)s.includes(t[e])||(t[e]=t[e].charAt(0).toUpperCase()+t[e].substring(1));return t.join(" ")}function selectText(e){let t,s,n=document.getElementById(e);window.getSelection&&document.createRange&&(t=window.getSelection(),(s=document.createRange()).selectNodeContents(n),t.removeAllRanges(),t.addRange(s))}$(document).ready(function(){let e={firstName:"",middleInitial:"",lastName:"",credential:"",firstTitle:"",secondTitle:"",firstUnitProgram:"",firstWebsite:"",secondUnitProgram:"",secondWebsite:"",phoneNumber:"",email:"",valid:!1};function t(){if(0==e.firstName.length||0==e.lastName.length)return $("#email").addClass("d-none"),void $("#emailInput").val("").blur();$("#email").removeClass("d-none"),$("#emailInput").val(e.firstName.toLowerCase()+"."+e.lastName.toLowerCase()).blur()}function s(e){let t="",s="",n="";switch(e){case"success":t="signatureSuccess",n="success",s="<strong>Success!</strong> Your email signature has been copied to your computer's clipboard.";break;case"missing":t="signatureError",n="danger",s="<strong>Oops!</strong> Please enter all required information.";break;case"unsuccessful":t="signatureError",n="danger",s="<strong>Oh no!</strong> Your email signature was not copied successfully. Please try again.";break;case"error":t="signatureError",n="danger",s="<strong>Please try a different web browser</strong> Your current web browser does not supports copying to clipboard."}$("#submitBtn").parent().before('<div id="'+t+'" class="alert alert-'+n+' alert-dismissible fade show" role="alert">'+s+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');let a=window.setTimeout(function(){$("#"+t).alert("close"),window.clearInterval(a)},6e3)}$("#phoneInput").inputmask({mask:"(999) 999-9999"}),$("#firstNameInput").on("focus",function(){$("#firstName").addClass("mark")}),$("#firstNameInput").on("blur",function(){let s=this.value.trim();e.firstName=titleCase(s),this.value=e.firstName,$("#firstName").html(e.firstName).removeClass("text-muted mark"),0===s.length&&(this.value="",e.firstName="",$("#firstName").addClass("text-muted").removeClass("mark").html("First Name")),e.lastName.length&&t()}),$("#mInitialInput").on("focus",function(){$("#middleInitial").removeClass("d-none").addClass("mark")}),$("#mInitialInput").on("input paste",function(){let e=this.value.replace(/[^A-Za-z\.]/,"");this.value=e}),$("#mInitialInput").on("blur",function(){let t=this.value.replace(".","").trim(),s="";t.length?[...t].forEach(e=>s+="."!=e?e+".":""):s=t,e.middleInitial=s.toUpperCase(),this.value=e.middleInitial,$("#middleInitial").html(e.middleInitial).removeClass("text-muted mark"),0===t.length&&(this.value="",e.middleInitial="",$("#middleInitial").addClass("d-none text-muted").removeClass("mark").html("Middle Initial"))}),$("#lastNameInput").on("focus",function(){$("#lastName").addClass("mark")}),$("#lastNameInput").on("blur",function(){let s=this.value.trim();e.lastName=titleCase(s),this.value=e.lastName,$("#lastName").html(e.lastName).removeClass("text-muted mark"),0===s.length&&(this.value="",e.lastName="",$("#lastName").addClass("text-muted").removeClass("mark").html("Last Name")),e.firstName.length&&t()}),$("#credentialInput").on("focus",function(){$("#credential").removeClass("d-none").addClass("mark")}),$("#credentialInput").on("blur",function(){e.credential=this.value.trim(),$("#credential").html(", "+e.credential).removeClass("text-muted mark"),0===this.value.trim().length&&(this.value="",e.credential="",$("#credential").addClass("d-none text-muted").removeClass("mark").html(", Credential"))}),$("#titleInput").on("focus",function(){$("#title").addClass("mark")}),$("#titleInput").on("blur",function(){let t=this.value.trim();e.firstTitle=titleCase(t),this.value=e.firstTitle,$("#title").html(e.firstTitle).removeClass("text-muted mark"),0===t.length&&(this.value="",e.firstTitle="",$("#title").addClass("text-muted").removeClass("mark").html("Title"))}),$("#titleOptionalInput").on("focus",function(){$("#titleOptional").removeClass("d-none").addClass("mark")}),$("#titleOptionalInput").on("blur",function(){let t=this.value.trim();e.secondTitle=titleCase(t),this.value=e.secondTitle,$("#titleOptional").html(e.secondTitle+"<br>").removeClass("text-muted mark"),0===t.length&&(this.value="",e.secondTitle="",$("#titleOptional").addClass("d-none text-muted").removeClass("mark").html("Second Title<br>"))}),$("#businessUnitInput").on("focus",function(){$("#businessUnit").addClass("mark")}),$("#businessUnitInput").on("blur",function(){let t=this.value.trim();e.firstUnitProgram=titleCase(t),this.value=e.firstUnitProgram,$("#businessUnit").html(e.firstUnitProgram).removeClass("text-muted mark"),0===t.length&&(this.value="",e.firstUnitProgram="",$("#businessUnit").addClass("text-muted").removeClass("mark").html("Business Unit or Program"))}),$("#programWebsiteInput").on("focus",function(){$("#programWebsite").removeClass("d-none").addClass("mark")}),$("#programWebsiteInput").on("blur",function(){let t=this.value.trim().toLowerCase();t=t.replace(/http(s)?:\/\//gi,""),e.firstWebsite=t,this.value=e.firstWebsite,$("#programWebsite").html("| "+e.firstWebsite).removeClass("text-muted mark"),0===t.length&&(this.value="",e.firstWebsite="",$("#programWebsite").addClass("d-none text-muted").removeClass("mark").html("| Program Website"))}),$("#businessUnitOptionalInput, #programWebsiteOptionalInput").on("focus",function(){$("#2ndBusinessUnit").removeClass("d-none"),"businessUnitOptionalInput"===this.id&&$("#businessUnitOptional").removeClass("d-none").addClass("mark"),"programWebsiteOptionalInput"===this.id&&($("#businessUnitOptional").removeClass("d-none"),$("#programWebsiteOptional").removeClass("d-none").addClass("mark"))}),$("#businessUnitOptionalInput").on("blur",function(){let t=this.value.trim();e.secondUnitProgram=titleCase(t),this.value=e.secondUnitProgram,$("#businessUnitOptional").html(e.secondUnitProgram).removeClass("text-muted mark"),0===t.length&&(this.value="",e.secondUnitProgram="",$("#businessUnitOptional").addClass("text-muted").removeClass("mark").html("Second Business Unit or Program"),0==e.secondWebsite.length&&($("#2ndBusinessUnit").addClass("d-none"),$("#businessUnitOptional").addClass("d-none")))}),$("#programWebsiteOptionalInput").on("blur",function(){let t=this.value.trim().toLowerCase().replace(/http(s)?:\/\//gi,"");e.secondWebsite=t,this.value=e.secondWebsite,$("#programWebsiteOptional").html("| "+e.secondWebsite).removeClass("text-muted mark"),$("#businessUnitOptionalInput").attr("required",!0),0===t.length&&(this.value="",e.secondWebsite="",$("#programWebsiteOptional").addClass("d-none text-muted").removeClass("mark").html("| Program Website"),0==e.secondUnitProgram.length&&($("#2ndBusinessUnit").addClass("d-none"),$("#businessUnitOptional").addClass("d-none"),$("#businessUnitOptionalInput").attr("required",!1)))}),$("#phoneInput").on("focus",function(){$("#phoneOptional").removeClass("d-none").addClass("mark")}),$("#phoneInput").on("blur",function(){let t=this.value.trim();e.phoneNumber=t,this.value=e.phoneNumber,$("#phoneOptional").html(e.phoneNumber+" |").removeClass("text-muted mark"),0===t.length&&(this.value="",e.phoneNumber="",$("#phoneOptional").addClass("d-none text-muted").removeClass("mark").html("(123) 456-7890 |"))}),$("#emailInput").on("focus",function(){$("#email").removeClass("d-none").addClass("mark")}),$("#emailInput").on("blur",function(){let t=this.value.trim().toLowerCase();e.email=t+"@uwex.edu",this.value=t,$("#email").html(e.email+" |").removeClass("text-muted mark"),0===t.length&&(this.value="",e.email="",$("#email").addClass("d-none text-muted").removeClass("mark").html("first.last@uwex.edu |"))}),$("#signatureForm.needs-validation").on("submit",function(t){t.preventDefault(),t.stopPropagation(),e.valid=this.checkValidity(),$(this).addClass("was-validated"),e.valid?function(){let t=e.firstName+" "+e.middleInitial+" "+e.lastName,n=e.credential.length?", "+e.credential:"",a=e.firstUnitProgram+(e.firstWebsite.length?" | "+e.firstWebsite:""),i=e.phoneNumber.length?e.phoneNumber+" | ":"",l=e.email.length?e.email+" | ":"",r=i+l+"ce.uwex.edu",o="";o+="<p style='color:#000;margin:0in;font-family:\"Calibri\",sans-serif;line-height=0.1in;font-size:11.0pt;'><b>"+t+n+"</b><br>",o+="<b>"+e.firstTitle+"</b><br>",e.secondTitle.length&&(o+="<b>"+e.secondTitle+"</b><br>");if(o+=a+"<br>",e.secondUnitProgram.length){let t=e.secondUnitProgram+(e.secondWebsite.length?" | "+e.secondWebsite:"");o+=t+"<br>"}o+=r,o+="<br><br><img nosend='1' width='199px' height='64px' src='https://media.uwex.edu/app/tools/email-signature-generator/images/logo.jpg' alt='University of Wisconsin Extended Campus' /></p>",$("#artboard").html(o),function(){selectText("artboard");try{var e=document.execCommand("copy");s(e?"success":"unsuccessful")}catch(e){s("error")}window.getSelection().removeAllRanges()}()}():s("missing")}),$(".getSignatureBtn").on("click",function(e){return e.preventDefault(),e.stopPropagation(),$("#submitBtn").click(),!1}),$("#clearBtn").on("click",function(){$("input").not("input[type=button], input[type=submit]").val("").blur(),$("#signatureForm.needs-validation").removeClass("was-validated")})});