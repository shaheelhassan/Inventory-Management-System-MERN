import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, createItem, updateItem, deleteItem, reset } from '../features/inventory/inventorySlice';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  X,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Clock
} from 'lucide-react';

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: '',
    supplier: '',
    purchaseDate: '',
    expiryDate: '',
    price: '',
  });

  const dispatch = useDispatch();
  const { items, isLoading, isError, message } = useSelector((state) => state.inventory);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getItems());
    return () => dispatch(reset());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    let query = `?search=${searchTerm}`;
    if (categoryFilter !== 'All') query += `&category=${categoryFilter}`;
    if (statusFilter !== 'All') query += `&status=${statusFilter}`;
    dispatch(getItems(query));
  };

  const onAddClick = () => {
    setEditMode(false);
    setFormData({
      name: '',
      sku: '',
      category: '',
      quantity: 0,
      supplier: '',
      purchaseDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      price: 0,
    });
    setIsModalOpen(true);
  };

  const onEditClick = (item) => {
    setEditMode(true);
    setCurrentItem(item);
    setFormData({
      name: item.name,
      sku: item.sku,
      category: item.category,
      quantity: item.quantity,
      supplier: item.supplier,
      purchaseDate: item.purchaseDate?.split('T')[0],
      expiryDate: item.expiryDate?.split('T')[0] || '',
      price: item.price,
    });
    setIsModalOpen(true);
  };

  const onDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteItem(id));
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateItem({ id: currentItem._id, itemData: formData }));
    } else {
      dispatch(createItem(formData));
    }
    setIsModalOpen(false);
  };

  const categories = ['All', 'Electronics', 'Pharmaceutical', 'Food & Beverage', 'Clothing', 'Tools', 'Office Supplies'];

  return (
    <div className='fade-in'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Inventory Items</h2>
          <p style={{ color: '#666' }}>Manage and track your entire stock catalog with precision.</p>
        </div>
        <button className='btn btn-primary' style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={onAddClick}>
          <Plus size={18} />
          Add Inventory
        </button>
      </div>

      {/* Filter Row */}
      <div className='card' style={{ marginBottom: '24px', padding: '16px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '8px', fontWeight: 600 }}>SEARCH ITEMS</label>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} size={16}/>
              <input 
                type='text' 
                placeholder='Item name or SKU...' 
                className='search-input' 
                style={{ paddingLeft: '36px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '8px', fontWeight: 600 }}>CATEGORY</label>
            <select 
              className='search-input' 
              style={{ cursor: 'pointer' }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>

          <div style={{ width: '200px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '8px', fontWeight: 600 }}>STATUS</label>
            <select 
              className='search-input' 
              style={{ cursor: 'pointer' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Expired</option>
            </select>
          </div>

          <button type='submit' className='btn btn-outline' style={{ height: '42px', minWidth: '100px' }}>
            Filter
          </button>
        </form>
      </div>

      {/* Main Table */}
      <div className='table-container'>
        <table className='data-table'>
          <thead>
            <tr>
              <th>ITEM NAME</th>
              <th>SKU</th>
              <th>CATEGORY</th>
              <th>QUANTITY</th>
              <th>PRICE</th>
              <th>SUPPLIER</th>
              <th>STATUS</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td style={{ fontWeight: 500 }}>{item.name}</td>
                <td style={{ color: '#666', fontSize: '13px' }}>{item.sku}</td>
                <td>{item.category}</td>
                <td style={{ fontWeight: 600 }}>{item.quantity}</td>
                <td style={{ fontWeight: 600 }}>${item.price}</td>
                <td style={{ color: '#666' }}>{item.supplier}</td>
                <td>
                  <span className={`badge badge-${item.quantity < 20 ? 'warning' : 'success'}`}>
                    {item.quantity < 20 ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <button onClick={() => onEditClick(item)} style={{ border: 'none', background: 'none', color: '#666', cursor: 'pointer' }}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => onDeleteClick(item._id)} style={{ border: 'none', background: 'none', color: '#E53935', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
        <span style={{ fontSize: '14px', color: '#666' }}>Showing {items.length} of {items.length} items</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className='btn btn-outline' style={{ padding: '8px' }} disabled><ChevronLeft size={18} /></button>
          <button className='btn btn-primary' style={{ padding: '8px 12px' }}>1</button>
          <button className='btn btn-outline' style={{ padding: '8px' }} disabled><ChevronRight size={18} /></button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content scale-in'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700 }}>{editMode ? 'Edit Item' : 'Add New Item'}</h3>
              <X style={{ cursor: 'pointer' }} onClick={() => setIsModalOpen(false)} />
            </div>
            
            <form onSubmit={onSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>ITEM NAME</label>
                  <input type='text' name='name' value={formData.name} onChange={onChange} className='search-input' required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>SKU</label>
                  <input type='text' name='sku' value={formData.sku} onChange={onChange} className='search-input' required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>CATEGORY</label>
                  <select name='category' value={formData.category} onChange={onChange} className='search-input' required>
                    <option value=''>Select Category</option>
                    {categories.slice(1).map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>SUPPLIER</label>
                  <input type='text' name='supplier' value={formData.supplier} onChange={onChange} className='search-input' required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>QUANTITY</label>
                  <input type='number' name='quantity' value={formData.quantity} onChange={onChange} className='search-input' required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>PRICE ($)</label>
                  <input type='number' name='price' value={formData.price} onChange={onChange} className='search-input' required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>PURCHASE DATE</label>
                  <input type='date' name='purchaseDate' value={formData.purchaseDate} onChange={onChange} className='search-input' required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '8px', fontWeight: 600 }}>EXPIRY DATE</label>
                  <input type='date' name='expiryDate' value={formData.expiryDate} onChange={onChange} className='search-input' />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type='button' className='btn btn-outline' onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type='submit' className='btn btn-primary'> {editMode ? 'Update Item' : 'Save Item'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
