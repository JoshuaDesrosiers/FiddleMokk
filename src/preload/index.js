import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcMain,ipcRenderer } from 'electron';
import path from "path";


if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', {
      cssDir: async () =>ipcRenderer.invoke('getCssDir'),
      cookCss: async (html) => await ipcRenderer.invoke('cookCss',html),
      cook: (html,ref) => ipcRenderer.invoke('cook',html,ref)
    })
    
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
