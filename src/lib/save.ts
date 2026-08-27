import { CardInstance } from '../data/types'

const SAVE_KEY = 'emoji-tycoon:v1'

export function saveState(data:any){
  try{
    localStorage.setItem(SAVE_KEY, JSON.stringify(data))
  }catch(e){console.error('save error',e)}
}

export function loadState(){
  try{
    const s = localStorage.getItem(SAVE_KEY)
    if(!s) return null
    return JSON.parse(s)
  }catch(e){console.error('load error',e); return null}
}

export function exportSave(data:any){
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'emoji-tycoon-save.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function importSave(file:File):Promise<any>{
  return new Promise((res,rej)=>{
    const r = new FileReader()
    r.onload = ()=>{
      try{ res(JSON.parse(String(r.result))) }catch(e){rej(e)}
    }
    r.onerror = ()=>rej(r.error)
    r.readAsText(file)
  })
}
