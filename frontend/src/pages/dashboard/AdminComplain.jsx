import React, { useState, useEffect, useMemo } from "react";
import { FaEdit, FaTrash, FaEye, FaFileExport, FaTimes, FaCheck, FaExclamationTriangle, FaSort, FaSortUp, FaSortDown, FaFilter } from "react-icons/fa";

const AdminComplain = () => {
  const [complaints, setComplaints] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filter, setFilter] = useState({ status: 'all', priority: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Changed to 1024 to include tablets
  const [showFilters, setShowFilters] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Changed to 1024 to include tablets
    };

    // Fetch complaints data
    const fetchComplaints = async () => {
      try {
        // Simulate API call
        const mockComplaints = [
          {
            id: 1,
            fullName: "Ali Khan",
            role: "Student",
            studentId: "ST12345",
            grade: "10th",
            complaintType: "Facilities",
            preferredMethod: "Email",
            preferredTime: "Morning",
            description: "Classroom fan is not working properly.",
            involvedParties: "Class Monitor",
            witnesses: "Ahmed, Bilal",
            documents: "fan_issue.jpg",
            consent: true,
            status: "Pending",
            priority: "High",
            date: "2023-10-15",
          },
          {
            id: 2,
            fullName: "Sara Ahmed",
            role: "Parent",
            studentId: "ST67890",
            grade: "8th",
            complaintType: "Behavior",
            preferredMethod: "Phone",
            preferredTime: "Evening",
            description: "Bullying issue in class.",
            involvedParties: "Class Teacher",
            witnesses: "Zara",
            documents: "",
            consent: true,
            status: "Resolved",
            priority: "High",
            date: "2023-10-14",
          },
          // Add more mock data as needed
        ];
        setComplaints(mockComplaints);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
        showToast("Failed to load complaints", "error");
      }
    };

    fetchComplaints();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    Resolved: "bg-green-100 text-green-800 border-green-200",
    Rejected: "bg-red-100 text-red-800 border-red-200"
  };

  const priorityColors = {
    High: "bg-red-100 text-red-800 border-red-200",
    Medium: "bg-amber-100 text-amber-800 border-amber-200",
    Low: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const typeColors = {
    Facilities: "bg-blue-100 text-blue-800 border-blue-200",
    Behavior: "bg-red-100 text-red-800 border-red-200",
    HR: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Academic: "bg-green-100 text-green-800 border-green-200",
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedComplaints = useMemo(() => {
    return complaints
      .filter(complaint => {
        const matchesStatus = filter.status === 'all' || complaint.status === filter.status;
        const matchesPriority = filter.priority === 'all' || complaint.priority === filter.priority;
        const matchesSearch = 
          complaint.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complaint.complaintType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesStatus && matchesPriority && matchesSearch;
      })
      .sort((a, b) => {
        if (sortConfig.key) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
  }, [complaints, filter, searchTerm, sortConfig]);

  // View complaint in modal
  const viewComplaint = (complaint) => {
    setModalContent(complaint);
    setShowViewModal(true);
  };

  // Edit complaint status
  const editComplaintStatus = (complaint) => {
    setEditingComplaint({...complaint});
    setShowStatusModal(true);
  };

  // Save status change
  const saveStatusChange = () => {
    if (editingComplaint) {
      setComplaints(complaints.map(complaint => 
        complaint.id === editingComplaint.id ? editingComplaint : complaint
      ));
      setShowStatusModal(false);
      setEditingComplaint(null);
      showToast("Status updated successfully!", "success");
    }
  };

  // Handle status change
  const handleStatusChange = (e) => {
    const { value } = e.target;
    setEditingComplaint(prev => ({
      ...prev,
      status: value
    }));
  };

  // Delete complaint
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const deleteComplaint = () => {
    if (deleteId) {
      setComplaints(complaints.filter(complaint => complaint.id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
      showToast("Complaint deleted successfully!", "success");
    }
  };

  // Export data
  const exportData = () => {
    const dataStr = JSON.stringify(complaints, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'complaints.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    showToast("Data exported successfully!", "success");
  };

  // View Modal Component
  const ComplaintViewModal = ({ show, complaint, onClose }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-screen overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Complaint Details</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            {complaint && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Complaint Information</h3>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex">
                      <span className="font-medium w-32">ID:</span>
                      <span>#{complaint.id}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Complainant:</span>
                      <span>{complaint.fullName}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Role:</span>
                      <span>{complaint.role}</span>
                    </div>
                    {complaint.studentId && (
                      <div className="flex">
                        <span className="font-medium w-32">Student ID:</span>
                        <span>{complaint.studentId}</span>
                      </div>
                    )}
                    {complaint.grade && (
                      <div className="flex">
                        <span className="font-medium w-32">Grade:</span>
                        <span>{complaint.grade}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <span className="font-medium w-32">Type:</span>
                      <span className={`ml-2 px-3 py-1 text-xs font-medium rounded-full ${typeColors[complaint.complaintType]}`}>
                        {complaint.complaintType}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium mb-2">Description:</span>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{complaint.description}</p>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Involved Parties:</span>
                      <span>{complaint.involvedParties || "N/A"}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Witnesses:</span>
                      <span>{complaint.witnesses || "N/A"}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Contact Information</h3>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">📞</span>
                      <span className="font-medium">Preferred Method:</span>
                      <span>{complaint.preferredMethod}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">⏰</span>
                      <span className="font-medium">Preferred Time:</span>
                      <span>{complaint.preferredTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">📄</span>
                      <span className="font-medium">Documents:</span> 
                      {complaint.documents ? (
                        <span className="text-indigo-600 cursor-pointer hover:underline ml-1">
                          {complaint.documents}
                        </span>
                      ) : (
                        <span className="text-gray-500 ml-1">No documents attached</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {complaint.consent ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-red-600">✗</span>
                      )}
                      <span className="font-medium">Consent:</span> 
                      <span>{complaint.consent ? "Given" : "Not Given"}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4 pb-2 border-b border-gray-200">Status Information</h3>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center">
                      <span className="font-medium w-32">Status:</span>
                      <span className={`ml-2 px-3 py-1 text-xs font-medium rounded-full ${statusColors[complaint.status]}`}>
                        {complaint.status}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-32">Priority:</span>
                      <span className={`ml-2 px-3 py-1 text-xs font-medium rounded-full ${priorityColors[complaint.priority]}`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Date Submitted:</span>
                      <span>{complaint.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-end border-t border-gray-200 pt-4">
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Status Update Modal
  const StatusUpdateModal = ({ show, complaint, onClose, onSave, onChange }) => {
    if (!show || !complaint) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Update Complaint Status</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">Complaint #{complaint.id}</h3>
                  <p className="text-sm text-gray-600">{complaint.complaintType}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityColors[complaint.priority]}`}>
                  {complaint.priority}
                </span>
              </div>
              <p className="text-gray-700">{complaint.description}</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Update Status</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onChange({ target: { value: 'Pending' }})}
                  className={`px-4 py-3 rounded-lg border transition-colors ${complaint.status === 'Pending' ? 'bg-yellow-100 border-yellow-500 text-yellow-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => onChange({ target: { value: 'In Progress' }})}
                  className={`px-4 py-3 rounded-lg border transition-colors ${complaint.status === 'In Progress' ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => onChange({ target: { value: 'Resolved' }})}
                  className={`px-4 py-3 rounded-lg border transition-colors ${complaint.status === 'Resolved' ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  Resolved
                </button>
                <button
                  onClick={() => onChange({ target: { value: 'Rejected' }})}
                  className={`px-4 py-3 rounded-lg border transition-colors ${complaint.status === 'Rejected' ? 'bg-red-100 border-red-500 text-red-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  Rejected
                </button>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button 
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={onSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delete confirmation modal
  const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <FaExclamationTriangle className="text-red-600 text-2xl" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Confirm Deletion</h2>
            <p className="text-gray-600 text-center mb-6">Are you sure you want to delete this complaint? This action cannot be undone.</p>
            
            <div className="flex justify-center gap-4">
              <button 
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Toast notification component
  const Toast = ({ show, message, type }) => {
    if (!show) return null;
    
    const bgColor = type === 'success' ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400';
    const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
    const icon = type === 'success' ? <FaCheck className="text-green-600" /> : <FaExclamationTriangle className="text-red-600" />;
    
    return (
      <div className={`fixed top-4 right-4 z-50 border rounded-lg p-4 flex items-center shadow-lg ${bgColor} ${textColor} transition-all duration-300`}>
        <div className="mr-3">
          {icon}
        </div>
        <div className="font-medium">{message}</div>
      </div>
    );
  };

  // Render card view for mobile/tablet
  const renderCardView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mt-4 p-1 sm:p-0 ">
        {filteredAndSortedComplaints.map((complaint) => (
          <div key={complaint.id} className="bg-gary-50 rounded-xl shadow-2xl p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">#{complaint.id} {complaint.fullName}</h3>
                <p className="text-sm text-gray-600">{complaint.role}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[complaint.complaintType]}`}>
                {complaint.complaintType}
              </span>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-gray-700 line-clamp-2">{complaint.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-sm">
                <span className="font-medium text-gray-600">Date:</span>
                <p className="text-gray-800">{complaint.date}</p>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-600">Priority:</span>
                <span className={`ml-1 px-2 py-1 text-xs font-medium rounded-full ${priorityColors[complaint.priority]}`}>
                  {complaint.priority}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[complaint.status]}`}>
                {complaint.status}
              </span>
              
              <div className="flex items-center gap-2">
                <button 
                  className="text-indigo-600 hover:text-indigo-900 transition-colors p-1.5 rounded-full hover:bg-indigo-50"
                  onClick={() => viewComplaint(complaint)}
                  title="View Details"
                >
                  <FaEye size={16} />
                </button>
                <button 
                  className="text-green-600 hover:text-green-900 transition-colors p-1.5 rounded-full hover:bg-green-50"
                  onClick={() => editComplaintStatus(complaint)}
                  title="Update Status"
                >
                  <FaEdit size={16} />
                </button>
                <button 
                  className="text-red-600 hover:text-red-900 transition-colors p-1.5 rounded-full hover:bg-red-50"
                  onClick={() => confirmDelete(complaint.id)}
                  title="Delete"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Student ID: {complaint.studentId || "N/A"}</span>
                <span>Grade: {complaint.grade || "N/A"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render table view for desktop
  const renderTableView = () => {
    return (
      <div className="overflow-x-auto ">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-1">
                  ID
                  {sortConfig.key === 'id' ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp size={14} /> : <FaSortDown size={14} />
                  ) : <FaSort size={14} className="text-gray-300" />}
                </div>
              </th>
              <th 
                className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('fullName')}
              >
                <div className="flex items-center gap-1">
                  Complainant
                  {sortConfig.key === 'fullName' ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp size={14} /> : <FaSortDown size={14} />
                  ) : <FaSort size={14} className="text-gray-300" />}
                </div>
              </th>
              <th 
                className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('complaintType')}
              >
                <div className="flex items-center gap-1">
                  Type
                  {sortConfig.key === 'complaintType' ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp size={14} /> : <FaSortDown size={14} />
                  ) : <FaSort size={14} className="text-gray-300" />}
                </div>
              </th>
              <th 
                className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-1">
                  Date
                  {sortConfig.key === 'date' ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp size={14} /> : <FaSortDown size={14} />
                  ) : <FaSort size={14} className="text-gray-300" />}
                </div>
              </th>
              <th 
                className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-1">
                  Status
                  {sortConfig.key === 'status' ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp size={14} /> : <FaSortDown size={14} />
                  ) : <FaSort size={14} className="text-gray-300" />}
                </div>
              </th>
              <th 
                className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('priority')}
              >
                <div className="flex items-center gap-1">
                  Priority
                  {sortConfig.key === 'priority' ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp size={14} /> : <FaSortDown size={14} />
                  ) : <FaSort size={14} className="text-gray-300" />}
                </div>
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedComplaints.map((complaint) => (
              <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{complaint.id}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{complaint.fullName}</div>
                  <div className="text-sm text-gray-500">{complaint.role}</div>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${typeColors[complaint.complaintType]}`}>
                    {complaint.complaintType}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {complaint.date}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[complaint.status]}`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityColors[complaint.priority]}`}>
                    {complaint.priority}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 transition-colors p-1.5 rounded-full hover:bg-indigo-50"
                      onClick={() => viewComplaint(complaint)}
                      title="View Details"
                    >
                      <FaEye size={16} />
                    </button>
                    <button 
                      className="text-green-600 hover:text-green-900 transition-colors p-1.5 rounded-full hover:bg-green-50"
                      onClick={() => editComplaintStatus(complaint)}
                      title="Update Status"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 transition-colors p-1.5 rounded-full hover:bg-red-50"
                      onClick={() => confirmDelete(complaint.id)}
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full  md:max-w-5xl md:ms-[24%] p-6 z-90">
      {/* Header */}
      <div className="mb-6 md:mb-8 pt-6">
        <h1 className="p-2 sm:p-0 text-2xl md:text-3xl font-bold text-gray-800 mb-2">Complaint Management</h1>
        <p className="p-2 sm:p-0 text-gray-600">Manage and review submitted complaints in the system</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 ">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search complaints..."
                className="w-full pl-10 pr-4 py-2.5 outline-none border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-200 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {isMobile && (
              <button 
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-200 transition-colors font-medium"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter size={14} />
                Filters
              </button>
            )}
            
            <div className={`${isMobile && !showFilters ? 'hidden' : 'flex'} flex-wrap gap-3`}>
              <select 
                className="outline-none border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-200 transition-colors"
                value={filter.status}
                onChange={(e) => setFilter({...filter, status: e.target.value})}
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
              
              <select 
                className="outline-none border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-200 transition-colors"
                value={filter.priority}
                onChange={(e) => setFilter({...filter, priority: e.target.value})}
              >
                <option value="all">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              
              <button 
                className="flex items-center gap-2 bg-indigo-500 text-white px-3 py-2.5 rounded-lg text-sm hover:bg-indigo-700 transition-colors font-medium"
                onClick={exportData}
              >
                <FaFileExport size={14} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Complaints Container */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {isMobile ? renderCardView() : renderTableView()}
        
        {filteredAndSortedComplaints.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-lg">No complaints found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Table Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-2">
        <div className="text-sm text-gray-700 mb-2 sm:mb-0">
          Showing {filteredAndSortedComplaints.length} of {complaints.length} complaints
        </div>
      </div>

      {/* View Modal */}
      <ComplaintViewModal 
        show={showViewModal} 
        complaint={modalContent} 
        onClose={() => setShowViewModal(false)} 
      />

      {/* Status Update Modal */}
      <StatusUpdateModal 
        show={showStatusModal} 
        complaint={editingComplaint} 
        onClose={() => setShowStatusModal(false)}
        onSave={saveStatusChange}
        onChange={handleStatusChange}
      />

      {/* Delete confirmation modal */}
      <DeleteConfirmationModal 
        show={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteComplaint}
      />

      {/* Toast notification */}
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
};

export default AdminComplain;