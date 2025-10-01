import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Filter, Download, Upload, Eye, Activity, Clock, CheckCircle, AlertTriangle, Target, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useERPStore } from '../lib/data-store';
import type { RDProject } from '../lib/data-store';
import { CreateProjectDialog } from './CreateProjectDialog';

// Import sub-components
import { RDDashboard } from './RDDashboard';
import { ProjectDevelopment } from './ProjectDevelopment';
import { RedSeal } from './RedSeal';
import { GreenSeal } from './GreenSeal';
import { POTargetDate } from './POTargetDate';

interface RDManagementProps {
  currentSubModule?: string;
}

export function RDManagement({ currentSubModule }: RDManagementProps) {
  const { rdProjects, brands, categories, types, colors, countries, users } = useERPStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubModule, setSelectedSubModule] = useState('');
  const [selectedTab, setSelectedTab] = useState('live-projects');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(8);
  const [newProjectOpen, setNewProjectOpen] = useState(false);

  // Safe close handler for dialog
  const handleCloseDialog = React.useCallback(() => {
    console.log('RDManagement handleCloseDialog called');
    setNewProjectOpen(false);
  }, []);

  React.useEffect(() => {
    if (currentSubModule) {
      setSelectedSubModule(currentSubModule);
    }
  }, [currentSubModule]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Route to specific components based on sub-module
  if (selectedSubModule === 'rd-dashboard') {
    return <RDDashboard />;
  }
  
  if (selectedSubModule === 'project') {
    return <ProjectDevelopment />;
  }
  
  if (selectedSubModule === 'red-seal') {
    return <RedSeal />;
  }
  
  if (selectedSubModule === 'green-seal') {
    return <GreenSeal />;
  }
  
  if (selectedSubModule === 'po-target-date') {
    return <POTargetDate />;
  }

  // Helper functions
  const getBrandName = (brandId: string) => {
    const brand = brands.find(b => b.id === brandId);
    return brand?.brandName || 'Unknown';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.categoryName || 'Unknown';
  };

  const getTypeName = (typeId: string) => {
    const type = types.find(t => t.id === typeId);
    return type?.typeName || 'Unknown';
  };

  const getColorName = (colorId: string) => {
    const color = colors.find(c => c.id === colorId);
    return color?.colorName || 'Unknown';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Calculate duration between start date and PO target date
  const calculateDuration = (startDate: string, poTargetDate?: string) => {
    if (!poTargetDate) return 'TBD';
    
    const start = new Date(startDate);
    const target = new Date(poTargetDate);
    
    // Calculate difference in days
    const diffTime = target.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    return `${diffDays} days`;
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Idea Submitted':
        return 'secondary';
      case 'Costing Pending':
      case 'Costing Received':
        return 'outline';
      case 'Prototype':
        return 'default';
      case 'Red Seal':
        return 'destructive';
      case 'Green Seal':
        return 'default';
      case 'Final Approved':
        return 'default';
      case 'PO Issued':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getClientFeedbackBadge = (feedback: string) => {
    switch (feedback) {
      case 'OK':
        return <Badge className="bg-green-100 text-green-800">OK</Badge>;
      case 'Update Required':
        return <Badge className="bg-orange-100 text-orange-800">Update Required</Badge>;
      case 'Pending':
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  // Tab configuration
  const tabConfig = [
    {
      id: 'live-projects',
      name: 'Live Projects',
      icon: <Activity className="w-4 h-4" />,
      filter: (projects: RDProject[]) => projects.filter(p => !['Final Approved', 'PO Issued'].includes(p.status))
    },
    {
      id: 'closed-projects', 
      name: 'Closed Projects',
      icon: <CheckCircle className="w-4 h-4" />,
      filter: (projects: RDProject[]) => projects.filter(p => ['Final Approved', 'PO Issued'].includes(p.status))
    },
    {
      id: 'red-seal-ok',
      name: 'Red Seal OK',
      icon: <AlertTriangle className="w-4 h-4" />,
      filter: (projects: RDProject[]) => projects.filter(p => p.status === 'Red Seal' && p.clientFeedback === 'OK')
    },
    {
      id: 'red-seal-pending',
      name: 'Red Seal Pending',
      icon: <Clock className="w-4 h-4" />,
      filter: (projects: RDProject[]) => projects.filter(p => p.status === 'Red Seal' && p.clientFeedback !== 'OK')
    },
    {
      id: 'green-seal-ok',
      name: 'Green Seal OK', 
      icon: <CheckCircle className="w-4 h-4" />,
      filter: (projects: RDProject[]) => projects.filter(p => p.status === 'Green Seal' && p.clientFeedback === 'OK')
    },
    {
      id: 'green-seal-pending',
      name: 'Green Seal Pending',
      icon: <Clock className="w-4 h-4" />,
      filter: (projects: RDProject[]) => projects.filter(p => p.status === 'Green Seal' && p.clientFeedback !== 'OK')
    },
    {
      id: 'po-approved',
      name: 'PO Approved',
      icon: <CheckCircle className="w-4 h-4" />,
      filter: (projects: RDProject[]) => projects.filter(p => p.status === 'Final Approved' && p.poReceived)
    },
    {
      id: 'po-pending',
      name: 'PO Pending',
      icon: <Target className="w-4 h-4" />,
      filter: (projects: RDProject[]) => projects.filter(p => p.status === 'Final Approved' && !p.poReceived)
    }
  ];

  const getCurrentData = () => {
    const currentTab = tabConfig.find(tab => tab.id === selectedTab);
    if (!currentTab) return [];
    
    const filteredByTab = currentTab.filter(rdProjects);
    
    return filteredByTab.filter(project => {
      const matchesSearch = (project.autoCode?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                           (project.remarks?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                           (getBrandName(project.brandId)?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                           (getCategoryName(project.categoryId)?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  const getPaginatedData = () => {
    const data = getCurrentData();
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(getCurrentData().length / entriesPerPage);
  };

  const currentTabData = getCurrentData();
  const paginatedData = getPaginatedData();
  const totalPages = getTotalPages();

  return (
    <div className="space-y-6">
      {/* Main Content Card - EXACT SAME AS MASTER DATA */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl">R&D Project Management</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Track and manage footwear design and development projects through workflow stages
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button 
                className="bg-[#0c9dcb] hover:bg-[#0c9dcb]/90"
                onClick={() => setNewProjectOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
              {tabConfig.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1 text-xs">
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.name}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {tab.filter(rdProjects).length}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabConfig.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                {/* Search and Filters - EXACT SAME AS MASTER DATA */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search projects by code, brand, category, or remarks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* Data Table - EXACT SAME STRUCTURE AS MASTER DATA */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Project Code & Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Brand & Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Material & Origin
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Project Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Financial Overview (₹)
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Timeline, Dates & Duration
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Client Feedback
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.length > 0 ? (
                          paginatedData.map((project, index) => (
                            <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xs font-medium">
                                      {String(index + 1).padStart(2, '0')}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{project.autoCode}</div>
                                    <div className="text-xs text-gray-500 truncate max-w-40" title={project.remarks}>
                                      {project.remarks}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{getBrandName(project.brandId)}</div>
                                  <div className="text-xs text-gray-500">{project.brandId}</div>
                                  <div className="text-xs text-blue-600">{getCategoryName(project.categoryId)}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="flex items-center gap-1 text-sm">
                                    <div className="w-3 h-3 rounded-full bg-gray-400" style={{backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16)}}></div>
                                    <span>{getColorName(project.colorId)}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">{getTypeName(project.typeId)}</div>
                                  <div className="text-xs text-gray-500">Origin: India</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <Badge variant={getStatusBadgeVariant(project.status)} className="text-xs mb-1">
                                    {project.status}
                                  </Badge>
                                  <div className="text-xs text-gray-500">75% Complete</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm">
                                  <div className="text-gray-900">{formatCurrency(project.targetCost)}</div>
                                  <div className="text-xs text-gray-500">Target Cost</div>
                                  {project.finalCost > 0 && (
                                    <div className="text-xs text-green-600">Variance: {formatCurrency(project.finalCost - project.targetCost)}</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-xs space-y-1">
                                  <div className="flex items-center text-gray-900">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Start: {formatDate(project.startDate)}
                                  </div>
                                  <div className="flex items-center text-gray-500">
                                    <Target className="w-3 h-3 mr-1" />
                                    Target: {project.poTarget ? formatDate(project.poTarget) : 'TBD'}
                                  </div>
                                  <div className="flex items-center text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span className={`font-medium ${
                                      project.poTarget && calculateDuration(project.startDate, project.poTarget).includes('overdue') 
                                        ? 'text-red-600' 
                                        : project.poTarget && calculateDuration(project.startDate, project.poTarget).includes('Due today')
                                        ? 'text-orange-600'
                                        : 'text-gray-700'
                                    }`}>
                                      Duration: {calculateDuration(project.startDate, project.poTarget)}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  {getClientFeedbackBadge(project.clientFeedback)}
                                  {project.clientFeedback === 'OK' && (
                                    <div className="text-xs text-gray-500 mt-1">Last Updated: {formatDate(project.endDate)}</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center gap-2 justify-end">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                              <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                  <Search className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                  <p className="font-medium">No projects found</p>
                                  <p className="text-sm">Try adjusting your search criteria or tab selection</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination - EXACT SAME AS MASTER DATA */}
                {currentTabData.length > 0 && (
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                      Showing {paginatedData.length} of {currentTabData.length} results
                    </p>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-[#0c9dcb] text-white border-[#0c9dcb]"
                      >
                        {currentPage}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage >= totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Create Project Dialog */}
      <CreateProjectDialog 
        open={newProjectOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
}