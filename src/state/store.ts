import create from 'zustand'

type Page = 'home'|'open'|'binder'

interface UIState{page:Page; setPage:(p:Page)=>void}

export const useUI = create<UIState>(set=>({
  page:'home',
  setPage:(p)=>set({page:p})
}))
