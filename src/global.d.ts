export {};

declare global {
  interface Window {
    electronAPI: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      on: (...args: Parameters<typeof ipcRenderer.on>) => void;
      off: (...args: Parameters<typeof ipcRenderer.off>) => void;
      send: (...args: Parameters<typeof ipcRenderer.send>) => void;
      invoke: (...args: Parameters<typeof ipcRenderer.invoke>) => void;
    };
  }
}
