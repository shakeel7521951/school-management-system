import React, { useState, useEffect } from "react";
import { FileText, CheckCircle, XCircle, User, ClipboardList, Clock, Phone, Search, ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { FaEdit, FaTrash, FaEye, FaFileExport, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";

const AdminComplain = () => {
  const [complaints, setComplaints] = useState([
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
    {
      id: 3,
      fullName: "Hassan Raza",
      role: "Staff",
      studentId: "",
      grade: "",
      complaintType: "HR",
      preferredMethod: "In-person",
      preferredTime: "Afternoon",
      description: "Salary not credited on time.",
      involvedParties: "Accounts Department",
      witnesses: "",
      documents: "salary_delay.pdf",
      consent: true,
      status: "In Progress",
      priority: "Medium",
      date: "2023-10-13",
    },
    {
      id: 4,
      fullName: "Fatima Noor",
      role: "Student",
      studentId: "ST54321",
      grade: "9th",
      complaintType: "Academic",
      preferredMethod: "Email",
      preferredTime: "Morning",
      description: "Math teacher not covering syllabus.",
      involvedParties: "Math Teacher",
      witnesses: "Classmates",
      documents: "",
      consent: false,
      status: "Pending",
      priority: "Low",
      date: "2023-10-12",
    },
    {
      id: 5,
      fullName: "Omar Ali",
      role: "Parent",
      studentId: "ST98765",
      grade: "6th",
      complaintType: "Facilities",
      preferredMethod: "Phone",
      preferredTime: "Evening",
      description: "Washrooms are not clean.",
      involvedParties: "School Janitor",
      witnesses: "Other Parents",
      documents: "washroom_issue.png",
      consent: true,
      status: "Resolved",
      priority: "Medium",
      date: "2023-10-11",
    },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filter, setFilter] = useState({ status: 'all', priority: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    Resolved: "bg-green-100 text-green-800 border-green-200",
  };

  const priorityColors = {
    High: "bg-red-100 text-red-800 border-red-200",
    Medium: "bg-orange-100 text-orange-800 border-orange-200",
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

  const filteredAndSortedComplaints = complaints
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

  const toggleRowExpansion = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  // View complaint in modal
  const viewComplaint = (complaint) => {
    setModalContent(complaint);
    setShowViewModal(true);
  };

  // Edit complaint
  const editComplaint = (complaint) => {
    setEditingComplaint({...complaint});
    setShowEditModal(true);
  };

  // Save edited complaint
  const saveEditedComplaint = () => {
    if (editingComplaint) {
      setComplaints(complaints.map(complaint => 
        complaint.id === editingComplaint.id ? editingComplaint : complaint
      ));
      setShowEditModal(false);
      setEditingComplaint(null);
      showToast("Complaint updated successfully!", "success");
    }
  };

  // Handle input change in edit form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingComplaint(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

  // Mobile complaint card view
  const ComplaintCard = ({ complaint }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200 ">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-900">#{complaint.id}</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[complaint.complaintType]}`}>
              {complaint.complaintType}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{complaint.fullName}</h3>
          <p className="text-sm text-gray-600">{complaint.role}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-2 py-1 text-xs font-medium rounded-full mb-2 ${statusColors[complaint.status]}`}>
            {complaint.status}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[complaint.priority]}`}>
            {complaint.priority}
          </span>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">{complaint.description}</p>
        <p className="text-gray-500">{complaint.date}</p>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <button 
          className="text-blue-600 text-sm font-medium"
          onClick={() => toggleRowExpansion(complaint.id)}
        >
          {expandedRow === complaint.id ? 'Hide Details' : 'View Details'}
        </button>
        <div className="flex gap-3">
          <button 
            className="text-indigo-600 hover:text-indigo-900 transition-colors p-1.5"
            onClick={() => viewComplaint(complaint)}
            title="View Details"
          >
            <FaEye size={16} />
          </button>
          <button 
            className="text-green-600 hover:text-green-900 transition-colors p-1.5"
            onClick={() => editComplaint(complaint)}
            title="Edit"
          >
            <FaEdit size={16} />
          </button>
          <button 
            className="text-red-600 hover:text-red-900 transition-colors p-1.5"
            onClick={() => confirmDelete(complaint.id)}
            title="Delete"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>
      
      {expandedRow === complaint.id && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-gray-700">Involved Parties:</span>
              <p>{complaint.involvedParties || "N/A"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Witnesses:</span>
              <p>{complaint.witnesses || "N/A"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-500" /> 
              <span className="font-medium text-gray-700">Contact Method:</span>
              <span>{complaint.preferredMethod}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-500" /> 
              <span className="font-medium text-gray-700">Preferred Time:</span>
              <span>{complaint.preferredTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-gray-500" /> 
              <span className="font-medium text-gray-700">Documents:</span>
              {complaint.documents ? (
                <span className="text-indigo-600 cursor-pointer hover:underline ml-1">
                  {complaint.documents}
                </span>
              ) : (
                <span className="text-gray-500 ml-1">None</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {complaint.consent ? (
                <CheckCircle size={14} className="text-green-600" />
              ) : (
                <XCircle size={14} className="text-red-600" />
              )}
              <span className="font-medium text-gray-700">Consent:</span>
              <span>{complaint.consent ? "Given" : "Not Given"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Modal for viewing complaint details
  const ComplaintViewModal = ({ show, complaint, onClose }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 pt-8">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-screen overflow-y-auto">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Complaint Details</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl transition-colors">
                <FaTimes />
              </button>
            </div>
            
            {complaint && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">Complaint Information</h3>
                  <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                    <div className="flex">
                      <span className="font-medium w-28 md:w-32">ID:</span>
                      <span>#{complaint.id}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-28 md:w-32">Complainant:</span>
                      <span>{complaint.fullName}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-28 md:w-32">Role:</span>
                      <span>{complaint.role}</span>
                    </div>
                    {complaint.studentId && (
                      <div className="flex">
                        <span className="font-medium w-28 md:w-32">Student ID:</span>
                        <span>{complaint.studentId}</span>
                      </div>
                    )}
                    {complaint.grade && (
                      <div className="flex">
                        <span className="font-medium w-28 md:w-32">Grade:</span>
                        <span>{complaint.grade}</span>
                      </div>
                    )}
                    <div className="flex">
                      <span className="font-medium w-28 md:w-32">Type:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[complaint.complaintType]}`}>
                        {complaint.complaintType}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium mb-1">Description:</span>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm">{complaint.description}</p>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-28 md:w-32">Involved Parties:</span>
                      <span>{complaint.involvedParties || "N/A"}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-28 md:w-32">Witnesses:</span>
                      <span>{complaint.witnesses || "N/A"}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">Contact Information</h3>
                  <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-indigo-500 flex-shrink-0" /> 
                      <span className="font-medium">Preferred Method:</span>
                      <span>{complaint.preferredMethod}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-indigo-500 flex-shrink-0" /> 
                      <span className="font-medium">Preferred Time:</span>
                      <span>{complaint.preferredTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-indigo-500 flex-shrink-0" /> 
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
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle size={16} className="text-red-500 flex-shrink-0" />
                      )}
                      <span className="font-medium">Consent:</span> 
                      <span>{complaint.consent ? "Given" : "Not Given"}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3 md:mb-4 pb-2 border-b border-gray-200">Status Information</h3>
                  <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                    <div className="flex items-center">
                      <span className="font-medium w-28 md:w-32">Status:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${statusColors[complaint.status]} border`}>
                        {complaint.status}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-28 md:w-32">Priority:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${priorityColors[complaint.priority]} border`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-28 md:w-32">Date Submitted:</span>
                      <span>{complaint.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 md:mt-8 flex justify-end border-t border-gray-200 pt-4">
              <button 
                onClick={onClose}
                className="px-4 py-2 md:px-5 md:py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Modal for editing complaint details
  const ComplaintEditModal = ({ show, complaint, onClose, onSave, onChange }) => {
    if (!show || !complaint) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 pt-8">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-screen overflow-y-auto">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Edit Complaint</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl transition-colors">
                <FaTimes />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">Complaint Information</h3>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={complaint.fullName}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      name="role"
                      value={complaint.role}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base"
                    >
                      <option value="Student">Student</option>
                      <option value="Parent">Parent</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complaint Type</label>
                    <select
                      name="complaintType"
                      value={complaint.complaintType}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base"
                    >
                      <option value="Facilities">Facilities</option>
                      <option value="Behavior">Behavior</option>
                      <option value="HR">HR</option>
                      <option value="Academic">Academic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={complaint.description}
                      onChange={onChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={complaint.status}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-4 pb-2 border-b border-gray-200">Additional Information</h3>
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      name="priority"
                      value={complaint.priority}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
                    <select
                      name="preferredMethod"
                      value={complaint.preferredMethod}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base"
                    >
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                      <option value="In-person">In-person</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={complaint.preferredTime}
                      onChange={onChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 md:px-4 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-4">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={complaint.consent}
                      onChange={onChange}
                      className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 md:ml-3 block text-sm text-gray-700 font-medium">Consent Given</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-8 flex justify-end gap-3 border-t border-gray-200 pt-4">
              <button 
                onClick={onClose}
                className="px-4 py-2 md:px-5 md:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base"
              >
                Cancel
              </button>
              <button 
                onClick={onSave}
                className="px-4 py-2 md:px-5 md:py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm md:text-base"
              >
                Save Changes
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
                className="px-4 py-2 md:px-5 md:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                className="px-4 py-2 md:px-5 md:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm md:text-base"
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

  return (
    <div className="flex min-h-screen w-full md:max-w-4xl md:ms-[26%] p-0 z-90">
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Complaint Management</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Manage and review submitted complaints in the system
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8 "> 
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ">
            <div className=" flex-1 max-w-md ">
             
              <input
                type="text"
                placeholder="Search complaints..."
                className="w-full pl-5 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm md:text-base "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              {isMobile && (
                <button 
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-300 transition-colors font-medium"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? <X size={16} /> : <Menu size={16} />}
                  Filters
                </button>
              )}
              
              <div className={`${isMobile && !showFilters ? 'hidden' : 'flex'} flex-wrap gap-3`}>
                <div className="flex items-center gap-2">
                  <select 
                    className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    value={filter.status}
                    onChange={(e) => setFilter({...filter, status: e.target.value})}
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  value={filter.priority}
                  onChange={(e) => setFilter({...filter, priority: e.target.value})}
                >
                  <option value="all">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                
                <button 
                  className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2.5 rounded-lg text-sm hover:bg-indigo-700 transition-colors font-medium"
                  onClick={exportData}
                >
                  <FaFileExport size={16} />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Table - Desktop */}
        {!isMobile && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('id')}>
                      <div className="flex items-center gap-1">
                        ID
                        {sortConfig.key === 'id' ? (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        ) : null}
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('fullName')}>
                      <div className="flex items-center gap-1">
                        Complainant
                        {sortConfig.key === 'fullName' ? (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        ) : null}
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('complaintType')}>
                      <div className="flex items-center gap-1">
                        Type
                        {sortConfig.key === 'complaintType' ? (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        ) : null}
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                      <div className="flex items-center gap-1">
                        Date
                        {sortConfig.key === 'date' ? (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        ) : null}
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                      <div className="flex items-center gap-1">
                        Status
                        {sortConfig.key === 'status' ? (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        ) : null}
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('priority')}>
                      <div className="flex items-center gap-1">
                        Priority
                        {sortConfig.key === 'priority' ? (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        ) : null}
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedComplaints.map((complaint) => (
                    <React.Fragment key={complaint.id}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{complaint.id}
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{complaint.fullName}</div>
                          <div className="text-sm text-gray-500">{complaint.role}</div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${typeColors[complaint.complaintType]}`}>
                            {complaint.complaintType}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500">
                          {complaint.date}
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[complaint.status]}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[complaint.priority]}`}>
                            {complaint.priority}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium">
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
                              onClick={() => editComplaint(complaint)}
                              title="Edit"
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
                      {expandedRow === complaint.id && (
                        <tr className="bg-gray-50">
                          <td colSpan="7" className="px-4 md:px-6 py-3 md:py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                              <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Complaint Details</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                  <p><strong>Description:</strong> {complaint.description}</p>
                                  <p><strong>Involved Parties:</strong> {complaint.involvedParties || "N/A"}</p>
                                  <p><strong>Witnesses:</strong> {complaint.witnesses || "N/A"}</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                  <p className="flex items-center gap-2">
                                    <Phone size={14} className="text-gray-500" /> 
                                    <strong>Preferred Method:</strong> {complaint.preferredMethod}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <Clock size={14} className="text-gray-500" /> 
                                    <strong>Preferred Time:</strong> {complaint.preferredTime}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <FileText size={14} className="text-gray-500" /> 
                                    <strong>Documents:</strong> 
                                    {complaint.documents ? (
                                      <span className="text-indigo-600 cursor-pointer hover:underline ml-1">
                                        {complaint.documents}
                                      </span>
                                    ) : (
                                      <span className="text-gray-500 ml-1">No documents attached</span>
                                    )}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    {complaint.consent ? (
                                      <CheckCircle size={14} className="text-green-600" />
                                    ) : (
                                      <XCircle size={14} className="text-red-600" />
                                    )}
                                    <strong>Consent:</strong> 
                                    {complaint.consent ? "Given" : "Not Given"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredAndSortedComplaints.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-lg">No complaints found matching your criteria</p>
              </div>
            )}
          </div>
        )}

        {/* Complaints Cards - Mobile */}
        {isMobile && (
          <div className="bg-transparent">
            {filteredAndSortedComplaints.length === 0 ? (
              <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-lg">No complaints found matching your criteria</p>
              </div>
            ) : (
              filteredAndSortedComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))
            )}
          </div>
        )}

        {/* Table Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-2">
          <div className="text-sm text-gray-700 mb-2 sm:mb-0">
            Showing {filteredAndSortedComplaints.length} of {complaints.length} complaints
          </div>
        </div>
      </main>

      {/* Modal for viewing complaint details */}
      <ComplaintViewModal 
        show={showViewModal} 
        complaint={modalContent} 
        onClose={() => setShowViewModal(false)} 
      />

      {/* Modal for editing complaint details */}
      <ComplaintEditModal 
        show={showEditModal} 
        complaint={editingComplaint} 
        onClose={() => setShowEditModal(false)}
        onSave={saveEditedComplaint}
        onChange={handleInputChange}
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