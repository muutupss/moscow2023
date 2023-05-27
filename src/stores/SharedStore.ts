import { makeAutoObservable } from 'mobx'
import SharedStoreInfoAPI from './SharedStoreAPI'

export default class SharedStore {
  API: any = {}
  user = '1234567890'

  constructor() {
    this.API = new SharedStoreInfoAPI()
    makeAutoObservable(this)
  }

  setUser = (value: string) => {
    this.user = value;
  }

  postRegistrationInfo = (registation: any) => {
    this.API.postRegistrationInfo(registation).then((result: any) => {
      console.log(JSON.stringify(result))
    }
    ).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

}

export type SharedStoreType = typeof SharedStore.prototype
export const initSharedStore = {
  user: '1234567890'
}
