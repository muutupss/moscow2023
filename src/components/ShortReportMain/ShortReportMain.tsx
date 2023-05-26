import React from 'react';
import './ShortReportMain.css';
import { Typography } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const { Title } = Typography;

const options = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: '',
    align: 'center',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      data: [
        {
          name: 'Строительство',
          y: 70,
          sliced: true,
          selected: true,
        },
        {
          name: 'Зарплата',
          y: 15,
        },
        {
          name: 'Оборудование',
          y: 5,
        },
        {
          name: 'Налоги',
          y: 10,
        },
        {
          name: 'Серые',
          y: 5,
        },
      ],
    },
  ],
};

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
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}

export default ShortReportMain;
