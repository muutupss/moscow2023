import { makeAutoObservable } from 'mobx'

export default class SharedStore {
  user = '1234567890'

  constructor() {
    makeAutoObservable(this)
  }

  setUser = (value: string) => {
    this.user = value;
  }

}

export type SharedStoreType = typeof SharedStore.prototype
export const initSharedStore = {
  user: '1234567890'
}
