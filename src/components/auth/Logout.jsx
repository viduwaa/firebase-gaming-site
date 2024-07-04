import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";

const Logout = () => {
    const { fetchUserInfo } = useUserStore();

    const logout =async () => {
        try {
            signOut(auth)
            fetchUserInfo(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };
    return (
        <button onClick={logout}>
            Log out
        </button>
    );
};

export default Logout;
