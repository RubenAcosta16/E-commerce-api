// hooks/useAuth.ts
import { useEffect } from "react";
import useUser from "../context/userStore";
import { userUrl } from "../config";

interface Props {
  elseFn?: () => void;
  loadingFn?: () => void;
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part) return part.split(";").shift();
  }
};

export const useAuth = ({ elseFn, loadingFn }: Props) => {
  const { currentUser, setCurrentUser } = useUser();

  const token = getCookie("access_token");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        try {
          const response = await fetch(`${userUrl}/protected`, {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            setCurrentUser(data.data);
          } else {
            setCurrentUser(null);

            if (elseFn) {
              elseFn();
            }
          }
        } catch (error) {
          console.error("Error verifying session:", error);
        }
      }
      if (loadingFn) {
        loadingFn();
      }
    };
    checkAuth();
  }, [setCurrentUser]);

  return { currentUser, setCurrentUser };
};
