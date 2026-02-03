import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  role: string;
  logo?: string;
};

type UserState = {
  user: User | null;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;
  setHasHydrated: (state: boolean) => void;
};

export const userStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      setUser: (user) => set({ user }),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
      clearUser: () => set({ user: null }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "user",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
