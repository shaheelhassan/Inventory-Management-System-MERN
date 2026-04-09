import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStats, getItems } from '../features/inventory/inventorySlice';
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, items, isLoading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getStats());
    dispatch(getItems('?sortBy=createdAt:desc&limit=5'));
  }, [dispatch]);

  const COLORS = ['#E53935', '#FB8C00', '#FDD835', '#43A047', '#1E88E5', '#8E24AA'];

  const exportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(229, 57, 53);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('InvenTrack Dashboard Summary', 14, 25);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 34);

    doc.setTextColor(33, 33, 33);
    doc.setFontSize(14);
    doc.text(`Inventory Health Overview`, 14, 55);

    // Summary Cards Data
    const summaryData = [
      ['Total SKUs', stats.totalItems],
      ['Low Stock Items', stats.lowStockItems],
      ['Expired Items', stats.expiredItems],
      ['Total Inventory Value', `$${stats.totalValue.toLocaleString()}`]
    ];

    doc.autoTable({
      startY: 65,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [229, 57, 53], textColor: [255, 255, 255] }
    });

    // Recent Items
    doc.text('Recent Inventory Activity', 14, doc.lastAutoTable.finalY + 15);
    const tableData = items.slice(0, 10).map(i => [i.name, i.sku, i.category, i.quantity, `$${i.price}`]);
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Name', 'SKU', 'Category', 'Qty', 'Price']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [51, 51, 51], textColor: [255, 255, 255] }
    });

    doc.save('InvenTrack_Dashboard_Summary.pdf');
  };

  if (isLoading && items.length === 0) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading dashboard...</div>;

  return (
    <div className='fade-in'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Dashboard</h2>
          <p style={{ color: '#666' }}>Welcome back! Here's what's happening with your inventory today.</p>
        </div>
        <button 
          onClick={exportPDF}
          className='btn btn-primary' 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <TrendingUp size={18} />
          Generate Report
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <div className='card' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#E3F2FD', color: '#1E88E5', padding: '12px', borderRadius: '12px' }}>
            <Package size={24} />
          </div>
          <div>
            <p style={{ fontSize: '14px', color: '#666', fontWeight: 500 }}>Total Items</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700 }}>{stats.totalItems.toLocaleString()}</h3>
          </div>
        </div>

        <div className='card' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#FFF3E0', color: '#FB8C00', padding: '12px', borderRadius: '12px' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <p style={{ fontSize: '14px', color: '#666', fontWeight: 500 }}>Low Stock</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700 }}>{stats.lowStockItems}</h3>
          </div>
        </div>

        <div className='card' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#FFEBEE', color: '#E53935', padding: '12px', borderRadius: '12px' }}>
            <Clock size={24} />
          </div>
          <div>
            <p style={{ fontSize: '14px', color: '#666', fontWeight: 500 }}>Expired Items</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700 }}>{stats.expiredItems}</h3>
          </div>
        </div>

        <div className='card' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#E8F5E9', color: '#43A047', padding: '12px', borderRadius: '12px' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <p style={{ fontSize: '14px', color: '#666', fontWeight: 500 }}>Total Value</p>
            <h3 style={{ fontSize: '24px', fontWeight: 700 }}>${stats.totalValue.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div className='card'>
          <h4 style={{ marginBottom: '24px', fontWeight: 600 }}>Stock by Category</h4>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={stats.categoryStock}>
                <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#F0F0F0' />
                <XAxis dataKey='category' axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#F8F9FA' }}
                />
                <Bar dataKey='count' fill='#E53935' radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='card'>
          <h4 style={{ marginBottom: '24px', fontWeight: 600 }}>Category Distribution</h4>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={stats.categoryStock}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey='count'
                >
                  {stats.categoryStock.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className='card'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h4 style={{ fontWeight: 600 }}>Recent Activity</h4>
          <button style={{ color: '#E53935', fontSize: '14px', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View All <ArrowRight size={14} />
          </button>
        </div>
        
        <div className='table-container'>
          <table className='data-table'>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.slice(0, 5).map((item) => (
                <tr key={item._id}>
                  <td style={{ fontWeight: 500 }}>{item.name}</td>
                  <td style={{ color: '#666' }}>{item.sku}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span className={`badge badge-${item.quantity < 20 ? 'warning' : 'success'}`}>
                      {item.quantity < 20 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>${item.price}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan='6' style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No recent items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
