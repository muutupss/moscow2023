import React, { useState } from 'react';
import { Button, Steps, message } from 'antd';
import StepFirst from '../Steps/StepFirst';
import StepSecond from '../Steps/StepSecond';
import StepThird from '../Steps/StepThird';

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

const Content = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
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
        {current === 0 && <StepFirst />}
        {current === 1 && <StepSecond />}
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
};

export default Content;
