import React, { useEffect, useState } from 'react';
import { Button, Steps, message, Typography, Divider } from 'antd';
import StepFirst from '../Steps/StepFirst';
import StepSecond from '../Steps/StepSecond';
import StepThird from '../Steps/StepThird';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';

import './Content.css';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const steps = [
  {
    title: 'Бухгалтерия',
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
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();

  const { sharedStore } = useStore();
  const {
    getIndustries,
    getPatents,
    getDistricts,
    changeCurrentStepValues,
    getRegtax,
    postCalculator,
    getEquipments,
    industries,
    patents,
    districts,
    currentStepValues,
    registrationForms,
    taxForms,
    equipmentsList,
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
    if (equipmentsList.length === 0) {
      getEquipments();
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
    postCalculator().then(() => navigate('/shortreport'));
  };

  const changeDisableButton = (value: boolean) => {
    setIsDisable(value);
  };

  return (
    <div>
      <Title
        style={{ marginTop: '20px', marginBottom: '35px', textAlign: 'center' }}
        level={4}
      >
        Ответьте на следующие вопросы, и умный сервис рассчитает необходимые
        вложения
      </Title>
      <Divider />
      <div className="content__padding_center">
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
              changeDisableButton={changeDisableButton}
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
          {current === 2 && (
            <StepThird
              equipments={currentStepValues['equipments']}
              equipmentsList={equipmentsList}
              changeCurrentStepValues={changeCurrentStepValues}
            />
          )}
        </div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button disabled={isDisable} type="primary" onClick={() => next()}>
              Далее
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleDoneButton}>
              Рассчитать
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Назад
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

export default Content;
