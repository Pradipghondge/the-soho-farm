"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: 'enquiry' | 'site-visit';
  status: 'Pipeline' | 'Contacted' | 'Closed';
  createdAt: string;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.data);
      } else {
        // Handle error, e.g., redirect to login if not authenticated
        router.push('/admin/login');
      }
    };
    fetchLeads();
  }, [router]);
  
  const handleLogout = async () => {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
  }
  
  const handleStatusChange = async (id: string, newStatus: string) => {
      const res = await fetch(`/api/admin/leads/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
      });

      if(res.ok) {
          setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus as Lead['status'] } : lead));
      } else {
          alert('Failed to update status');
      }
  }

  // Basic styles - will be improved later
  const styles: { [key: string]: React.CSSProperties } = {
      container: { fontFamily: 'sans-serif', padding: '2rem' },
      header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
      table: { width: '100%', borderCollapse: 'collapse', marginTop: '2rem' },
      th: { border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' },
      td: { border: '1px solid #ddd', padding: '8px' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td style={styles.td}>{lead.name}</td>
              <td style={styles.td}>{lead.email}</td>
              <td style={styles.td}>{lead.phone}</td>
              <td style={styles.td}>{lead.type}</td>
              <td style={styles.td}>{new Date(lead.createdAt).toLocaleDateString()}</td>
              <td style={styles.td}>
                <select 
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                >
                    <option value="Pipeline">Pipeline</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
