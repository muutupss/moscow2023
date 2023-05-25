import React from 'react';
import './ShortReportPage.css';
import Header from '../components/Header/Header';
import ShortReportMain from '../components/ShortReportMain/ShortReportMain';

function ShortReportPage() {
  return (
    <div>
      <div className="short_report_page_header">
        <Header />
      </div>
      <div className="short_report_content">
        <ShortReportMain />
      </div>
    </div>
  );
}

export default ShortReportPage;
