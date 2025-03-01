// import { create } from 'zustand';
import {UserI} from '../types';


// interface UserState {
//   currentUser: UserI | null;
//   setCurrentUser: (newUser: UserI | null) => void; // Función para actualizar el usuario
// }

// const useUser = create<UserState>((set) => ({
//   currentUser: null, 
//   setCurrentUser: (newUser) => set({ currentUser: newUser }), 
// }));




// userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 🔑 Nuevo middleware

interface UserState {
  currentUser: UserI | null;
  setCurrentUser: (newUser: UserI | null) => void;
}

const useUser = create<UserState>()(
  persist( // 🛡️ Guarda el estado automáticamente
    (set) => ({
      currentUser: null,
      setCurrentUser: (newUser) => set({ currentUser: newUser }),
    }),
    {
      name: 'user-storage', // Nombre único para el localStorage
    }
  )
);

export default useUser;