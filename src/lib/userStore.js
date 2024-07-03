import { create } from "zustand";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const useUserStore = create((set) => ({
    currentUser: null,
    fetchUserInfo: async (uid) => {
        if (uid) {
            try {
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    set({
                        currentUser: docSnap.data(),
                    });
                } else {
                    set({
                        currentUser: null,
                    });
                }
            } catch (e) {
                console.error("Error getting document:", e);
                return set({
                    currentUser: null,
                });
            }
        }
    },
}));
