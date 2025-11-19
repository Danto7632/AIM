import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface SavedDocument {
  id: string;
  name: string;
  agency: string;
  savedAt: string;
  downloadUrl?: string;
}

interface SavedDocumentsContextValue {
  documents: SavedDocument[];
  saveDocuments: (docs: Omit<SavedDocument, 'id' | 'savedAt'>[]) => void;
}

const SavedDocumentsContext = createContext<SavedDocumentsContextValue | undefined>(undefined);

export function SavedDocumentsProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<SavedDocument[]>([]);

  const saveDocuments = (docs: Omit<SavedDocument, 'id' | 'savedAt'>[]) => {
    const timestamp = new Date().toISOString();
    setDocuments((prev) => [
      ...docs.map((doc, idx) => ({
        id: `${timestamp}-${idx}`,
        savedAt: timestamp,
        ...doc,
      })),
      ...prev,
    ]);
  };

  const value = useMemo(() => ({ documents, saveDocuments }), [documents]);

  return (
    <SavedDocumentsContext.Provider value={value}>
      {children}
    </SavedDocumentsContext.Provider>
  );
}

export function useSavedDocuments() {
  const context = useContext(SavedDocumentsContext);
  if (!context) {
    throw new Error('useSavedDocuments must be used within SavedDocumentsProvider');
  }
  return context;
}
