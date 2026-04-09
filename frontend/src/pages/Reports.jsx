import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStats, getItems } from '../features/inventory/inventorySlice';
import { 
  FileText, 
  Download, 
  ChevronDown, 
  Calendar,
  DollarSign,
  TrendingUp,
  Package,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('Stock Levels');
  const dispatch = useDispatch();
  const { stats, items, isLoading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getStats());
    dispatch(getItems());
  }, [dispatch]);

  const tabs = ['Stock Levels', 'Low Stock Alerts', 'Inventory Valuation', 'Activity Trend'];

  const lowStockData = items.filter(item => item.quantity <= (item.threshold || 10));
  
  const valuationData = stats.categoryStock?.map(cat => {
    const catItems = items.filter(i => i.category === cat.category);
    const value = catItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    return { name: cat.category, value };
  }) || [];

  const exportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(229, 57, 53);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('InvenTrack Analytics', 14, 25);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 34);

    doc.setTextColor(33, 33, 33);
    doc.setFontSize(14);
    doc.text(`${activeTab} Report`, 14, 55);

    let tableData = [];
    let tableHead = [];

    if (activeTab === 'Low Stock Alerts') {
      tableHead = [['Item Name', 'Category', 'Current Qty', 'Min Threshold']];
      tableData = lowStockData.map(i => [i.name, i.category, i.quantity, i.threshold || 10]);
    } else if (activeTab === 'Inventory Valuation') {
      tableHead = [['Category', 'Item Count', 'Total Est. Value']];
      tableData = valuationData.map(v => [
        v.name, 
        items.filter(i => i.category === v.name).length, 
        `$${v.value.toLocaleString()}`
      ]);
    } else {
      tableHead = [['Category', 'Count', 'Status']];
      tableData = stats.categoryStock?.map(s => [s.category, s.count, 'Active']) || [];
    }

    doc.autoTable({
      startY: 65,
      head: tableHead,
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [229, 57, 53], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    doc.save(`InvenTrack_${activeTab.replace(/\s+/g, '_')}.pdf`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Low Stock Alerts':
        return (
          <div className='card fade-in'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h4 style={{ fontWeight: 600 }}>Critical Inventory Items</h4>
              <span style={{ fontSize: '12px', padding: '4px 12px', backgroundColor: '#FFEBEE', color: '#E53935', borderRadius: '100px', fontWeight: 600 }}>
                {lowStockData.length} Items Restricted
              </span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #EEE', textAlign: 'left' }}>
                  <th style={{ padding: '12px 0', color: '#666', fontSize: '13px' }}>ITEM</th>
                  <th style={{ padding: '12px 0', color: '#666', fontSize: '13px' }}>CATEGORY</th>
                  <th style={{ padding: '12px 0', color: '#666', fontSize: '13px' }}>QTY</th>
                  <th style={{ padding: '12px 0', color: '#666', fontSize: '13px' }}>MIN</th>
                  <th style={{ padding: '12px 0', color: '#666', fontSize: '13px' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {lowStockData.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #FAFAFA' }}>
                    <td style={{ padding: '16px 0', fontWeight: 500 }}>{item.name}</td>
                    <td style={{ padding: '16px 0', color: '#666' }}>{item.category}</td>
                    <td style={{ padding: '16px 0', color: '#E53935', fontWeight: 700 }}>{item.quantity}</td>
                    <td style={{ padding: '16px 0' }}>{item.threshold || 10}</td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#FFEBEE', color: '#E53935', borderRadius: '4px' }}>REORDER</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'Inventory Valuation':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className='card fade-in'>
              <h4 style={{ fontWeight: 600, marginBottom: '24px' }}>Asset Distribution</h4>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={valuationData}>
                    <XAxis dataKey="name" hide />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Area type="monotone" dataKey="value" stroke="#E53935" fill="#E5393533" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className='card fade-in'>
              <h4 style={{ fontWeight: 600, marginBottom: '24px' }}>Category Breakout</h4>
              {valuationData.map((v, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                    <span>{v.name}</span>
                    <span style={{ fontWeight: 700 }}>${v.value.toLocaleString()}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#F0F0F0', borderRadius: '3px' }}>
                    <div style={{ 
                      width: `${(v.value / stats.totalValue) * 100}%`, 
                      height: '100%', 
                      backgroundColor: '#E53935', 
                      borderRadius: '3px' 
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Activity Trend':
        return (
          <div className='card fade-in'>
             <h4 style={{ fontWeight: 600, marginBottom: '24px' }}>Stock Movement (Simulated)</h4>
             <div style={{ height: '400px' }}>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={[
                    { time: '09:00', in: 400, out: 240 },
                    { time: '12:00', in: 300, out: 139 },
                    { time: '15:00', in: 200, out: 980 },
                    { time: '18:00', in: 278, out: 390 },
                    { time: '21:00', in: 189, out: 480 },
                  ]}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area name="Stock In" dataKey="in" stroke="#43A047" fill="#43A04733" />
                    <Area name="Stock Out" dataKey="out" stroke="#E53935" fill="#E5393533" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        )

      default: // Stock Levels
        return (
          <div className='card fade-in'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h4 style={{ fontWeight: 600 }}>Quantities by Category</h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                  <Download size={16} color='#666' style={{ cursor: 'pointer' }} />
              </div>
            </div>
            <div style={{ height: '400px' }}>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={stats.categoryStock}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#F0F0F0' />
                  <XAxis dataKey='category' axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#FAFAFA' }} />
                  <Bar dataKey='count' fill='#E53935' radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
    }
  };

  return (
    <div className='fade-in'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Intelligent Reports</h2>
          <p style={{ color: '#666' }}>Real-time data visualization and deep inventory insights.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className='btn btn-outline' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} />
            Period: Last 30 Days
            <ChevronDown size={14} />
          </button>
          <button 
            className='btn btn-primary' 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(229, 57, 53, 0.2)' }}
            onClick={exportPDF}
          >
            <Download size={18} />
            Export Summary
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #E0E0E0', marginBottom: '32px' }}>
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '12px 24px', 
              fontSize: '14px', 
              fontWeight: activeTab === tab ? 700 : 500, 
              color: activeTab === tab ? '#E53935' : '#666',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '3px solid #E53935' : 'none',
              marginBottom: '-2px',
              transition: 'all 0.2s ease'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {[
          { label: 'Market Value', value: `$${stats.totalValue.toLocaleString()}`, icon: DollarSign, color: '#43A047' },
          { label: 'Active SKUs', value: stats.totalItems, icon: Package, color: '#E53935' },
          { label: 'Low Stock', value: lowStockData.length, icon: AlertCircle, color: '#EF6C00' },
          { label: 'Category Count', value: stats.categoryStock?.length || 0, icon: TrendingUp, color: '#1E88E5' }
        ].map((item, idx) => (
          <div key={idx} className='card' style={{ border: 'none', borderLeft: `4px solid ${item.color}`, backgroundColor: 'var(--surface-low)', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#999', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>{item.label.toUpperCase()}</p>
                <h3 style={{ fontSize: '22px', fontWeight: 800 }}>{item.value}</h3>
              </div>
              <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: `${item.color}10` }}>
                <item.icon size={18} color={item.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Content */}
      <div style={{ marginBottom: '40px' }}>
        {renderTabContent()}
      </div>

      {/* Footer Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className='card' style={{ backgroundColor: 'var(--surface-lowest)', color: 'var(--on-surface)', border: `1px solid var(--border)` }}>
            <h4 style={{ marginBottom: '16px', fontWeight: 600 }}>System Optimization Tip</h4>
            <p style={{ fontSize: '14px', color: '#AAA', lineHeight: 1.6 }}>Your inventory turnover for Pharmaceuticals is 15% higher than average. Consider increasing reorder thresholds to prevent stockouts.</p>
          </div>
          <div className='card' style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: 'var(--surface-low)', border: '1px dashed var(--border)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#E53935', display: 'flex', alignItems: 'center', justifyItems: 'center', color: '#fff' }}>
              <TrendingUp size={24} style={{ margin: 'auto' }} />
            </div>
            <div>
              <h4 style={{ fontWeight: 600, fontSize: '15px' }}>Projected Stock Value</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>Next 30 days: <span style={{ color: '#43A047', fontWeight: 700 }}>+$1,240.00</span> based on current trends.</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Reports;
