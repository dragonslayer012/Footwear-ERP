import React from 'react';
import { Package, TrendingUp, Users, Factory, Target, AlertTriangle, CheckCircle, Clock, IndianRupee, MoreVertical, User, RefreshCw, Download, FileText, Settings, FileSpreadsheet, FileDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { toast } from 'sonner@2.0.3';

export function Dashboard() {
  // Sample data for charts
  const projectStatusData = [
    { name: 'Bacca Bucci', approved: 45, pending: 12 },
    { name: 'Lifestyle', approved: 38, pending: 8 },
    { name: 'Premium', approved: 28, pending: 15 },
    { name: 'Sports', approved: 32, pending: 6 },
  ];

  const plantUtilizationData = [
    { name: 'Plant A', value: 85, color: '#0c9dcb' },
    { name: 'Plant B', value: 72, color: '#26b4e0' },
    { name: 'Plant C', value: 91, color: '#4cc9f0' },
    { name: 'Plant D', value: 68, color: '#20c997' },
  ];

  const costVarianceData = [
    { month: 'Jan', target: 5000000, actual: 4800000 },
    { month: 'Feb', target: 5200000, actual: 5400000 },
    { month: 'Mar', target: 4800000, actual: 4600000 },
    { month: 'Apr', target: 5500000, actual: 5200000 },
    { month: 'May', target: 5800000, actual: 6000000 },
    { month: 'Jun', target: 6000000, actual: 5700000 },
  ];

  const productionTrendData = [
    { month: 'Jan', production: 12000, target: 15000 },
    { month: 'Feb', production: 15200, target: 15000 },
    { month: 'Mar', production: 14800, target: 15000 },
    { month: 'Apr', production: 16500, target: 15000 },
    { month: 'May', production: 18200, target: 15000 },
    { month: 'Jun', production: 17800, target: 15000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuickAction = (action: string) => {
    toast.info(`${action} clicked`);
  };

  const handleNotificationClick = () => {
    toast.success("Opening notifications panel");
  };

  const UserDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 hover:bg-white/10 rounded-xl px-4 py-3 transition-colors">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[#0c9dcb]" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-900 text-base">Admin User</div>
            <div className="text-sm text-gray-500">Administrator</div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => toast.info("Opening profile")}>
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Opening preferences")}>
          Preferences
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info("Logging out")}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Filters and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-1">Executive Dashboard</h2>
          <p className="text-sm text-gray-600">Comprehensive business intelligence and analytics overview</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-[#0c9dcb] text-[#0c9dcb] hover:bg-[#0c9dcb] hover:text-white"
            onClick={() => toast.success("Dashboard data refreshed")}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-[#0c9dcb] text-[#0c9dcb] hover:bg-[#0c9dcb] hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Dashboard
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.success("Exporting dashboard as PDF...")}>
                <FileText className="w-4 h-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Exporting data as Excel...")}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Exporting data as CSV...")}>
                <FileDown className="w-4 h-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => toast.info("Opening dashboard settings...")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Enhanced Key Metrics Cards with Interactive Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-[#0c9dcb] to-[#26b4e0] text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer group" onClick={() => toast.info("Viewing project details...")}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                  <Target className="w-5 h-5" />
                </div>
                <span>Total Projects</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Viewing detailed breakdown"); }}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Exporting project data"); }}>
                    Export Data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">245</div>
            <p className="text-sm opacity-90 mb-3">+12% from last month</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-3/4 transition-all duration-500"></div>
            </div>
            <div className="mt-2 text-xs opacity-75">Target: 280</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#28a745] to-[#20c997] text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer group" onClick={() => toast.info("Viewing approved projects...")}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span>Green Seal Approved</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Viewing approved projects"); }}>
                    View Projects
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Generating approval report"); }}>
                    Generate Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">128</div>
            <p className="text-sm opacity-90 mb-3">Ready for production</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-4/5 transition-all duration-500"></div>
            </div>
            <div className="mt-2 text-xs opacity-75">Efficiency: 87%</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#ffc107] to-[#fd7e14] text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer group" onClick={() => toast.info("Viewing pending approvals...")}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <span>Pending Approvals</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Viewing pending items"); }}>
                    View Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Sending reminders"); }}>
                    Send Reminders
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">32</div>
            <p className="text-sm opacity-90 mb-3">Awaiting review</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-1/3 transition-all duration-500"></div>
            </div>
            <div className="mt-2 text-xs opacity-75">Avg wait: 2.3 days</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#dc3545] to-[#e83e8c] text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer group" onClick={() => toast.info("Viewing critical issues...")}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <span>Critical Issues</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Viewing issue details"); }}>
                    View Issues
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Creating action plan"); }}>
                    Action Plan
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">8</div>
            <p className="text-sm opacity-90 mb-3">Require immediate attention</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-1/4 transition-all duration-500"></div>
            </div>
            <div className="mt-2 text-xs opacity-75">High priority: 3</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Section with Interactive Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand-wise Project Count */}
        <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900 text-lg">
                <div className="p-2 bg-[#0c9dcb]/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#0c9dcb]" />
                </div>
                Brand-wise Project Performance
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-gray-600 hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => toast.info("Exporting chart data")}>
                    Export Chart
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Viewing detailed metrics")}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Customizing chart view")}>
                    Customize View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6c757d' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6c757d' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="approved" fill="#0c9dcb" radius={[4, 4, 0, 0]} name="Approved" />
                <Bar dataKey="pending" fill="#ffc107" radius={[4, 4, 0, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Plant Utilization */}
        <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900 text-lg">
                <div className="p-2 bg-[#0c9dcb]/10 rounded-lg">
                  <Factory className="w-5 h-5 text-[#0c9dcb]" />
                </div>
                Plant Utilization Overview
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-gray-600 hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => toast.info("Viewing plant details")}>
                    Plant Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Optimizing utilization")}>
                    Optimize Usage
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Generating utilization report")}>
                    Generate Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={plantUtilizationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {plantUtilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Utilization']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {plantUtilizationData.map((plant, index) => (
                <div key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" onClick={() => toast.info(`Viewing ${plant.name} details`)}>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: plant.color }}
                  />
                  <span className="text-sm text-gray-700">{plant.name}: {plant.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Cost Variance and Production Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900 text-lg">
                <div className="p-2 bg-[#0c9dcb]/10 rounded-lg">
                  <IndianRupee className="w-5 h-5 text-[#0c9dcb]" />
                </div>
                Cost Variance Analysis
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-gray-600 hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => toast.info("Viewing cost breakdown")}>
                    Cost Breakdown
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Analyzing variances")}>
                    Variance Analysis
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Exporting cost data")}>
                    Export Data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costVarianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6c757d' }} />
                <YAxis
                  tick={{ fontSize: 12, fill: '#6c757d' }}
                  tickFormatter={(value) => `₹${(value/100000).toFixed(0)}L`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), '']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="target" stroke="#0c9dcb" strokeWidth={3} dot={{ r: 5, strokeWidth: 2 }} name="Target" />
                <Line type="monotone" dataKey="actual" stroke="#26b4e0" strokeWidth={3} dot={{ r: 5, strokeWidth: 2 }} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900 text-lg">
                <div className="p-2 bg-[#0c9dcb]/10 rounded-lg">
                  <Package className="w-5 h-5 text-[#0c9dcb]" />
                </div>
                Production Performance Trend
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-gray-600 hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => toast.info("Viewing production metrics")}>
                    Production Metrics
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Analyzing trends")}>
                    Trend Analysis
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Forecasting production")}>
                    Forecast
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={productionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6c757d' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6c757d' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="production" stroke="#0c9dcb" fill="#0c9dcb" fillOpacity={0.3} name="Production" />
                <Line type="monotone" dataKey="target" stroke="#ff6b6b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-900">Recent System Activities</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-600 hover:bg-gray-100"
                  onClick={() => toast.info("Refreshing activities")}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#0c9dcb] text-[#0c9dcb] hover:bg-[#0c9dcb] hover:text-white"
                  onClick={() => toast.info("Opening activity log")}
                >
                  View All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'New prototype uploaded for Lifestyle Brand', user: 'Designer A', time: '2 hours ago', status: 'success', priority: 'medium' },
                { action: 'Red seal approved for Bacca Bucci Project', user: 'QC Manager', time: '4 hours ago', status: 'warning', priority: 'high' },
                { action: 'Production order PO-2024-001 completed', user: 'Plant Manager', time: '6 hours ago', status: 'success', priority: 'low' },
                { action: 'Costing variance detected in Project RND0125', user: 'Finance Manager', time: '8 hours ago', status: 'error', priority: 'high' },
                { action: 'New vendor registration approved', user: 'Procurement Head', time: '1 day ago', status: 'info', priority: 'low' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 hover:shadow-md transition-all cursor-pointer group" onClick={() => toast.info(`Viewing activity: ${activity.action}`)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 text-sm mb-1">{activity.action}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          activity.priority === 'high' ? 'bg-red-100 text-red-700' :
                          activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {activity.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Viewing details"); }}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Marking as read"); }}>
                        Mark as Read
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.info("Creating follow-up"); }}>
                        Create Follow-up
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-900">Quick Actions</CardTitle>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-600 hover:bg-gray-100"
                onClick={() => toast.info("Customizing quick actions")}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                className="w-full p-3 bg-gradient-to-r from-[#0c9dcb] to-[#26b4e0] text-white rounded-xl hover:shadow-lg transition-all text-sm group"
                onClick={() => handleQuickAction("Create New Project")}
              >
                <Target className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Create New Project
              </Button>
              <Button
                className="w-full p-3 bg-gradient-to-r from-[#20c997] to-[#17a2b8] text-white rounded-xl hover:shadow-lg transition-all text-sm group"
                onClick={() => handleQuickAction("Upload Prototype")}
              >
                <Package className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Upload Prototype
              </Button>
              <Button
                className="w-full p-3 border-2 border-[#0c9dcb] text-[#0c9dcb] rounded-xl hover:bg-[#0c9dcb] hover:text-white transition-all text-sm group"
                onClick={() => handleQuickAction("Generate Report")}
              >
                <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Generate Report
              </Button>
              <Button
                className="w-full p-3 border-2 border-gray-400 text-gray-600 rounded-xl hover:bg-gray-400 hover:text-white transition-all text-sm group"
                onClick={() => handleQuickAction("View All Projects")}
              >
                <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                View All Projects
              </Button>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Recent Shortcuts</p>
                <div className="space-y-1">
                  <button className="w-full text-left p-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => toast.info("Opening RND/25-26/09/103")}>
                    RND/25-26/09/103 - Lifestyle Brand
                  </button>
                  <button className="w-full text-left p-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => toast.info("Opening PO-2024-001")}>
                    PO-2024-001 - Production Order
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}