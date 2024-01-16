import { create } from 'zustand'

const useStore = create((set) => ({
  name: 'Manuel',
  setName: (newName) => set(() => ({ name: newName })),
}))
export default useStore