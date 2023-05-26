import React from 'react';
import './AdminPage.css';
import Header from '../components/Header/Header';
import AdminMain from '../components/Admin/AdminMain';

function AdminPage() {
  return (
    <div>
      <div className="admin_page_header">
        <Header />
      </div>
      <div className="admin_page_content">
        <AdminMain />
      </div>
    </div>
  );
}

export default AdminPage;
