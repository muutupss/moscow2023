import React from 'react';
import './ShortReportPage.css';
import Header from '../components/Header/Header';
import ShortReportMain from '../components/ShortReportMain/ShortReportMain';
import GoToRegistration from '../components/ShortReportMain/GoToRegistration';
import { isUserInSystemLocalStorage } from '../helper/auth-header';

const ShortReportPage = () => {
  return (
    <div>
      <div className="short_report_page_header">
        <Header />
      </div>
      <div className="short_report_content">
        <ShortReportMain />
      </div>
      {!isUserInSystemLocalStorage() && (
        <div className="short_report_content short_report_content__background">
          <GoToRegistration />
        </div>
      )}
      <div className="empty_block"></div>
    </div>
  );
};

export default ShortReportPage;
