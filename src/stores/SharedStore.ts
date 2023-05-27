import { makeAutoObservable } from 'mobx'
import SharedStoreInfoAPI from './SharedStoreAPI'

export default class SharedStore {
  API: any = {}
  industries: any = []
  patents: any = []
  districts: any = []
  doesUserInSystem: boolean = false
  currentStepValues: any = {
    "industry_id" : "",
    "worker_count": 0,
    "district_id": 1,
    "land_area": 0,
    "cap_building_area": 0,
    "cap_rebuilding_area": 0,
    "registration_id": 0,
    "tax_id": 0,
    "patent_id": 0,
    "other_payments": 0,
    "equipments": [],
    "buildings": [],
    "calculation_id": 0
  }

  constructor() {
    this.API = new SharedStoreInfoAPI()
    makeAutoObservable(this)
  }

  changeCurrentStepValues = (key: any, value: any) => {
    switch (key) {
      case "equipments":
        this.currentStepValues["equipments"].add(value)
        break;
      case "buildings":
        this.currentStepValues["buildings"].add(value)
        break;
      default:
        this.currentStepValues[key] = value
    }
  }

  postRegistrationInfo = (registation: any) => {
    let mapRegistation = registation

    if (registation.industry_id) {
      mapRegistation.industry_id = this.industries.find((industry: any) => industry.value === mapRegistation.industry_id).id
    }
  
    this.API.postRegistrationInfo(mapRegistation)
    .then((user: any) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.doesUserInSystem = true;
      console.log(JSON.stringify(user))
    }
    ).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  getLogin = (login: any) => {
    this.API.getLogin(login).then((user: any) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.doesUserInSystem = true;
      console.log(JSON.stringify(user))
    }
    ).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.doesUserInSystem = false;
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

  getPatents = () => {
    this.API.getPatents().then((patents: any) => {
    console.log('patents', patents)
    this.patents = patents?.patents.map((patentsValue: any) => {
      return (
      {
      id: patentsValue.id,
      value: patentsValue.name,
      label: patentsValue.name
    })
    });
    }).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  getDistricts = () => {
    this.API.getDistricts().then((districts: any) => {
    console.log('districts', districts)
    this.districts = districts?.districts.map((districtsValue: any) => {
      return (
      {
      id: districtsValue.id,
      value: districtsValue.name,
      label: districtsValue.name
    })
    });
    }).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

}

export type SharedStoreType = typeof SharedStore.prototype
