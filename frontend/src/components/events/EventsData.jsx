// ✅ Text updated as per client’s requirements (Design unchanged)

import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaSearch, 
  FaRegCalendarCheck, 
  FaTimes, 
  FaUserFriends, 
  FaInfoCircle 
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EventsData = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // ✅ Sample events data with refined content
  const events = [
    {
      id: 1,
      title: "Annual Sports Day",
      date: "2023-10-15",
      time: "9:00 AM - 4:00 PM",
      location: "Main Ground",
      description: "A full day of inter-house sports competitions and activities.",
      fullDescription: "Annual Sports Day is a celebration of talent, teamwork, and school spirit. Students will participate in multiple track and field events, starting with a grand opening ceremony and traditional torch lighting. Awards and medals will be presented to winners, and the best-performing house will receive the Championship Trophy. Parents are warmly invited to attend and enjoy the day.",
      category: "sports",
      image: "./events/1.avif",
      participants: "Students (Grades 3–12)",
      organizers: "Physical Education Department",
      importantNotes: "Students must wear proper sports gear and bring water bottles."
    },
    {
      id: 2,
      title: "Science Fair Exhibition",
      date: "2023-10-22",
      time: "10:00 AM - 2:00 PM",
      location: "Science Lab",
      description: "Student-led projects showcasing creativity and innovation.",
      fullDescription: "Our Science Fair highlights sustainable solutions and forward-thinking projects from students. A diverse range of topics—from renewable energy to environmental conservation—will be presented. Projects will be judged by faculty and guest scientists. Families and the community are encouraged to attend and support our young innovators.",
      category: "academic",
      image: "./events/2.avif",
      participants: "Science Club & selected students",
      organizers: "Science Department",
      importantNotes: "Participants must complete setup by 8:00 AM."
    },
    {
      id: 3,
      title: "Parent-Teacher Conference",
      date: "2023-10-30",
      time: "2:00 PM - 5:00 PM",
      location: "Classrooms",
      description: "Quarterly discussion on student progress and development.",
      fullDescription: "This meeting provides parents with the opportunity to discuss their child’s progress, strengths, and areas for growth with teachers. Each appointment will run for 15 minutes. Progress reports will be distributed during the meeting.",
      category: "academic",
      image: "./events/3.avif",
      participants: "Parents & Guardians",
      organizers: "School Administration",
      importantNotes: "Please book time slots via the school portal."
    },
    {
      id: 4,
      title: "Annual Music Concert",
      date: "2023-11-05",
      time: "6:00 PM - 8:00 PM",
      location: "Auditorium",
      description: "Evening of performances by the school band, choir, and orchestra.",
      fullDescription: "Our Annual Music Concert celebrates the talent of students in music. Performances include classical, contemporary, and student-composed pieces. Directed by our music faculty, the concert promises an enjoyable evening for all attendees.",
      category: "arts",
      image: "./events/4.avif",
      participants: "Music Students",
      organizers: "Music Department",
      importantNotes: "Parents of performers will have reserved seating."
    },
    {
      id: 5,
      title: "Inter-School Math Olympiad",
      date: "2023-11-12",
      time: "9:00 AM - 12:00 PM",
      location: "Main Hall",
      description: "Regional competition testing math skills and logical reasoning.",
      fullDescription: "The Math Olympiad brings together bright students to compete in speed calculations, puzzles, and problem-solving rounds. Guests are welcome to attend the final round and awards ceremony. This event promotes excellence and a passion for mathematics.",
      category: "academic",
      image: "./events/5.avif",
      participants: "Math Club Students",
      organizers: "Mathematics Department",
      importantNotes: "Bring calculators and required stationery."
    },
    {
      id: 6,
      title: "Student Art Exhibition",
      date: "2023-11-20",
      time: "3:00 PM - 6:00 PM",
      location: "Art Studio",
      description: "Exhibition of creative artwork from across all grades.",
      fullDescription: "The Art Exhibition displays paintings, sculptures, digital works, and photography created by students. Local guest artists will provide feedback and select outstanding pieces for further display. Visitors will witness the artistic journey of our students.",
      category: "arts",
      image: "./events/6.avif",
      participants: "Art Students",
      organizers: "Art Department",
      importantNotes: "Select artworks will be available for purchase."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'academic', name: 'Academic' },
    { id: 'sports', name: 'Sports' },
    { id: 'arts', name: 'Arts & Culture' }
  ];

  const filterEvents = (event) => {
    if (activeFilter !== 'all' && event.category !== activeFilter) return false;
    if (
      searchQuery && 
      !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
      !event.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  };

  const filteredEvents = events.filter(filterEvents);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
       <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">School Events & Activities</h1>
          <p className="text-xl text-indigo-700 max-w-3xl mx-auto">
            Stay updated with all the upcoming events, activities, and important dates at our school community
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4" data-aos="fade-up">
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-indigo-200 px-4 py-3 w-full md:w-96">
            <FaSearch className="text-indigo-400 mr-3" />
            <input
              type="text"
              placeholder="Search events..."
              className="outline-none w-full bg-transparent text-indigo-900 placeholder-indigo-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === category.id 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 hover:shadow-md'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {event.category.toUpperCase()}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">{event.title}</h3>
                  <p className="text-indigo-700 mb-4">{event.description}</p>
                  
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-indigo-600">
                      <FaCalendarAlt className="mr-3 text-indigo-500" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-indigo-600">
                      <FaClock className="mr-3 text-indigo-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-indigo-600">
                      <FaMapMarkerAlt className="mr-3 text-indigo-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleViewDetails(event)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow" data-aos="zoom-in">
            <FaRegCalendarCheck className="mx-auto text-5xl text-indigo-400 mb-4" />
            <h3 className="text-2xl font-medium text-indigo-900 mb-2">No events found</h3>
            <p className="text-indigo-600">Try changing your search or filter criteria</p>
          </div>
        )}

        {/* Upcoming Events Banner */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-8 text-white shadow-lg" data-aos="fade-up">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-bold mb-2">Stay Updated With All Events</h2>
              <p className="text-indigo-100">Never miss an event! Subscribe to our events calendar.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-8 py-3  rounded-lg border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-white flex-grow"
              />
              <button className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-6 py-3 rounded-lg transition-colors shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            <div className="relative">
              <div className="h-56 sm:h-64 overflow-hidden">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white text-indigo-700 rounded-full p-2 shadow-md hover:bg-indigo-100 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  {selectedEvent.category.toUpperCase()}
                </span>
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  UPCOMING
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-4">{selectedEvent.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCalendarAlt className="text-indigo-600 mt-1 mr-3 text-lg" />
                    <div>
                      <p className="font-medium text-indigo-900">Date</p>
                      <p className="text-indigo-700">{formatDate(selectedEvent.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaClock className="text-indigo-600 mt-1 mr-3 text-lg" />
                    <div>
                      <p className="font-medium text-indigo-900">Time</p>
                      <p className="text-indigo-700">{selectedEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-indigo-600 mt-1 mr-3 text-lg" />
                    <div>
                      <p className="font-medium text-indigo-900">Location</p>
                      <p className="text-indigo-700">{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaUserFriends className="text-indigo-600 mt-1 mr-3 text-lg" />
                    <div>
                      <p className="font-medium text-indigo-900">Participants</p>
                      <p className="text-indigo-700">{selectedEvent.participants}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaInfoCircle className="text-indigo-600 mt-1 mr-3 text-lg" />
                    <div>
                      <p className="font-medium text-indigo-900">Organizers</p>
                      <p className="text-indigo-700">{selectedEvent.organizers}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-indigo-900 mb-3">Event Description</h3>
                <p className="text-indigo-700 leading-relaxed">{selectedEvent.fullDescription}</p>
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaInfoCircle className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-indigo-700">
                      <span className="font-medium">Important Notes:</span> {selectedEvent.importantNotes}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md">
                  Add to Calendar
                </button>
                <button className="flex-1 border border-indigo-300 hover:bg-indigo-50 text-indigo-700 font-medium py-3 px-4 rounded-lg transition-colors">
                  Share Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EventsData;
