import React, { useEffect } from 'react';
import './Cabinet.css';
import CabinetCards from './CabinetCards';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';
import { isUserInSystemLocalStorage } from '../../helper/auth-header';

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
    return <div>Никаких расчетов пока что нет</div>;
  };

  return (
    <div className="cabinet__margin">
      {handlelistCurrentCalculators(listCurrentCalculators)}
    </div>
  );
});

export default Cabinet;
