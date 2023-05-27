const CURRENT_URL = 'http://188.72.108.129:8080'

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
