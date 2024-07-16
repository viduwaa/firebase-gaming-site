import { useEffect, useState } from "react";
import { useUserStore } from "./lib/userStore";
import Login from "./components/auth/Login";
import Games from "./components/home/Games";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "./components/loader/Loader";

function App() {
    const { currentUser,isLoading, fetchUserInfo } = useUserStore();

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

    if (isLoading) {
        return <Loader/>;
    }

    return currentUser ? <Games className="m-auto h-dvh w-4/5 border"/> : <Login />;
}

export default App;
