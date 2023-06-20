import {useEffect, memo} from 'react';
// import { useState,  memo, useRef } from 'react';

import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import './Login.css'
import Cookies from 'js-cookie';

function Login() {
    useEffect(() => {
        //auth.signInWithRedirect(provider).catch(e => alert(e.message))
        //const email = "rdsambo@gmail.zk";
        const email = Cookies.get("email");
        //const username = Cookies.get("userName");
        console.log("email");
        console.log(email);
        const pass = email;
        const username = email;
        auth.createUserWithEmailAndPassword(email, pass).then(
            (user)=>{
                // value.additionalUserInfo.username = "Sambo";
                // value.user.displayName = "Ramos";
                
                console.log("value.user.email");
                console.log();
                user.user.updateProfile({
                    displayName: username
                }).then(function() {
                    console.log("username atualizado com sucesso!");
                    signIn(email, pass);
                }, function(error) {
                    console.log("Erro ao atulizar username!\nErro:"+error);
                });
                console.log("usuario criado com sucesso!");
            },
            (reason)=>{
                console.log("Erro ao criar usuario usuario! /nErro:"+reason);
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