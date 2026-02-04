'use client';

import { SkillInfo } from '@/src/types/skill';
import { createContext, useContext, useState, ReactNode } from 'react';

export type RequestFormData = {
  date: Date;
  time: string;
  message: string;
};

type RequestFormContextType = {
  skillList: SkillInfo[];
  formData: RequestFormData;
  setFormData: (data: Partial<RequestFormData>) => void;
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
  skillList: SkillInfo[];
}) => {
  const [formData, setFormDataState] =
    useState<RequestFormData>(INITIAL_FORM_DATA);

  const setFormData = (data: Partial<RequestFormData>) => {
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
