import { makeAutoObservable } from 'mobx'
import SharedStoreInfoAPI from './SharedStoreAPI'

export default class SharedStore {
  API: any = {}
  industries: any = []

  constructor() {
    this.API = new SharedStoreInfoAPI()
    makeAutoObservable(this)
  }

  postRegistrationInfo = (registation: any) => {
    this.API.postRegistrationInfo(registation)
    .then((user: any) => {
      localStorage.setItem('user', JSON.stringify(user));
      console.log(JSON.stringify(user))
    }
    ).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  getLogin = (login: any) => {
    this.API.getLogin(login).then((user: any) => {
      localStorage.setItem('user', JSON.stringify(user));
      console.log(JSON.stringify(user))
    }
    ).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  getIndustries = () => {
    this.API.getIndustries().then((industries: any) => {
    console.log('industries', industries)
    this.industries = industries?.industries.map((industriesValue: any) => {
      return (
      {
      id: industriesValue.id,
      value: industriesValue.name,
      label: industriesValue.name
    })
    });
    }).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

}

export type SharedStoreType = typeof SharedStore.prototype
