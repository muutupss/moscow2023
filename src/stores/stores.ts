import SharedStore from "./SharedStore"

export const stores = () => {
    const sharedStore = new SharedStore()
    return {
      sharedStore
    }
  }