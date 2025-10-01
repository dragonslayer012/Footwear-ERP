import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Lightbulb, ImageIcon, Workflow, Calculator, Clock, User, IndianRupee, Calendar, FileText, Target, LayoutDashboard, X, Building, Users, AlertCircle, CheckCircle, Activity, Pause, ShoppingCart, CircleCheckBig, CircleX, Package, ChevronLeft, ChevronRight, Upload, Download, Filter, FileSpreadsheet, FileX, FileUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useERPStore } from '../lib/data-store';
import { CreateProjectDialog } from './CreateProjectDialog';
import { ProjectDetailsDialog } from './ProjectDetailsDialog';
import { RedSealProjectDetailsDialog } from './RedSealProjectDetailsDialog';
import { ImportTemplateGenerator } from './ImportTemplateGenerator';
import { toast } from 'sonner@2.0.3';
import type { RDProject } from '../lib/data-store';
import exampleImage from 'figma:asset/c2fa9058b29f3287f5dc21e213bb80c67d127279.png';
import productRefImage from 'figma:asset/64ae9e42e5af4071b394f2d9c57b9efcbeaa7b71.png';

export function RedSeal() {
  const { 
    rdProjects, 
    brands, 
    categories, 
    types, 
    colors, 
    countries, 
    selectRDProject,
    addRDProject 
  } = useERPStore();

  // Footwear product data from reference
  const footwearProducts = [
    { name: 'Chunky Mickey', company: 'SportTech International', brand: 'UA Sports' },
    { name: 'Hydro Dipping Film', company: 'AquaTech Industries Pvt Ltd', brand: 'AquaTech Pro' },
    { name: 'Red zip pocket', company: 'ZipStyle Footwear Co.', brand: 'ZipStyle Elite' },
    { name: 'Black Buckles', company: 'BuckleMax Corporation', brand: 'BuckleMax Premium' },
    { name: 'Cross Rope', company: 'RopeFlex Manufacturers', brand: 'RopeFlex Active' },
    { name: 'UA China EVA slide', company: 'China EVA Exports Ltd', brand: 'UA China' },
    { name: 'Lime strip', company: 'ColorStrip Designs India', brand: 'ColorStrip Fashion' },
    { name: 'Cavity V Camo', company: 'CamoTech Solutions', brand: 'CamoTech Outdoor' },
    { name: 'Black Cross tape', company: 'TapeCross Industries', brand: 'TapeCross Sport' },
    { name: 'UA "V"', company: 'Victory Footwear Ltd', brand: 'UA Victory' },
    { name: 'Halo', company: 'HaloSport Enterprises', brand: 'HaloSport Premium' },
    { name: 'UA Porous', company: 'Porous Tech India Pvt Ltd', brand: 'UA Porous' },
    { name: 'Brown slide', company: 'EarthTone Manufacturers', brand: 'EarthTone Natural' },
    { name: 'Silver Mesh', company: 'MeshTech Innovations', brand: 'MeshTech Advanced' },
    { name: 'Black Pocket', company: 'PocketStyle Fashion House', brand: 'PocketStyle Urban' },
    { name: 'Cross Tape white', company: 'TapeCross Industries', brand: 'TapeCross Classic' },
    { name: 'Removable sticker', company: 'StickerTech Solutions Ltd', brand: 'StickerTech Flex' },
    { name: 'Chunky Frozen', company: 'FrozenStyle Footwear Inc', brand: 'FrozenStyle Winter' }
  ];

  const getProductData = (index: number) => {
    const productIndex = index % footwearProducts.length;
    return footwearProducts[productIndex];
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [redSealDetailsOpen, setRedSealDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<RDProject | null>(null);

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      'Idea Submitted': 'bg-blue-100 text-blue-800',
      'Costing Pending': 'bg-yellow-100 text-yellow-800',
      'Costing Received': 'bg-orange-100 text-orange-800',
      'Prototype': 'bg-purple-100 text-purple-800',
      'Red Seal': 'bg-red-100 text-red-800',
      'Green Seal': 'bg-green-100 text-green-800',
      'Final Approved': 'bg-emerald-100 text-emerald-800',
      'PO Issued': 'bg-gray-100 text-gray-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'High': 'bg-red-500 text-white',
      'Medium': 'bg-purple-500 text-white',
      'Low': 'bg-green-600 text-white'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getProgressValue = (stage: string) => {
    const stages = ['Idea Submitted', 'Costing Pending', 'Costing Received', 'Prototype', 'Red Seal', 'Green Seal', 'Final Approved', 'PO Issued'];
    return ((stages.indexOf(stage) + 1) / stages.length) * 100;
  };

  const getRedSealProjects = () => {
    const searchFiltered = rdProjects.filter(project => {
      const matchesSearch = (project.autoCode?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                           (project.remarks?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    return searchFiltered.filter(p => p.status === 'Red Seal');
  };

  const getPaginatedProjects = (projects: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return projects.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = (totalItems: number) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  const handleProjectClick = (project: RDProject) => {
    setSelectedProject(project);
    setRedSealDetailsOpen(true);
  };

  // Cost overview calculation functions
  const getCostOverviewData = (project: RDProject) => {
    const tentativeCost = project.tentativeCost || 0;
    const btc = project.targetCost || 0; // BTC = Brand Targeting Cost
    const difference = tentativeCost - btc;
    
    return {
      tentativeCost,
      btc,
      difference
    };
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getDifferenceColor = (difference: number) => {
    if (difference > 0) return 'text-red-600'; // Higher cost is bad
    if (difference < 0) return 'text-green-600'; // Lower cost is good
    return 'text-gray-600'; // Equal
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

  // Export functionality
  const exportToExcel = async (data: RDProject[], tabName: string) => {
    try {
      // Import xlsx dynamically
      const XLSX = await import('xlsx');
      
      // Prepare data for export
      const exportData = data.map((project, index) => {
        const brand = brands.find(b => b.id === project.brandId);
        const category = categories.find(c => c.id === project.categoryId);
        const type = types.find(t => t.id === project.typeId);
        const color = colors.find(cl => cl.id === project.colorId);
        const country = countries.find(co => co.id === project.countryId);
        
        return {
          'S.No': index + 1,
          'Project Code': project.autoCode,
          'Brand': brand?.brandName || 'Unknown',
          'Brand Code': brand?.brandCode || 'N/A',
          'Category': category?.categoryName || 'Unknown',
          'Type': type?.typeName || 'Unknown',
          'Color': color?.colorName || 'Unknown',
          'Country': country?.countryName || 'Unknown',
          'Status': project.status,
          'Priority': project.priority || 'Low',
          'Task-INC': project.taskInc || 'Not Assigned',
          'Progress': `${Math.round(getProgressValue(project.status))}%`,
          'Target Cost (₹)': project.targetCost.toLocaleString('en-IN'),
          'Final Cost (₹)': project.finalCost > 0 ? project.finalCost.toLocaleString('en-IN') : 'Not Set',
          'Variance (₹)': project.finalCost > 0 ? (project.finalCost - project.targetCost).toLocaleString('en-IN') : 'N/A',
          'Start Date': new Date(project.startDate).toLocaleDateString('en-GB'),
          'PO Target Date': project.poTarget ? new Date(project.poTarget).toLocaleDateString('en-GB') : 'Not Set',
          'Duration to PO Target': calculateDuration(project.startDate, project.poTarget),
          'Client Feedback': project.clientFeedback,
          'PO Target': project.poTarget ? new Date(project.poTarget).toLocaleDateString('en-GB') : 'Not Set',
          'PO Received': project.poReceived || 'Not Received',
          'Remarks': project.remarks,
          'Created Date': new Date(project.createdDate).toLocaleDateString('en-GB'),
          'Last Updated': new Date(project.updatedDate).toLocaleDateString('en-GB')
        };
      });

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);
      
      // Auto-fit columns
      const colWidths = Object.keys(exportData[0] || {}).map(key => ({
        wch: Math.max(key.length, ...exportData.map(row => String(row[key as keyof typeof row]).length)) + 2
      }));
      ws['!cols'] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, tabName);
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
      const filename = `RedSeal_Export_${tabName}_${timestamp}.xlsx`;
      
      // Save file
      XLSX.writeFile(wb, filename);
      
      toast.success(`Excel file exported successfully! (${data.length} records)`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export Excel file');
    }
  };

  const handleExport = (format: 'excel' | 'xml') => {
    const data = getRedSealProjects();
    
    if (data.length === 0) {
      toast.error('No data available to export');
      return;
    }

    if (format === 'excel') {
      exportToExcel(data, 'Red_Seal_Approval');
    }
  };

  const redSealProjects = getRedSealProjects();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl">Red Seal Approval</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Review and approve prototype designs for Red Seal certification
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem 
                    onClick={() => handleExport('excel')}
                    className="cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                    Export to Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ImportTemplateGenerator moduleType="RedSeal" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search red seal approval projects..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Red Seal Approval Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Code</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image & Profile</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company & Brand</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category, Type & Gender</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Art & Colour</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline, Dates & Duration</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task-INC</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Overview</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getPaginatedProjects(redSealProjects).map((project, index) => {
                  const brand = brands.find(b => b.id === project.brandId);
                  const category = categories.find(c => c.id === project.categoryId);
                  const type = types.find(t => t.id === project.typeId);
                  const color = colors.find(cl => cl.id === project.colorId);
                  const country = countries.find(co => co.id === project.countryId);
                  const productData = getProductData(index);

                  return (
                    <tr 
                      key={project.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      {/* Product Code */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-3">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div className="text-sm font-medium text-gray-900">{project.autoCode}</div>
                        </div>
                      </td>

                      {/* Image & Profile */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <img 
                            src={productRefImage} 
                            alt="Product" 
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm"
                          />
                        </div>
                      </td>

                      {/* Company & Brand */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{productData.company}</div>
                          <div className="text-sm text-gray-500">{productData.brand}</div>
                        </div>
                      </td>

                      {/* Category, Type & Gender */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{category?.categoryName}</div>
                          <div className="text-sm text-gray-500">{type?.typeName}</div>
                          <div className="text-xs text-gray-400">Men</div>
                        </div>
                      </td>

                      {/* Art & Colour */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{productData.name}</div>
                          <div className="text-sm text-gray-500">{color?.colorName}</div>
                        </div>
                      </td>

                      {/* Country */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{country?.countryName}</div>
                      </td>

                      {/* Timeline, Dates & Duration */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3" />
                            <span>Start: {new Date(project.startDate).toLocaleDateString('en-GB')}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-1">
                            <Target className="w-3 h-3" />
                            <span>Target: {project.poTarget ? new Date(project.poTarget).toLocaleDateString('en-GB') : 'TBD'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
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

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${getStageColor(project.status)}`}>
                          {project.status}
                        </span>
                      </td>

                      {/* Priority */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs leading-4 font-semibold rounded ${getPriorityColor(project.priority || 'Low')}`}>
                          {project.priority || 'Low'}
                        </span>
                      </td>

                      {/* Task-INC */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{project.taskInc || 'Priyanka'}</div>
                      </td>

                      {/* Cost Overview */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="flex items-center space-x-1 text-sm font-semibold text-gray-900">
                            <IndianRupee className="w-3 h-3" />
                            <span>{(project.tentativeCost || 0).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="text-xs text-gray-500">Tentative Cost</div>
                          {project.targetCost > 0 && (
                            <div className={`text-xs font-medium mt-1 ${
                              (project.tentativeCost || 0) - project.targetCost < 0 
                                ? 'text-green-600' 
                                : (project.tentativeCost || 0) - project.targetCost > 0 
                                ? 'text-red-600' 
                                : 'text-gray-600'
                            }`}>
                              vs Target: {(project.tentativeCost || 0) - project.targetCost > 0 ? '+' : ''}₹{Math.abs((project.tentativeCost || 0) - project.targetCost).toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Remarks */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">Next: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}</div>
                          <div className="text-sm text-gray-500">{project.clientFeedback}</div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2 justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectClick(project);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectClick(project);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.error('Delete functionality not implemented yet');
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {redSealProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects pending red seal approval</h3>
              <p className="text-gray-600">Projects will appear here when they're ready for red seal approval.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {getPaginatedProjects(redSealProjects).length} of {redSealProjects.length} results
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">1</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <RedSealProjectDetailsDialog
        open={redSealDetailsOpen}
        onClose={() => setRedSealDetailsOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}