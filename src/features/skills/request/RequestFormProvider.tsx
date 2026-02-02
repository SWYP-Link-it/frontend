'use client';

import { Skill } from '@/src/types/types';
import { createContext, useContext, useState, ReactNode } from 'react';

export type RequestFormType = {
  date: Date;
  time: string;
  message: string;
};

type RequestFormContextType = {
  skillList: Skill[];
  formData: RequestFormType;
  setFormData: (data: Partial<RequestFormType>) => void;
};

const INITIAL_FORM_DATA = {
  date: new Date(),
  time: '',
  message: '',
};

const RequestFormContext = createContext<RequestFormContextType | undefined>(
  undefined,
);

export const RequestFormProvider = ({
  children,
  skillList,
}: {
  children: ReactNode;
  skillList: Skill[];
}) => {
  const [formData, setFormDataState] =
    useState<RequestFormType>(INITIAL_FORM_DATA);

  const setFormData = (data: Partial<RequestFormType>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  };

  return (
    <RequestFormContext.Provider
      value={{
        skillList,
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
