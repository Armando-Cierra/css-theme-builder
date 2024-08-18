import { createContext } from 'react';
import type { EditorContextProps } from '@/types';

export const EditorContext = createContext<null | EditorContextProps>(null);
