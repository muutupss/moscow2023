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
    "worker_count": 0,
    "district_id": null,
    "land_area": 0,
    "cap_building_area": 0,
    "cap_rebuilding_area": 0,
    "registration_id": null,
    "tax_id": null,
    "patent_id": null,
    "other_payments": null,
    "equipments": [],
    "buildings": [],
    "calculation_id": null
  }
  listCurrentCalculators: any = []
  statsCurrentCalculators: any = []
  equipmentsList: any = []

  doesUserUseCalculatorBeforeReg: boolean = false

  optionsForAdminChart = {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Количество запросов на расчет вложений в день'
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the year
            month: '%e. %b',
            year: '%b'
        },
        title: {
            text: ''
        }
    },
    yAxis: {
      title: {
        text: ''
    },
        min: 0
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y}'
    },

    plotOptions: {
        series: {
            marker: {
                enabled: true,
                radius: 2.5
            }
        }
    },

    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

    // Define the data points. All series have a year of 1970/71 in order
    // to be compared on the same x axis. Note that in JavaScript, months start
    // at 0 for January, 1 for February etc.
    series: [
        {
            name: 'Количество запросов',
            data: []
        }
    ]
}

  optionsForChart = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
      align: 'center',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [{
      name: 'Процент',
      colorByPoint: true,
      data: [
        {
          name: 'Персонал',
          y: 0,
          sliced: true,
          selected: true,
        },
        {
          name: 'Имущество/оборудование',
          y: 0,
        },
        {
          name: 'Налоги',
          y: 0,
        },
        {
          name: 'Услуги (стротельство/ремонт/бухучет)',
          y: 0,
        },
      ],
    },],
  };

  currentResultsTotal: any = {
    "total_from": 0,
    "total_to": 0
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
      if (this.doesUserUseCalculatorBeforeReg) {
        this.postCalculator().then(() => {
          this.doesUserInSystem = true;
        })
      } else {
        this.doesUserInSystem = true;
      }
      this.doesUserUseCalculatorBeforeReg = false;
      console.log(JSON.stringify(user))
    }
    ).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  deleteCard = (id: string) => {
    this.API.deleteCard(id).then(() => {
      this.getListCalculator();
    }).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  postCalculator = () => {
    console.log(JSON.stringify(this.currentStepValues))
    let mapCalculator = {...this.currentStepValues}
    if (this.currentStepValues.industry_id) {
      mapCalculator.industry_id = this.industries.find((industry: any) => industry.value === mapCalculator.industry_id).id
    }
    if (this.currentStepValues.district_id) {
      mapCalculator.district_id = this.districts.find((district: any) => district.value === mapCalculator.district_id).id
    }
    if (this.currentStepValues.registration_id) {
      mapCalculator.registration_id = this.registrationForms.find((registrationForm: any) => registrationForm.value === mapCalculator.registration_id).id
    }
    if (this.currentStepValues.tax_id) {
      mapCalculator.tax_id = this.taxForms.find((taxForm: any) => taxForm.value === mapCalculator.tax_id).id
    }
    if (this.currentStepValues.patent_id) {
      mapCalculator.patent_id = this.patents.find((patent: any) => patent.value === mapCalculator.patent_id).id
    }
    console.log(JSON.stringify(mapCalculator))
    return this.API.postCalculator(mapCalculator).then((result: any) => {
      console.log(result)
      this.optionsForChart.series[0].data[0].y = (result.result.personal_to / result.result.total_to) * 100
      this.optionsForChart.series[0].data[1].y = (result.result.estate_to / result.result.total_to) * 100
      this.optionsForChart.series[0].data[2].y = (result.result.tax_to / result.result.total_to) * 100
      this.optionsForChart.series[0].data[3].y = (result.result.service_to / result.result.total_to) * 100
      this.currentResultsTotal.total_from = result.result.total_from
      this.currentResultsTotal.total_to = result.result.total_to
      this.currentResultsTotal.report_link = result.result.report_link
      this.doesUserUseCalculatorBeforeReg = true
    }).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  getLogin = (login: any, isUserAdmin: boolean) => {
    this.API.getLogin(login).then((user: any) => {
      localStorage.setItem('user', JSON.stringify(user));
      if (isUserAdmin) {
        localStorage.setItem('admin', 'true');
      } else {
        localStorage.removeItem('admin');
      }
      this.doesUserInSystem = true;
      console.log(JSON.stringify(user))
    }
    ).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  resetCurrentStepValues = () => {
    this.currentStepValues = {
      "industry_id" : null,
      "worker_count": 0,
      "district_id": null,
      "land_area": 0,
      "cap_building_area": 0,
      "cap_rebuilding_area": 0,
      "registration_id": null,
      "tax_id": null,
      "patent_id": null,
      "other_payments": null,
      "equipments": [],
      "buildings": [],
      "calculation_id": null
    }
  }

  getListCalculator = () => {
    this.API.getListCalculator().then((result: any) => {
      this.listCurrentCalculators = result.calculations
      console.log(JSON.stringify(result), 'result getListCalculator')
    }
    ).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  getEquipments = () => {
    this.API.getEquipments().then((result: any) => {
      this.equipmentsList = result.equipments
      console.log(JSON.stringify(result), 'result getEquipments')
    }
    ).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

  logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
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

  getStatsCalculator = () => {
    this.API.getStatsCalculator().then((result: any) => {
      this.statsCurrentCalculators = result.stats;
      const mapping = result.stats.map((value: any) => {
        return [Date.parse(value['date']) , value['count']]
      })
      console.log('mapping', mapping)
      this.optionsForAdminChart = {...this.optionsForAdminChart, series: [
        {
            name: 'Количество запросов',
            data: mapping
        }
    ]}
    }).catch((error: any) => {
      console.log(JSON.stringify(error))
    })
  }

}

export type SharedStoreType = typeof SharedStore.prototype
