import React from 'react';
import './ShortReportMain.css';
import { Button, Divider, Typography } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { isUserInSystemLocalStorage } from '../../helper/auth-header';

const { Title } = Typography;

const ShortReportMain = observer(() => {
  const { sharedStore } = useStore();
  const { optionsForChart, currentResultsTotal } = sharedStore;
  console.log(currentResultsTotal.total_from, currentResultsTotal.total_to);
  return (
    <div>
      <Title
        style={{ marginTop: '20px', marginBottom: '35px', textAlign: 'center' }}
        level={4}
      >
        Краткий отчет
      </Title>
      <Divider />
      <div className="short_report__padding_center">
        <div className="short_report_main_sum">
          <Title style={{ margin: '0px' }} level={4}>
            Сумма ваших вложений
          </Title>
          <Title style={{ margin: '0px' }} level={4}>
            {currentResultsTotal.total_from}-{currentResultsTotal.total_to} тыщ
            рублей
          </Title>
        </div>
        <div>
          <HighchartsReact highcharts={Highcharts} options={optionsForChart} />
        </div>
      </div>
      {isUserInSystemLocalStorage() && (
        <div className="short_report_button">
          <Button danger>
            <a href={currentResultsTotal.report_link} target="_blank">
              Скачать отчет
            </a>
          </Button>
        </div>
      )}
    </div>
  );
});

export default ShortReportMain;
