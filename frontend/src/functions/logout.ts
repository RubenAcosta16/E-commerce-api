import { userUrl } from "../config";
import { UserI } from "../types";

export const handleLogout = (
  setCurrentUser: (newUser: UserI | null) => void
) => {
  async function tryIt() {
    try {
      const response = await fetch(`${userUrl}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setCurrentUser(null);
        localStorage.removeItem("user-storage");
        alert("Logout successful!");
      } else {
        alert("Error: Unable to logout.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  tryIt();
};
