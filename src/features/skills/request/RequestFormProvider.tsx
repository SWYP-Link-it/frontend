'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type RequestFormType = {
  skillId: number;
  date: Date;
  time: string;
  message: string;
};

type RequestFormContextType = {
  formData: RequestFormType;
  setFormData: (data: Partial<RequestFormType>) => void;
};

const createFormData = (skillId: number) => ({
  skillId,
  date: new Date(),
  time: '',
  message: '',
});

const RequestFormContext = createContext<RequestFormContextType | undefined>(
  undefined,
);

export const RequestFormProvider = ({
  children,
  skillId,
}: {
  children: ReactNode;
  skillId: number;
}) => {
  const [formData, setFormDataState] = useState<RequestFormType>(
    createFormData(skillId),
  );

  const setFormData = (data: Partial<RequestFormType>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  };

  return (
    <RequestFormContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      {children}
    </RequestFormContext.Provider>
  );
};

export const useRequestForm = () => {
  const context = useContext(RequestFormContext);
  if (!context) {
    throw new Error('useRequestForm must be used within RequestFormProvider');
  }
  return context;
};
