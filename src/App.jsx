import { useEffect, useState } from "react";
import { useUserStore } from "./lib/userStore";
import Login from "./components/login/Login";
import Games from "./components/games/Games";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const { currentUser, fetchUserInfo } = useUserStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserInfo(user.uid);
            } else {
                fetchUserInfo(null);
            }
        });

        return () => {
          unsubscribe()
        }
    },[fetchUserInfo]);

    return currentUser ? <Games /> : <Login />;
}

export default App;
