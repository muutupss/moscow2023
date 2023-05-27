import { makeAutoObservable } from 'mobx'
import SharedStoreInfoAPI from './SharedStoreAPI'

export default class SharedStore {
  API: any = {}
  industries: any = []
  patents: any = []
  districts: any = []
  registrationForms: any = []
  taxForms: any = []
  doesUserInSystem: boolean = false
  currentStepValues: any = {
    "industry_id" : null,
    "worker_count": null,
    "district_id": null,
    "land_area": null,
    "cap_building_area": null,
    "cap_rebuilding_area": null,
    "registration_id": null,
    "tax_id": null,
    "patent_id": null,
    "other_payments": null,
    "equipments": [],
    "buildings": [],
    "calculation_id": null
  }

  constructor() {
    this.API = new SharedStoreInfoAPI()
    makeAutoObservable(this)
  }

  changeCurrentStepValues = (key: any, value: any) => {
    console.log(key, value, 'mzzz')
    switch (key) {
      case "equipments":
        this.currentStepValues["equipments"] = [...this.currentStepValues["equipments"], value]
        break;
      case "buildings":
        this.currentStepValues["buildings"] = [...this.currentStepValues["buildings"], value]
        break;
      default:
        this.currentStepValues[key] = value
        break;
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

  getRegtax = () => {
    this.API.getRegtax().then((regtax: any) => {
    console.log('regtax', regtax)
    this.registrationForms = regtax?.data['registration_forms'].map((regtaxValue: any) => {
      return (
      {
      id: regtaxValue.id,
      value: regtaxValue.name,
      label: regtaxValue.name
    })
    });
    this.taxForms = regtax?.data['tax_forms'].map((regtaxValue: any) => {
      return (
      {
      id: regtaxValue.id,
      value: regtaxValue.name,
      label: regtaxValue.name
    })
    });
    }).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

}

export type SharedStoreType = typeof SharedStore.prototype
