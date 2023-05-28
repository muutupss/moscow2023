import React, { useEffect } from 'react';
import './Cabinet.css';
import CabinetCards from './CabinetCards';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';

const Cabinet = observer(() => {
  const navigate = useNavigate();
  const { sharedStore } = useStore();
  const { doesUserInSystem, getListCalculator, listCurrentCalculators } =
    sharedStore;

  useEffect(() => {
    if (!doesUserInSystem) {
      navigate('/');
    } else {
      getListCalculator();
    }
  }, [doesUserInSystem]);

  const handlelistCurrentCalculators = () => {
    if (listCurrentCalculators.length !== 0) {
      return listCurrentCalculators.map((value: any) => {
        <CabinetCards options={value} />;
      });
    }
    return <></>;
  };

  return (
    <>
      <CabinetCards />
      <CabinetCards />
      <CabinetCards />
      <CabinetCards />
      <CabinetCards />
      <CabinetCards />
    </>
  );
});

export default Cabinet;
