"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { RegistrationForm } from "@/components/ui/Forms";

interface RegistrationContextValue {
  openRegistration: () => void;
  closeRegistration: () => void;
}

const RegistrationContext = createContext<RegistrationContextValue | null>(null);

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error("useRegistration must be used within RegistrationProvider");
  return ctx;
}

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openRegistration = useCallback(() => setOpen(true), []);
  const closeRegistration = useCallback(() => setOpen(false), []);

  return (
    <RegistrationContext.Provider value={{ openRegistration, closeRegistration }}>
      {children}
      <Modal open={open} onClose={closeRegistration} title="Cadastre-se no Dia D">
        <RegistrationForm onSuccess={() => {}} />
      </Modal>
    </RegistrationContext.Provider>
  );
}
