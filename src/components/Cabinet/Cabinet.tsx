import React, { useEffect } from 'react';
import './Cabinet.css';
import CabinetCards from './CabinetCards';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';
import { isUserInSystemLocalStorage } from '../../helper/auth-header';
import { Typography } from 'antd';

const { Title } = Typography;

const Cabinet = observer(() => {
  const navigate = useNavigate();
  const { sharedStore } = useStore();
  const {
    doesUserInSystem,
    getListCalculator,
    getIndustries,
    deleteCard,
    listCurrentCalculators,
    industries,
  } = sharedStore;

  useEffect(() => {
    if (!isUserInSystemLocalStorage()) {
      navigate('/');
    } else {
      getListCalculator();
      getIndustries();
    }
  }, [doesUserInSystem]);

  const handlelistCurrentCalculators = (list: any) => {
    if (list.length !== 0) {
      return list.map((value: any) => {
        return (
          <CabinetCards
            key={value.ID}
            options={value}
            industries={industries}
            deleteCard={deleteCard}
          />
        );
      });
    }
    return (
      <div className="cabinet_none">
        <Title style={{ margin: 0 }} level={2}>
          Данных пока нет{' '}
        </Title>
        <Title style={{ margin: 0 }} level={2}>
          (Здесь будут находиться ваши отчеты)
        </Title>
      </div>
    );
  };

  return (
    <div className="cabinet__margin">
      {handlelistCurrentCalculators(listCurrentCalculators)}
    </div>
  );
});

export default Cabinet;
