import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AdminChart = ({ optionsForChart }: any) => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={optionsForChart} />
    </div>
  );
};

export default AdminChart;
