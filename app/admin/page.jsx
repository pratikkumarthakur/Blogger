// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page

"use client";
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  BookOpen, 
  Mail, 
  TrendingUp, 
  Calendar,
  Activity,
  Eye,
  MessageCircle,
  Award,
  Clock,
  BarChart3,
  PieChart,
  Globe,
  Bell
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalSubscribers: 0,
    totalViews: 0,
    totalComments: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);

  useEffect(() => {
    // Simulate loading dashboard data
    setStats({
      totalArticles: 127,
      totalSubscribers: 3456,
      totalViews: 89234,
      totalComments: 1205
    });

    setRecentActivity([
      { id: 1, action: "New article published", title: "Understanding Sexual Wellness", time: "2 hours ago", type: "article" },
      { id: 2, action: "New subscriber", title: "jane.doe@email.com", time: "4 hours ago", type: "subscriber" },
      { id: 3, action: "Comment received", title: "Men's Performance Guide", time: "6 hours ago", type: "comment" },
      { id: 4, action: "Article updated", title: "Women's Vitality Tips", time: "1 day ago", type: "update" },
      { id: 5, action: "New subscriber", title: "john.smith@email.com", time: "1 day ago", type: "subscriber" }
    ]);

    setPopularArticles([
      { id: 1, title: "Complete Guide to Sexual Health", views: 12453, category: "Sexual Health" },
      { id: 2, title: "Boosting Men's Performance Naturally", views: 9876, category: "Men's Performance" },
      { id: 3, title: "Women's Vitality and Energy", views: 8432, category: "Women's Vitality" },
      { id: 4, title: "The Art of Intimacy", views: 7234, category: "Art of Intimacy" },
      { id: 5, title: "Holistic Wellness Approach", views: 6543, category: "General Health" }
    ]);
  }, []);

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
          {change && (
            <p className={`text-sm flex items-center mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = (type) => {
      switch (type) {
        case 'article': return <BookOpen className="w-4 h-4" />;
        case 'subscriber': return <Users className="w-4 h-4" />;
        case 'comment': return <MessageCircle className="w-4 h-4" />;
        case 'update': return <Clock className="w-4 h-4" />;
        default: return <Activity className="w-4 h-4" />;
      }
    };

    const getBgColor = (type) => {
      switch (type) {
        case 'article': return 'bg-blue-100 text-blue-600';
        case 'subscriber': return 'bg-green-100 text-green-600';
        case 'comment': return 'bg-purple-100 text-purple-600';
        case 'update': return 'bg-orange-100 text-orange-600';
        default: return 'bg-gray-100 text-gray-600';
      }
    };

    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className={`p-2 rounded-full ${getBgColor(activity.type)}`}>
          {getIcon(activity.type)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
          <p className="text-sm text-gray-500">{activity.title}</p>
        </div>
        <span className="text-xs text-gray-400">{activity.time}</span>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health & Wellness Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your health platform.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>New Article</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={BookOpen} 
            title="Total Articles" 
            value={stats.totalArticles} 
            change={12}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatCard 
            icon={Users} 
            title="Newsletter Subscribers" 
            value={stats.totalSubscribers} 
            change={8}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatCard 
            icon={Eye} 
            title="Total Views" 
            value={stats.totalViews} 
            change={15}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatCard 
            icon={MessageCircle} 
            title="Comments" 
            value={stats.totalComments} 
            change={-3}
            color="bg-gradient-to-r from-pink-500 to-pink-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  {recentActivity.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Top Articles</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {popularArticles.slice(0, 3).map((article, index) => (
                    <div key={article.id} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{article.title}</p>
                        <p className="text-xs text-gray-500">{article.views.toLocaleString()} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Health Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Health Categories</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { name: 'Sexual Health', count: 32, color: 'bg-pink-100 text-pink-800' },
                    { name: "Men's Performance", count: 28, color: 'bg-blue-100 text-blue-800' },
                    { name: "Women's Vitality", count: 24, color: 'bg-purple-100 text-purple-800' },
                    { name: 'Art of Intimacy', count: 19, color: 'bg-green-100 text-green-800' },
                    { name: 'General Health', count: 24, color: 'bg-orange-100 text-orange-800' }
                  ].map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Monthly Views Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="h-48 flex items-end justify-between space-x-2">
                {[65, 78, 90, 81, 95, 88, 92, 87, 94, 89, 96, 91].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-sm mb-2"
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Engagement */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">User Engagement</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { metric: 'Average Read Time', value: '4m 32s', color: 'bg-blue-500' },
                  { metric: 'Bounce Rate', value: '23%', color: 'bg-green-500' },
                  { metric: 'Return Visitors', value: '68%', color: 'bg-purple-500' },
                  { metric: 'Newsletter Conversion', value: '12%', color: 'bg-pink-500' }
                ].map((item) => (
                  <div key={item.metric} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm text-gray-700">{item.metric}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Great engagement rates!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">Your content is performing 23% above industry average.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Write Article', icon: BookOpen, color: 'from-blue-500 to-blue-600', href: '/admin/addProduct' },
                { title: 'View Articles', icon: Eye, color: 'from-green-500 to-green-600', href: '/admin/blogList' },
                { title: 'Subscribers', icon: Users, color: 'from-purple-500 to-purple-600', href: '/admin/subscriptions' },
                { title: 'Analytics', icon: BarChart3, color: 'from-pink-500 to-pink-600', href: '#' }
              ].map((action) => (
                <button
                  key={action.title}
                  className={`p-4 rounded-lg bg-gradient-to-r ${action.color} text-white hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                >
                  <action.icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">{action.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;