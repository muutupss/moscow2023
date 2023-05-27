import React from 'react';
import './ShortReportMain.css';
import { Typography } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';

const { Title } = Typography;

const ShortReportMain = observer(() => {
  const { sharedStore } = useStore();
  const { optionsForChart, currentResultsTotal } = sharedStore;
  console.log(currentResultsTotal.total_from, currentResultsTotal.total_to);
  return (
    <>
      <div className="short_report_main_text_title__magin">
        <Title level={3}>Краткий отчет</Title>
      </div>
      <div className="short_report_main_sum">
        <Title level={4}>Сумма ваших вложений</Title>
        <Title level={4}>
          {currentResultsTotal.total_from}-{currentResultsTotal.total_to} тыщ
          рублей
        </Title>
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={optionsForChart} />
      </div>
    </>
  );
});

export default ShortReportMain;
