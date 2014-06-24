/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.num();
        app.rxpush();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    appel: function(tel){
    phonedialer.dial(
      tel, 
      function(err) {
        if (err == "empty") alert("Unknown phone number");
        else alert("Dialer Error:" + err);    
      },
      function(success) { alert('Dialing succeeded'); }
     );
    },
    rxpush:function() {
        window.plugins.webintent.hasExtra('com.parse.Data',
            function(has) {
                if (has) {
                    // has is true iff it has the extra
                    console.error('extra was gettable');
                    window.plugins.webintent.getExtra('com.parse.Data',
                        function(data) {

                            var data = JSON.stringify(data),
                                data = data.replace(/[\\]/g, '').replace(/[\/]/g, ''),
                                data = data.replace(/"(.+)"/, "$1"),
                                data = $.parseJSON(data);

                            Parse.history.navigate('notification/' + data.pid, true);

                            // if user authenticated already just route 
                            // if not authenticate then route...
                            //AppUser.authenticate();
                        }, function() {
                            // There was no extra supplied.
                            console.error('extra was NOT gettable');
                        }
                    );
                } else {
                    console.error('extra was NOT supplied');
                }
            }, function() {
                // Something really bad happened.
                console.error('Something really bad happened');
            }
        );
    },
    num: function() {
    var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
    telephoneNumber.get(function(result) {
            //alert(result);
            //localStorage.setItem("numero", result);
            var indicatif = result.substr(0,2)
            if(indicatif != "61") if(indicatif != "62") if( indicatif != "66" ) if(indicatif != "67") if(indicatif != "96") if(indicatif != "97")
                {$('.received').html("Désolé! Je ne connais que les incentation de MTN ! ");
                $('.mynumber').html("");}
            else {$('.received').html("<a href='app.html' class='btn'>..abra kada braa..</a>");
                  $('.mynumber').html("<i class='fa fa-phone'></i>  "+result);}
        }, function() {
            //alert("error");
            $('.mynumber').html("Je ne connais pas ton numéro!");
        });
    },
    sms: function(num, msg){
            var intent = ""; //leave empty for sending sms using default intent
            var success = function () { alert('Message sent successfully'); };
            var error = function (e) { alert('Message Failed:' + e); };
            sms.send(num, msg, intent, success, error);
    },
    signup: function(username, password, email, phone){
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        user.set("phone", phone);

        user.signUp(null, {
          success: function(user) {
            // Hooray! Let them use the app now.
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
          }
        });    
    },
    login: function(username, password){
        Parse.User.logIn(username, password, {
          success: function(user) {
            // Do stuff after successful login.
          },
          error: function(user, error) {
            // The login failed. Check error to see why.
          }
        });
    },
    logout:function(){
        Parse.User.logOut();
 
        var currentUser = Parse.User.current();  // this will now be null
    },
    checkuser:function(){
        var currentUser = Parse.User.current();
        if (currentUser) {
            // do stuff with the user
        } else {
            // show the signup or login page
        }
    },
    saveinfos:function(){
        var nom = $('#nom').val(),
            prenom = $('#prenom').val(),
            numero = $('#numero').val(),
            email = $('#email').val(),
            ville = $('#ville').val(),
            cmomo = $('#cmomo').val(),
            cme2u = $('#cme2u').val(),
            csim = $('#csim').val();
            
        //alert(nom+prenom+numero+email+ville+cmomo+cme2u+csim);
        window.localStorage.setItem('nom',nom );
        window.localStorage.setItem('prenom',prenom);
        window.localStorage.setItem('numero',numero);
        window.localStorage.setItem('email',email);
        window.localStorage.setItem('ville',ville);
        window.localStorage.setItem('cmomo',cmomo);
        window.localStorage.setItem('cme2u',cme2u);
        window.localStorage.setItem('csim',csim);
        
    },
    getinfos:function(){
        var nom = window.localStorage.getItem('nom'),
            prenom = window.localStorage.getItem('prenom'),
            numero = window.localStorage.getItem('numero'),
            email = window.localStorage.getItem('email'),
            ville = window.localStorage.getItem('ville'),
            cmomo = window.localStorage.getItem('cmomo'),
            cme2u = window.localStorage.getItem('cme2u'),
            csim = window.localStorage.getItem('csim');
        
        $('#nom').val(nom),
        $('#prenom').val(prenom),
        $('#numero').val(numero),
        $('#email').val(email),
        $('#ville').val(ville),
        $('#cmomo').val(cmomo),
        $('#cme2u').val(cme2u),
        $('#csim').val(csim);       
        
    },
    pickcont: function(){
        window.plugins.ContactPicker.chooseContact(function(contactInfo) {
            alert(contactInfo.displayName + " " + contactInfo.email);
        });
    }

};
