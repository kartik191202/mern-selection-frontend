// AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import API_BASE from "../config/api";

//const API_BASE = "http://localhost:5000";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('projects');
  
  // Project State
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    image: null
  });
  
  // Client State
  const [clientForm, setClientForm] = useState({
    name: '',
    description: '',
    designation: '',
    image: null
  });
  
  // Lists
  const [contacts, setContacts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts();
    } else if (activeTab === 'newsletters') {
      fetchNewsletters();
    }
  }, [activeTab]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/contact`);
      console.log('Contacts response:', response.data);
      if (response.data.success) {
        setContacts(response.data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      alert('Error fetching contacts. Check console for details.');
    }
  };

  const fetchNewsletters = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/newsletter`);
      console.log('Newsletters response:', response.data);
      if (response.data.success) {
        setNewsletters(response.data.newsletters);
      }
    } catch (error) {
      console.error('Error fetching newsletters:', error);
      alert('Error fetching newsletters. Check console for details.');
    }
  };

  const handleProjectChange = (e) => {
    if (e.target.name === 'image') {
      setProjectForm({
        ...projectForm,
        image: e.target.files[0]
      });
    } else {
      setProjectForm({
        ...projectForm,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', projectForm.name);
    formData.append('description', projectForm.description);
    formData.append('image', projectForm.image);

    try {
      const response = await axios.post(`${API_BASE}/api/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        alert('Project added successfully!');
        setProjectForm({ name: '', description: '', image: null });
        document.getElementById('projectImageInput').value = '';
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project. Please try again.');
    }
  };

  const handleClientChange = (e) => {
    if (e.target.name === 'image') {
      setClientForm({
        ...clientForm,
        image: e.target.files[0]
      });
    } else {
      setClientForm({
        ...clientForm,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', clientForm.name);
    formData.append('description', clientForm.description);
    formData.append('designation', clientForm.designation);
    formData.append('image', clientForm.image);

    try {
      const response = await axios.post(`${API_BASE}/api/clients`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        alert('Client added successfully!');
        setClientForm({ name: '', description: '', designation: '', image: null });
        document.getElementById('clientImageInput').value = '';
      }
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Error adding client. Please try again.');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'projects' ? 'active' : ''} 
            onClick={() => setActiveTab('projects')}
          >
            Add Project
          </button>
          <button 
            className={activeTab === 'clients' ? 'active' : ''} 
            onClick={() => setActiveTab('clients')}
          >
            Add Client
          </button>
          <button 
            className={activeTab === 'contacts' ? 'active' : ''} 
            onClick={() => setActiveTab('contacts')}
          >
            Contact Forms
          </button>
          <button 
            className={activeTab === 'newsletters' ? 'active' : ''} 
            onClick={() => setActiveTab('newsletters')}
          >
            Newsletters
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {/* Add Project Tab */}
        {activeTab === 'projects' && (
          <div className="admin-section">
            <h2>Add New Project</h2>
            <form onSubmit={handleProjectSubmit} className="admin-form">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={projectForm.name}
                  onChange={handleProjectChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Project Description</label>
                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectChange}
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Project Image</label>
                <input
                  type="file"
                  id="projectImageInput"
                  name="image"
                  accept="image/*"
                  onChange={handleProjectChange}
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">Add Project</button>
            </form>
          </div>
        )}

        {/* Add Client Tab */}
        {activeTab === 'clients' && (
          <div className="admin-section">
            <h2>Add New Client</h2>
            <form onSubmit={handleClientSubmit} className="admin-form">
              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  name="name"
                  value={clientForm.name}
                  onChange={handleClientChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Client Description</label>
                <textarea
                  name="description"
                  value={clientForm.description}
                  onChange={handleClientChange}
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Client Designation</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="e.g. CEO, Web Developer, Designer"
                  value={clientForm.designation}
                  onChange={handleClientChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Client Image</label>
                <input
                  type="file"
                  id="clientImageInput"
                  name="image"
                  accept="image/*"
                  onChange={handleClientChange}
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">Add Client</button>
            </form>
          </div>
        )}

        {/* Contact Forms Tab */}
        {activeTab === 'contacts' && (
          <div className="admin-section">
            <h2>Contact Form Submissions</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>City</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.fullName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.mobile}</td>
                      <td>{contact.city}</td>
                      <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {contacts.length === 0 && (
                <p className="no-data">No contact form submissions yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Newsletters Tab */}
        {activeTab === 'newsletters' && (
          <div className="admin-section">
            <h2>Newsletter Subscriptions</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Email Address</th>
                    <th>Subscription Date</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletters.map((newsletter) => (
                    <tr key={newsletter._id}>
                      <td>{newsletter.email}</td>
                      <td>{new Date(newsletter.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {newsletters.length === 0 && (
                <p className="no-data">No newsletter subscriptions yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
