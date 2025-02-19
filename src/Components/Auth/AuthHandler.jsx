import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useUserContext } from './UserContext';  // Import the custom context

const AuthHandler = () => {
    const { user, isSignedIn } = useUser();
    const { setUser } = useUserContext(); // Get setUser function from context
    const API_URL = `${import.meta.env.VITE_APP_Base_API_URL}User/register`;

    const registerUser = async () => {
        if (!user) return;

        const userData = {
            clerkUserId: user.id,
            username: user.username || user.firstName || "User",
            email: user.primaryEmailAddress?.emailAddress || "",
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            

            const data = await response.json();
            setUser(data);  // Store user data in context
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    useEffect(() => {
        if (isSignedIn) {
            registerUser();
        }
    }, [isSignedIn]);

    return null;
};

export default AuthHandler;
