// import React from 'react'

// const SubsTableItem = ({email,mongoId,date,deleteEmail}) => {
//     const emailDate = new Date (date)
//   return (
//     <tr className='bg-white border-b text-left'>
// <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
// {email?email:"No Email"}
// </th>
// <td className='px-6 py-4 hidden sm:block'>{emailDate.toDateString()}</td>
// <td className='px-6 py-4 cursor-pointer' onClick={()=>deleteEmail(mongoId)}>x</td>
//     </tr>
//   )
// }

// export default SubsTableItem


import React from 'react';

const SubsTableItem = ({ email, mongoId, date, deleteEmail }) => {
  const emailDate = new Date(date);
  
  // Extract domain from email for display
  const getDomain = (email) => {
    if (!email) return '';
    return email.split('@')[1] || '';
  };

  // Get subscription status (you can modify this based on your data)
  const getSubscriptionStatus = () => {
    // This could be based on actual subscription data
    return Math.random() > 0.5 ? 'Active' : 'Pending';
  };

  const status = getSubscriptionStatus();

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
      <th 
        scope="row" 
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <div className="flex items-center gap-3">
          {/* Email Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {email ? email.charAt(0).toUpperCase() : 'N'}
            </span>
          </div>
          
          <div>
            <p className="font-semibold text-gray-900">
              {email ? email : "No Email"}
            </p>
            <p className="text-xs text-gray-500">
              {getDomain(email) && `@${getDomain(email)}`}
            </p>
          </div>
        </div>
      </th>
      
      <td className="px-6 py-4 hidden sm:table-cell">
        <div className="text-sm">
          <p className="text-gray-900 font-medium">
            {emailDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-gray-500 text-xs">
            {emailDate.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </td>
      
      <td className="px-6 py-4 hidden md:table-cell">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            status === 'Active' ? 'bg-green-600' : 'bg-yellow-600'
          }`}></div>
          {status}
        </span>
      </td>
      
      <td className="px-6 py-4 hidden lg:table-cell">
        <div className="text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Health Newsletter</span>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            onClick={() => {/* Add view/edit functionality */}}
          >
            View
          </button>
          <button
            onClick={() => deleteEmail(mongoId)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors group"
            title="Remove Subscriber"
          >
            <svg 
              className="w-4 h-4 group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SubsTableItem;