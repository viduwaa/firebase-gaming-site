import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../../lib/firebase"; // Assuming you have auth initialized in this file
import { doc, setDoc } from "firebase/firestore";

const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    const [isLogged, setLogin] = useState(false)

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                await setDoc(doc(db, "users", user.uid), {
                    username: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                const email = error.customData.email;
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
            })
            .finally(()=>{
                setLogin(true)
            })
    };

    return (
        <button onClick={signInWithGoogle}>
            <img
                src="./assets/SIwithGoogle.png"
                alt="sign in with google"
                className="w-[12rem] h-auto"
            />
        </button>
    );
};

export default GoogleLogin;
