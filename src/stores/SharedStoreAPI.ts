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

    return fetch(`${CURRENT_URL}/authorization`, requestOptions).then(this.handleResponse);
  }

  getIndustries = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
  } as any;

    // return fetch(`${CURRENT_URL}/industries`, requestOptions).then(this.handleResponse);
    return this.getIndustriesPromise
  }

  getIndustriesPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.ind);
    }, 300);
  });

  ind = {
    "industries": [
        {
            "id": 1,
            "name": "Научная деятельность"
        },
        {
            "id": 2,
            "name": "Станкоинструментальная промышленность"
        },
        {
            "id": 3,
            "name": "Автомобильная промышленность"
        },
        {
            "id": 4,
            "name": "Общее машиностроение (в т.ч. оборудование пищевой переработки, дорожногстроительная и сельскохозяйственная техника)"
        },
        {
            "id": 5,
            "name": "Производство кокса и нефтепродуктов"
        },
        {
            "id": 6,
            "name": "Топливно-энергетический комплекс"
        },
        {
            "id": 7,
            "name": "Медицинская промышленность"
        },
        {
            "id": 8,
            "name": "Производство прочих товаров народного потребления"
        },
        {
            "id": 9,
            "name": "Производство ж/д транспорта"
        },
        {
            "id": 10,
            "name": "Радиоэлектроника и приборостроение"
        },
        {
            "id": 11,
            "name": "Химическая промышленность"
        },
        {
            "id": 12,
            "name": "Фармацевтическая промышленность"
        },
        {
            "id": 13,
            "name": "Металлургия и металлообработка"
        },
        {
            "id": 14,
            "name": "Производство напитков"
        },
        {
            "id": 15,
            "name": "Судостроение"
        },
        {
            "id": 16,
            "name": "Полиграфическая деятельность"
        },
        {
            "id": 17,
            "name": "Пищевая промышленность"
        },
        {
            "id": 18,
            "name": "Авиационная промышленность"
        },
        {
            "id": 19,
            "name": "Легкая промышленность"
        },
        {
            "id": 20,
            "name": "Производство строительных материалов"
        },
        {
            "id": 21,
            "name": "Производство оружия, боеприпасов, спецхимии, военных машин"
        },
        {
            "id": 22,
            "name": "Деревообрабатывающая"
        },
        {
            "id": 23,
            "name": "Кабельная промышленность"
        },
        {
            "id": 24,
            "name": "Производство бытовой электроники и электрических приборов"
        },
        {
            "id": 25,
            "name": "Аддитивные технологии"
        }
    ]
}

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
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
