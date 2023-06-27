import {useEffect, memo} from 'react';
// import { useState,  memo, useRef } from 'react';

import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import './Login.css'
import Cookies from 'js-cookie';

function Login() {
    useEffect(() => {
        //auth.signInWithRedirect(provider).catch(e => alert(e.message))
        const email = "rdsambo@gmail.zk";
		function getCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}
		function eraseCookie(name) {   
			document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
        //const email = getCookie("email");
		
        //const username = Cookies.get("userName");
        //console.log("email");
        //console.log(email);
        const pass = email;
        const username = email;
        auth.createUserWithEmailAndPassword(email, pass).then(
            (user)=>{
                // value.additionalUserInfo.username = "Sambo";
                // value.user.displayName = "Ramos";
                
                //console.log("value.user.email");
                //console.log();
                user.user.updateProfile({
                    displayName: username
                }).then(function() {
                    //console.log("username atualizado com sucesso!");
                    signIn(email, pass);
                }, function(error) {
                    //console.log("Erro ao atulizar username!\nErro:"+error);
                });
                //console.log("usuario criado com sucesso!");
            },
            (reason)=>{
                //console.log("Erro ao criar usuario usuario! /nErro:"+reason);
                signIn(email, pass);
            }
        )
    })
    const signIn = function (email, pass){
        auth.signInWithEmailAndPassword(email, pass);
    }

    // auth.currentUser.uid
    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    alt=""
                />
                <div className="login__text">
                    <h1>...</h1>
                </div>

                {/* <Button onClick={createUser}>
                    Sign in with Google
                </Button> */}
            </div>
        </div>
    )
}

export default memo(Login)