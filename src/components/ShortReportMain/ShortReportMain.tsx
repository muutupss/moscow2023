import React from 'react';
import './ShortReportMain.css';
import { Typography } from 'antd';

const { Title } = Typography;

function ShortReportMain() {
  return (
    <>
      <div className="short_report_main_text_title__magin">
        <Title level={3}>Краткий отчет</Title>
      </div>
      <div className="short_report_main_sum">
        <Title level={4}>Сумма ваших вложений</Title>
        <Title level={4}>100-200 тыщ рублей</Title>
      </div>
    </>
  );
}

export default ShortReportMain;
