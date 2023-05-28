import { authHeader } from '../helper/auth-header'
const CURRENT_URL = 'http://94.139.252.175:8080'

export default class SharedStoreInfoAPI {
  SFapi: any = {}

  logEvent = (event: string, message: string) => {
    return this.SFapi.logEvent({ event, message })
  }

  postRegistrationInfo = (registation: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(registation)
  } as any;

    return fetch(`${CURRENT_URL}/registration`, requestOptions).then(this.handleResponse);
  }

  getLogin = (login: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(login)
  } as any;
    console.log('login', login)
    return fetch(`${CURRENT_URL}/authorization`, requestOptions).then(this.handleResponse);
  }

  getIndustries = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
  } as any;

    return fetch(`${CURRENT_URL}/industries`, requestOptions).then(this.handleResponse);
  }

  getPatents = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
  } as any;

    return fetch(`${CURRENT_URL}/patents`, requestOptions).then(this.handleResponse);
  }

  getDistricts = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
  } as any;

    return fetch(`${CURRENT_URL}/districts`, requestOptions).then(this.handleResponse);
  }

  getRegtax = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
  } as any;

    return fetch(`${CURRENT_URL}/regtax`, requestOptions).then(this.handleResponse);
  }

  postCalculator = (mapCalculator: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json'},
      body: JSON.stringify(mapCalculator)
  } as any;

    //return this.myPromise
    return fetch(`${CURRENT_URL}/calculator`, requestOptions).then(this.handleResponse);
  }

  getListCalculator = () => {
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json'},
  } as any;

    //return this.myPromise
    return fetch(`${CURRENT_URL}/calculations/list`, requestOptions).then(this.handleResponse);
  }

  deleteCard = (id: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { ...authHeader(), 'Content-Type': 'application/json'},
  } as any;

    //return this.myPromise
    return fetch(`${CURRENT_URL}/calculations/${id}`, requestOptions).then(this.handleResponse);
  }

  myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.data);
    }, 300);
  });

  data = {
    "personal_from" : 100,
    "personal_to": 200,
    "estate_from": 100,
    "estate_to": 300,
    "tax_from": 100,
    "tax_to": 400,
    "service_from": 10,
    "service_to": 50,
    "total_from": 600,
    "total_to": 950,
  }

  handleResponse(response : any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
              console.log('401')
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }
  
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
  
        return data;
    });
  }
}
