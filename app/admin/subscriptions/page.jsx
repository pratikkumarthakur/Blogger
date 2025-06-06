// "use client";

// import SubsTableItem from "@/Components/AdminComponents/SubsTableItem";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const page = () => {

// const[emails,setEmails]=useState([]);

// const fetchEmails = async () =>{
//     const response = await axios.get('/api/email')
//     setEmails(response.data.emails)
// }

// const deleteEmail = async (mongoId)=>{
//     const response = await axios.delete('/api/email',{
//         params:{
//             id:mongoId
//         }
//     })
//     if(response.data.success){
// toast.success(response.data.msg)
// fetchEmails()
//     }else{
//         toast.error("Error")
//     }
// }

// useEffect(()=>{
//     fetchEmails()
// },[]) 

//   return (
//     <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
//       <h1>All Subscription</h1>
//       <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
//         <table className="w-full text-sm text-gray-500">
//           <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Email Subscription
//               </th>
//               <th scope="col" className="hidden sm:block px-6 py-3">
//                 Date
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {emails.map((item,index)=>{
//                 return <SubsTableItem key={index} mongoId={item._id} deleteEmail={deleteEmail} email={item.email} date={item.date} />
//             })}
            
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";
import SubsTableItem from "@/Components/AdminComponents/SubsTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/email');
      setEmails(response.data.emails);
    } catch (error) {
      toast.error("Failed to fetch subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmail = async (mongoId) => {
    if (window.confirm("Are you sure you want to remove this subscriber?")) {
      try {
        const response = await axios.delete('/api/email', {
          params: {
            id: mongoId
          }
        });
        if (response.data.success) {
          toast.success(response.data.msg);
          fetchEmails();
        } else {
          toast.error("Error");
        }
      } catch (error) {
        toast.error("Failed to delete subscription");
      }
    }
  };

  const exportEmails = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Date,Domain\n"
      + filteredEmails.map(email => 
          `${email.email},${new Date(email.date).toLocaleDateString()},${email.email.split('@')[1]}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "health_newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportModal(false);
    toast.success("Subscriber list exported successfully!");
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // Filter and sort emails
  const filteredEmails = emails
    .filter(email => 
      email.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "email":
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });

  // Get email domain statistics
  const domainStats = emails.reduce((acc, email) => {
    const domain = email.email.split('@')[1];
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {});

  const topDomains = Object.entries(domainStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Newsletter Subscribers</h1>
              <p className="text-gray-600">Manage your health newsletter subscription list</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export</span>
              </button>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600">Total Subscribers: </span>
                <span className="font-semibold text-blue-600">{emails.length}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">{emails.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {emails.filter(email => {
                      const emailDate = new Date(email.date);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return emailDate > weekAgo;
                    }).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Top Domain</p>
                  <p className="text-lg font-bold text-gray-900">
                    {topDomains.length > 0 ? topDomains[0][0] : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-orange-100">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                  <p className="text-lg font-bold text-green-600">+12%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="email">Email A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredEmails.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No subscribers found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? "Try adjusting your search criteria" : "No newsletter subscribers yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left font-semibold">
                      Subscriber
                    </th>
                    <th scope="col" className="hidden sm:table-cell px-6 py-4 text-left font-semibold">
                      Subscription Date
                    </th>
                    <th scope="col" className="hidden md:table-cell px-6 py-4 text-left font-semibold">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEmails.map((item, index) => (
                    <SubsTableItem 
                      key={index} 
                      mongoId={item._id} 
                      deleteEmail={deleteEmail} 
                      email={item.email} 
                      date={item.date} 
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top Domains Section */}
        {topDomains.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Email Domains</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {topDomains.map(([domain, count], index) => (
                <div key={domain} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{count}</div>
                  <div className="text-sm text-gray-600">{domain}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Subscribers</h3>
              <p className="text-gray-600 mb-6">
                Export all {filteredEmails.length} subscribers to a CSV file?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={exportEmails}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;