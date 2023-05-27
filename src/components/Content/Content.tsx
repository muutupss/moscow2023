import React, { useEffect, useState } from 'react';
import { Button, Steps, message } from 'antd';
import StepFirst from '../Steps/StepFirst';
import StepSecond from '../Steps/StepSecond';
import StepThird from '../Steps/StepThird';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';

import './Content.css';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    title: 'Бугалтерия',
  },
  {
    title: 'Производство',
  },
  {
    title: 'Оборудование',
  },
];

const Content = observer(() => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const { sharedStore } = useStore();
  const {
    getIndustries,
    getPatents,
    getDistricts,
    changeCurrentStepValues,
    getRegtax,
    industries,
    patents,
    districts,
    currentStepValues,
    registrationForms,
    taxForms,
  } = sharedStore;

  useEffect(() => {
    if (industries.length === 0) {
      getIndustries();
    }
    if (patents.length === 0) {
      getPatents();
    }
    if (districts.length === 0) {
      getDistricts();
    }
    if (taxForms.length === 0 || registrationForms.length === 0) {
      getRegtax();
    }
  }, []);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const handleDoneButton = () => {
    message.info('Рассчитываем ваши затраты...');
    navigate('/shortreport');
  };

  return (
    <div>
      <Steps current={current} items={items} />
      <div className="content_main">
        {current === 0 && (
          <StepFirst
            industries={industries}
            patents={patents}
            registrationForms={registrationForms}
            taxForms={taxForms}
            workerCount={currentStepValues['worker_count']}
            industryId={currentStepValues['industry_id']}
            registrationId={currentStepValues['registration_id']}
            taxId={currentStepValues['tax_id']}
            patentId={currentStepValues['patent_id']}
            changeCurrentStepValues={changeCurrentStepValues}
          />
        )}
        {current === 1 && (
          <StepSecond
            districts={districts}
            landArea={currentStepValues['land_area']}
            districtId={currentStepValues['district_id']}
            capBuildingArea={currentStepValues['cap_building_area']}
            capReBuildingArea={currentStepValues['cap_rebuilding_area']}
            buildings={currentStepValues['buildings']}
            changeCurrentStepValues={changeCurrentStepValues}
          />
        )}
        {current === 2 && <StepThird />}
      </div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleDoneButton}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
});

export default Content;
