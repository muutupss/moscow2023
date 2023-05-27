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

    return fetch(`${CURRENT_URL}/registration`, requestOptions);
  }
}
