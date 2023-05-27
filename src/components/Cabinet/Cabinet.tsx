import React, { useEffect } from 'react';
import './Cabinet.css';
import CabinetCards from './CabinetCards';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';

const Cabinet = observer(() => {
  const navigate = useNavigate();
  const { sharedStore } = useStore();
  const { doesUserInSystem } = sharedStore;

  useEffect(() => {
    if (!doesUserInSystem) {
      navigate('/');
    }
  }, [doesUserInSystem]);
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
