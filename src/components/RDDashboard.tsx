import React, { useState } from 'react';
import { Search, Bell, User, Plus, Lightbulb, Beaker, Target, TrendingUp, Clock, AlertTriangle, CheckCircle, Edit, Trash2, MoreVertical, IndianRupee, Upload, Calendar, MapPin, Users, Activity, Pause, ShoppingCart, CircleCheckBig, CircleX, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { LayoutDashboard } from 'lucide-react';

export function RDDashboard() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Workflow metrics based on the design
  const liveProjects = 7;
  const closedProjects = 3;
  const redSealOK = 1;
  const redSealPending = 1;
  const greenSealOK = 1;
  const greenSealPending = 1;
  const poApproved = 1;
  const poPending = 1;
  const successRate = 30;
  const avgTimeline = 45;

  // Sample data for R&D specific charts
  const projectStageData = [
    { stage: 'Concept', count: 15, color: '#0c9dcb' },
    { stage: 'Prototype', count: 28, color: '#26b4e0' },
    { stage: 'Testing', count: 12, color: '#4cc9f0' },
    { stage: 'Approved', count: 35, color: '#20c997' },
  ];

  const costAnalysisData = [
    { month: 'Jan', budget: 4500000, actual: 4200000, variance: 300000 },
    { month: 'Feb', budget: 4800000, actual: 5100000, variance: -300000 },
    { month: 'Mar', budget: 5200000, actual: 4900000, variance: 300000 },
    { month: 'Apr', budget: 5500000, actual: 5300000, variance: 200000 },
    { month: 'May', budget: 5800000, actual: 6000000, variance: -200000 },
    { month: 'Jun', budget: 6000000, actual: 5700000, variance: 300000 },
  ];

  const designerPerformanceData = [
    { designer: 'Designer A', projects: 12, approved: 10, pending: 2 },
    { designer: 'Designer B', projects: 15, approved: 12, pending: 3 },
    { designer: 'Designer C', projects: 8, approved: 7, pending: 1 },
    { designer: 'Designer D', projects: 10, approved: 8, pending: 2 },
  ];

  const recentProjects = [
    {
      id: 'RND/24-25/01/101',
      name: 'Lifestyle Sneaker Collection 2024',
      status: 'Green Seal',
      progress: 85,
      designer: 'Designer A',
      lastUpdate: '2 hours ago',
      priority: 'High',
      cost: 250000
    },
    {
      id: 'RND/24-25/01/102',
      name: 'Bacca Bucci Formal Collection',
      status: 'Prototype',
      progress: 60,
      designer: 'Designer B',
      lastUpdate: '4 hours ago',
      priority: 'Medium',
      cost: 320000
    },
    {
      id: 'RND/24-25/01/103',
      name: 'Summer Sandals Premium',
      status: 'Costing Pending',
      progress: 40,
      designer: 'Designer C',
      lastUpdate: '1 day ago',
      priority: 'Low',
      cost: 180000
    },
    {
      id: 'RND/24-25/01/104',
      name: 'Athletic Running Shoes',
      status: 'Red Seal',
      progress: 70,
      designer: 'Designer A',
      lastUpdate: '6 hours ago',
      priority: 'High',
      cost: 280000
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Green Seal': return 'bg-green-100 text-green-700 border-green-200';
      case 'Red Seal': return 'bg-red-100 text-red-700 border-red-200';
      case 'Prototype': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Costing Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleNotificationClick = () => {
    toast.success("Opening notifications panel");
  };

  const handleEditProject = (projectId: string) => {
    toast.info(`Editing project ${projectId}`);
  };

  const handleDeleteProject = (projectId: string) => {
    toast.error(`Deleting project ${projectId}`);
  };

  const UserDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 hover:bg-white/10 rounded-xl px-4 py-3 transition-colors">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[#0c9dcb]" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-900 text-base">R&D Manager</div>
            <div className="text-sm text-gray-500">Design Team Lead</div>
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
      {/* Subheading */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">R&D Dashboard</h2>
        <p className="text-sm text-gray-600">Overview and analytics for R&D operations</p>
      </div>

      {/* Main Workflow Metrics Cards - Only 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Live Projects & Closed Projects */}
        <Card className="bg-gradient-to-br from-[#0c9dcb] to-[#26b4e0] text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 rounded-2xl overflow-hidden">
          <CardHeader className="pb-2 pt-6 px-6">
            <CardTitle className="flex items-center gap-3 text-base font-medium">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-white/90">Live Projects and Closed Projects</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{liveProjects}</div>
                <p className="text-sm font-medium opacity-90">Live</p>
              </div>
              <div className="text-white/40 text-2xl font-light">|</div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{closedProjects}</div>
                <p className="text-sm font-medium opacity-90">Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Red Seal OK & Pending */}
        <Card className="bg-gradient-to-br from-[#dc3545] to-[#e83e8c] text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 rounded-2xl overflow-hidden">
          <CardHeader className="pb-2 pt-6 px-6">
            <CardTitle className="flex items-center gap-3 text-base font-medium">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-white/90">Red Seal Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{redSealOK}</div>
                <p className="text-sm font-medium opacity-90">Approved</p>
              </div>
              <div className="text-white/40 text-2xl font-light">|</div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{redSealPending}</div>
                <p className="text-sm font-medium opacity-90">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Green Seal OK & Pending */}
        <Card className="bg-gradient-to-br from-[#28a745] to-[#20c997] text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 rounded-2xl overflow-hidden">
          <CardHeader className="pb-2 pt-6 px-6">
            <CardTitle className="flex items-center gap-3 text-base font-medium">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-white/90">Green Seal Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{greenSealOK}</div>
                <p className="text-sm font-medium opacity-90">Approved</p>
              </div>
              <div className="text-white/40 text-2xl font-light">|</div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{greenSealPending}</div>
                <p className="text-sm font-medium opacity-90">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PO Approved & Pending */}
        <Card className="bg-gradient-to-br from-[#fd7e14] to-[#ffc107] text-white border-0 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 rounded-2xl overflow-hidden">
          <CardHeader className="pb-2 pt-6 px-6">
            <CardTitle className="flex items-center gap-3 text-base font-medium">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <span className="text-white/90">PO Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{poApproved}</div>
                <p className="text-sm font-medium opacity-90">Approved</p>
              </div>
              <div className="text-white/40 text-2xl font-light">|</div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{poPending}</div>
                <p className="text-sm font-medium opacity-90">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Stage Distribution */}
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-900 text-lg">
              <div className="p-2 bg-[#0c9dcb]/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#0c9dcb]" />
              </div>
              Project Stage Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {projectStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} projects`, 'Count']}
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
              {projectStageData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">{item.stage}: {item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Designer Performance */}
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-900 text-lg">
              <div className="p-2 bg-[#0c9dcb]/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#0c9dcb]" />
              </div>
              Designer Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={designerPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="designer" 
                  tick={{ fontSize: 12, fill: '#6c757d' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6c757d' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="approved" fill="#20c997" radius={[4, 4, 0, 0]} name="Approved" />
                <Bar dataKey="pending" fill="#ffc107" radius={[4, 4, 0, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cost Analysis Chart */}
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-900 text-lg">
            <div className="p-2 bg-[#0c9dcb]/10 rounded-lg">
              <IndianRupee className="w-5 h-5 text-[#0c9dcb]" />
            </div>
            R&D Cost Analysis & Budget Variance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={costAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6c757d' }}
              />
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
              <Line 
                type="monotone" 
                dataKey="budget" 
                stroke="#0c9dcb" 
                strokeWidth={3} 
                dot={{ r: 5, fill: '#0c9dcb' }}
                name="Budget"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#26b4e0" 
                strokeWidth={3} 
                dot={{ r: 5, fill: '#26b4e0' }}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Enhanced Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-xl border-0 bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-900">Recent R&D Projects</CardTitle>
              <Button 
                size="sm"
                className="bg-[#0c9dcb] hover:bg-[#0a8bb5] text-white"
                onClick={() => toast.success("Viewing all projects")}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 text-base">{project.name}</h4>
                      <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                        {project.status}
                      </Badge>
                      <Badge className={`${getPriorityColor(project.priority)} border text-xs`}>
                        {project.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>ID: {project.id}</span>
                      <span>Designer: {project.designer}</span>
                      <span>Cost: {formatCurrency(project.cost)}</span>
                      <span>{project.lastUpdate}</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#0c9dcb] to-[#26b4e0] h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[#0c9dcb] text-[#0c9dcb] hover:bg-[#0c9dcb] hover:text-white"
                      onClick={() => handleEditProject(project.id)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" className="p-1">
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => toast.info(`Viewing details for ${project.id}`)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info(`Cloning project ${project.id}`)}>
                          Clone Project
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info(`Archiving project ${project.id}`)}>
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions */}
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-900">R&D Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full p-3 bg-gradient-to-r from-[#0c9dcb] to-[#26b4e0] text-white rounded-xl hover:shadow-lg transition-all text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New R&D Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New R&D Project</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to create a new R&D project in the system. This will initiate the project workflow from idea submission to final approval.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 p-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="projectName">Project Name *</Label>
                          <Input id="projectName" placeholder="Enter project name" />
                        </div>
                        <div>
                          <Label htmlFor="projectCode">Project Code</Label>
                          <Input id="projectCode" placeholder="Auto-generated (RND/25-26/09/125)" disabled />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Project Description *</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Describe the project goals, target market, and key features..."
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Project Details</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="category">Product Category *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sneakers">Sneakers</SelectItem>
                              <SelectItem value="formal">Formal Shoes</SelectItem>
                              <SelectItem value="sandals">Sandals</SelectItem>
                              <SelectItem value="boots">Boots</SelectItem>
                              <SelectItem value="sports">Sports Shoes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="brand">Brand *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="brand1">Bacca Bucci</SelectItem>
                              <SelectItem value="brand2">Premium Collection</SelectItem>
                              <SelectItem value="brand3">Sports Line</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="priority">Priority *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="targetMarket">Target Market *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select target market" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="men">Men</SelectItem>
                              <SelectItem value="women">Women</SelectItem>
                              <SelectItem value="kids">Kids</SelectItem>
                              <SelectItem value="unisex">Unisex</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="season">Season *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select season" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="spring">Spring</SelectItem>
                              <SelectItem value="summer">Summer</SelectItem>
                              <SelectItem value="autumn">Autumn</SelectItem>
                              <SelectItem value="winter">Winter</SelectItem>
                              <SelectItem value="all-season">All Season</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Budget & Timeline</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="estimatedBudget">Estimated Budget (₹) *</Label>
                          <Input id="estimatedBudget" type="number" placeholder="Enter amount in INR" />
                        </div>
                        <div>
                          <Label htmlFor="startDate">Start Date *</Label>
                          <Input id="startDate" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="expectedCompletion">Expected Completion *</Label>
                          <Input id="expectedCompletion" type="date" />
                        </div>
                      </div>
                    </div>

                    {/* Team Assignment */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Team Assignment</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="leadDesigner">Lead Designer *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select lead designer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="designer-a">Designer A</SelectItem>
                              <SelectItem value="designer-b">Designer B</SelectItem>
                              <SelectItem value="designer-c">Designer C</SelectItem>
                              <SelectItem value="designer-d">Designer D</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="projectManager">Project Manager</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project manager" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pm1">Sarah Johnson</SelectItem>
                              <SelectItem value="pm2">Mike Chen</SelectItem>
                              <SelectItem value="pm3">Emily Davis</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Materials & Specifications */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Materials & Specifications</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="primaryMaterial">Primary Material</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select primary material" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="leather">Leather</SelectItem>
                              <SelectItem value="synthetic">Synthetic</SelectItem>
                              <SelectItem value="canvas">Canvas</SelectItem>
                              <SelectItem value="mesh">Mesh</SelectItem>
                              <SelectItem value="rubber">Rubber</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="colorPalette">Color Palette</Label>
                          <Input id="colorPalette" placeholder="e.g., Black, Brown, Navy Blue" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="sizeRange">Size Range</Label>
                          <Input id="sizeRange" placeholder="e.g., 6-12 (UK)" />
                        </div>
                        <div>
                          <Label htmlFor="specialFeatures">Special Features</Label>
                          <Input id="specialFeatures" placeholder="e.g., Waterproof, Breathable, Anti-slip" />
                        </div>
                      </div>
                    </div>

                    {/* File Attachments */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Attachments & References</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Design References / Inspiration Images</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Drop images here or click to browse</p>
                            <Button variant="outline" size="sm">
                              <Plus className="w-4 h-4 mr-2" />
                              Choose Files
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">PNG, JPG, PDF up to 10MB each</p>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Technical Specifications Document</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Upload technical documents</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Browse Files
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Market Research */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Market Research & Positioning</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="targetPrice">Target Retail Price (₹)</Label>
                          <Input id="targetPrice" type="number" placeholder="Enter target price" />
                        </div>
                        <div>
                          <Label htmlFor="competitorAnalysis">Key Competitors</Label>
                          <Input id="competitorAnalysis" placeholder="e.g., Nike, Adidas, Puma" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="marketNeed">Market Need / Problem Statement</Label>
                        <Textarea 
                          id="marketNeed" 
                          placeholder="Describe the market gap or customer need this product addresses..."
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Additional Information</h3>
                      <div>
                        <Label htmlFor="additionalNotes">Notes & Special Instructions</Label>
                        <Textarea 
                          id="additionalNotes" 
                          placeholder="Any additional notes, special requirements, or instructions for the design team..."
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="riskFactors">Risk Factors</Label>
                          <Textarea 
                            id="riskFactors" 
                            placeholder="Identify potential risks or challenges..."
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label htmlFor="successCriteria">Success Criteria</Label>
                          <Textarea 
                            id="successCriteria" 
                            placeholder="Define what success looks like for this project..."
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                      <Button variant="outline">Save as Draft</Button>
                      <Button variant="outline">Preview</Button>
                      <Button 
                        className="bg-[#0c9dcb] hover:bg-[#0a8bb5] text-white"
                        onClick={() => {
                          toast.success("R&D Project created successfully!");
                        }}
                      >
                        Create Project
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                className="w-full p-3 bg-gradient-to-r from-[#20c997] to-[#17a2b8] text-white rounded-xl hover:shadow-lg transition-all text-sm"
                onClick={() => toast.success("Opening prototype manager")}
              >
                <Beaker className="w-4 h-4 mr-2" />
                Manage Prototypes
              </Button>
              
              <Button 
                className="w-full p-3 border-2 border-[#0c9dcb] text-[#0c9dcb] rounded-xl hover:bg-[#0c9dcb] hover:text-white transition-all text-sm"
                onClick={() => toast.info("Generating R&D report")}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Generate R&D Report
              </Button>
              
              <Button 
                className="w-full p-3 border-2 border-gray-400 text-gray-600 rounded-xl hover:bg-gray-400 hover:text-white transition-all text-sm"
                onClick={() => toast.info("Opening design library")}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Design Library
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}