import React, { useState, useEffect } from 'react';
import { Eye, Edit2, ArrowRight, Calendar, User, IndianRupee, Clock, CheckCircle, AlertTriangle, Workflow, Target, Building, Users, X, Save, RefreshCw, Calculator, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';
import { useERPStore } from '../lib/data-store';
import type { RDProject } from '../lib/data-store';
import { TentativeCostDialog } from './TentativeCostDialog';

interface ProjectDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: RDProject | null;
  brands: any[];
  categories: any[];
  types: any[];
  colors: any[];
  countries: any[];
}

const workflowStages = [
  { id: 'Idea Submitted', name: 'Idea Submitted', color: 'bg-blue-100 text-blue-800', progress: 10 },
  { id: 'Costing Pending', name: 'Costing Pending', color: 'bg-yellow-100 text-yellow-800', progress: 20 },
  { id: 'Costing Received', name: 'Costing Received', color: 'bg-orange-100 text-orange-800', progress: 35 },
  { id: 'Prototype', name: 'Prototype', color: 'bg-purple-100 text-purple-800', progress: 50 },
  { id: 'Red Seal', name: 'Red Seal', color: 'bg-red-100 text-red-800', progress: 65 },
  { id: 'Green Seal', name: 'Green Seal', color: 'bg-green-100 text-green-800', progress: 80 },
  { id: 'Final Approved', name: 'Final Approved', color: 'bg-emerald-100 text-emerald-800', progress: 95 },
  { id: 'PO Issued', name: 'PO Issued', color: 'bg-teal-100 text-teal-800', progress: 100 }
];

export function ProjectDetailsDialog({ open, onOpenChange, project, brands, categories, types, colors, countries }: ProjectDetailsDialogProps) {
  const { updateRDProject } = useERPStore();

  // Add safe defaults at the top
  const safeBrands = brands || [];
  const safeCategories = categories || [];
  const safeTypes = types || [];
  const safeColors = colors || [];
  const safeCountries = countries || [];

  const handleCloseDialog = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  // Red Seal Development table data - matching exact table content
  const redSealDevelopmentData = [
    { 
      productCode: 'RND/24-25/01/102', 
      brand: 'UA Sports', 
      brandCode: 'UAS01',
      category: 'Formal',
      type: 'Leather', 
      gender: 'Men',
      artColour: 'Chunky Mickey',
      color: 'Brown',
      country: 'China',
      startDate: '05/01/2024',
      targetDate: '20/04/2024',
      status: 'Prototype',
      nextDate: '08/09/2025',
      remarks: 'Update Required'
    },
    { 
      productCode: 'RND/24-25/01/107', 
      brand: 'AquaTech', 
      brandCode: 'AQT02',
      category: 'Casual',
      type: 'CKD', 
      gender: 'Men',
      artColour: 'Hydro Dipping Film',
      color: 'White',
      country: 'India',
      startDate: '12/01/2024',
      targetDate: '30/04/2024',
      status: 'Costing Received',
      nextDate: '08/09/2025',
      remarks: 'OK'
    },
    { 
      productCode: 'RND/24-25/01/110', 
      brand: 'ZipStyle', 
      brandCode: 'ZPS03',
      category: 'Formal',
      type: 'Leather', 
      gender: 'Men',
      artColour: 'Red zip pocket',
      color: 'Navy Blue',
      country: 'India',
      startDate: '18/01/2024',
      targetDate: '05/05/2024',
      status: 'Prototype',
      nextDate: '08/09/2025',
      remarks: 'Pending'
    }
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<RDProject | null>(null);
  const [tentativeCostOpen, setTentativeCostOpen] = useState(false);

  useEffect(() => {
    if (project) {
      setEditedProject({ ...project });
    }
  }, [project]);

  if (!project || !editedProject) return null;

  // Get project data based on project code
  const getProjectData = () => {
    const projectData = redSealDevelopmentData.find(p => p.productCode === project.autoCode);
    return projectData || redSealDevelopmentData[0]; // fallback to first item
  };

  const projectData = getProjectData();

  const getBrandName = (brandId: string) => {
    if (!brands || brands.length === 0) return projectData.brand;
    const brand = brands.find(b => b.id === brandId);
    return brand?.brandName || projectData.brand;
  };

  const getBrandCode = (brandId: string) => {
    if (!brands || brands.length === 0) return projectData.brandCode;
    const brand = brands.find(b => b.id === brandId);
    return brand?.brandCode || projectData.brandCode;
  };

  const getCategoryName = (categoryId: string) => {
    if (!categories || categories.length === 0) return projectData.category;
    const category = categories.find(c => c.id === categoryId);
    return category?.categoryName || projectData.category;
  };

  const getTypeName = (typeId: string) => {
    if (!types || types.length === 0) return projectData.type;
    const type = types.find(t => t.id === typeId);
    return type?.typeName || projectData.type;
  };

  const getColorName = (colorId: string) => {
    if (!colors || colors.length === 0) return projectData.color;
    const color = colors.find(c => c.id === colorId);
    return color?.colorName || projectData.color;
  };

  const getCountryName = (countryId: string) => {
    if (!countries || countries.length === 0) return projectData.country;
    const country = countries.find(c => c.id === countryId);
    return country?.countryName || projectData.country;
  };

  const getCurrentStage = () => {
    return workflowStages.find(stage => stage.id === project.status) || workflowStages.find(stage => stage.id === projectData.status) || workflowStages[0];
  };

  const getNextStage = () => {
    const currentIndex = workflowStages.findIndex(stage => stage.id === project.status);
    return currentIndex < workflowStages.length - 1 ? workflowStages[currentIndex + 1] : null;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return projectData.startDate;
    // If it's already in DD/MM/YYYY format, return as is
    if (dateString.includes('/')) return dateString;
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleSave = () => {
    if (editedProject) {
      updateRDProject(editedProject.id, editedProject);
      toast.success('Project updated successfully!');
      setIsEditing(false);
    }
  };

  const handleAdvanceStage = () => {
    const nextStage = getNextStage();
    if (nextStage && editedProject) {
      const updatedProject = { ...editedProject, status: nextStage.id };
      setEditedProject(updatedProject);
      updateRDProject(editedProject.id, updatedProject);
      toast.success(`Project advanced to ${nextStage.name}!`);
    }
  };

  const handleTentativeCostCalculation = () => {
    setTentativeCostOpen(true);
  };

  const handleTentativeCostApproved = () => {
    // Advance to Red Seal stage after tentative cost approval
    handleAdvanceStage();
  };

  const currentStage = getCurrentStage();
  const nextStage = getNextStage();

  // Get color based on project color
  const getColorDisplay = () => {
    const colorName = getColorName(project.colorId);
    const colorMap: Record<string, string> = {
      'Black': 'bg-gray-900',
      'White': 'bg-gray-100 border border-gray-300',
      'Brown': 'bg-yellow-600',
      'Navy Blue': 'bg-blue-900',
      'Red': 'bg-red-600'
    };
    return colorMap[colorName] || colorMap[projectData.color] || 'bg-gray-400';
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!max-w-[85vw] !w-[85vw] max-h-[90vh] overflow-hidden p-0 m-0 flex flex-col">
          {/* Sticky Header Section */}
          <div className="sticky top-0 z-50 px-8 py-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#0c9dcb] to-[#26b4e0] rounded-xl flex items-center justify-center shadow-lg">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-3xl font-semibold text-gray-900 mb-2">
                    Red Seal Development Details
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    View and manage Red Seal Development project details and information
                  </DialogDescription>
                  <div className="flex items-center gap-4">
                    <span className="text-lg text-gray-600">{projectData.productCode}</span>
                    <Badge className={`${currentStage.color} text-sm px-3 py-1`}>
                      {currentStage.name}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Project
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsEditing(false);
                        setEditedProject({ ...project });
                      }}
                      variant="outline"
                    >
                      Cancel Edit
                    </Button>
                  </div>
                )}
                {nextStage && (
                  <>
                    {project.status === 'Prototype' && nextStage.id === 'Red Seal' ? (
                      <Button 
                        onClick={handleTentativeCostCalculation}
                        className="bg-[rgba(0,188,125,1)] hover:bg-blue-600"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Advance to Red Seal
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleAdvanceStage}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Advance to {nextStage.name}
                      </Button>
                    )}
                  </>
                )}
                <Button 
  onClick={(e) => {
    e.stopPropagation();
    e.preventDefault();
    onOpenChange(false);
  }}
  variant="ghost"
  size="sm"
  className="h-10 w-10 p-0 hover:bg-gray-100 rounded-full cursor-pointer flex items-center justify-center"
  type="button"
>
  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
</Button>
              </div>
            </div>
          </div>

          {/* Scrollable Main Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="px-8 py-8 space-y-10">
            {/* Workflow Progress */}
            <div className="space-y-5">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                  <Workflow className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Development Progress</h3>
              </div>
              
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                    <span className="text-sm font-bold text-gray-900">{currentStage.progress}%</span>
                  </div>
                  <Progress value={currentStage.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-8 gap-2">
                  {workflowStages.map((stage, index) => {
                    const isCompleted = workflowStages.findIndex(s => s.id === project.status) >= index;
                    const isCurrent = stage.id === project.status;
                    
                    return (
                      <div 
                        key={stage.id}
                        className={`text-center p-2 rounded-lg transition-all ${
                          isCurrent 
                            ? 'bg-blue-100 border-2 border-blue-400 shadow-md' 
                            : isCompleted 
                              ? 'bg-green-50 border border-green-200' 
                              : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className={`w-6 h-6 mx-auto mb-1 rounded-full flex items-center justify-center text-xs ${
                          isCurrent 
                            ? 'bg-blue-500 text-white' 
                            : isCompleted 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-300 text-gray-600'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-3 h-3" /> : index + 1}
                        </div>
                        <div className="text-xs font-medium text-gray-700">{stage.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Development Information</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product & Brand Details */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Product & Brand Details</h4>
                  
                  {/* Product Image Preview */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label className="text-sm font-medium text-gray-600 mb-3 block">Product Preview</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                        <img 
                          src="https://images.unsplash.com/photo-1648501570189-0359dab185e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbmVha2VyJTIwc2hvZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzU2NzM1OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt={projectData.artColour}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-medium text-gray-900">{projectData.artColour}</div>
                        <div className="text-sm text-gray-500 mt-1">Development Sample</div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className={`w-3 h-3 rounded-full ${getColorDisplay()}`}></div>
                          <span className="text-xs text-gray-400">{getColorName(project.colorId)} Variant</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Product Code</Label>
                      <div className="mt-1 text-base font-mono font-bold text-gray-900">{projectData.productCode}</div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Brand & Profile</Label>
                      {isEditing ? (
                        <Select 
                          value={editedProject.brandId} 
                          onValueChange={(value) => setEditedProject({...editedProject, brandId: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(brands || []).map(brand => (
                              <SelectItem key={brand.id} value={brand.id}>{brand.brandName}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1">
                          <div className="text-base font-medium text-gray-900">{getBrandName(project.brandId)}</div>
                          <div className="text-sm text-gray-500">{getBrandCode(project.brandId)}</div>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Category, Type & Gender</Label>
                      {isEditing ? (
                        <div className="space-y-2 mt-1">
                          <Select 
                            value={editedProject.categoryId} 
                            onValueChange={(value) => setEditedProject({...editedProject, categoryId: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {(categories || []).map(category => (
                                <SelectItem key={category.id} value={category.id}>{category.categoryName}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select 
                            value={editedProject.typeId} 
                            onValueChange={(value) => setEditedProject({...editedProject, typeId: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {(types || []).map(type => (
                                <SelectItem key={type.id} value={type.id}>{type.typeName}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <div className="mt-1">
                          <div className="text-base font-medium text-gray-900">{getCategoryName(project.categoryId)}</div>
                          <div className="text-sm text-gray-500">{getTypeName(project.typeId)}</div>
                          <div className="text-xs text-gray-400">{projectData.gender}</div>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Art & Colour</Label>
                      <div className="mt-1">
                        <div className="text-base font-medium text-gray-900">{projectData.artColour}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-4 h-4 rounded-full ${getColorDisplay()}`}></div>
                          <span className="text-sm text-gray-500">{getColorName(project.colorId)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Country</Label>
                      {isEditing ? (
                        <Select 
                          value={editedProject.countryId} 
                          onValueChange={(value) => setEditedProject({...editedProject, countryId: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(countries || []).map(country => (
                              <SelectItem key={country.id} value={country.id}>{country.countryName}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 text-base text-gray-900">{getCountryName(project.countryId)}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline & Status */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Timeline & Status</h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Start Date</Label>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editedProject.startDate}
                          onChange={(e) => setEditedProject({...editedProject, startDate: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <div className="mt-1 text-base text-gray-900">{formatDate(project.startDate)}</div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Target Date</Label>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editedProject.endDate}
                          onChange={(e) => setEditedProject({...editedProject, endDate: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <div className="mt-1 text-base text-gray-900">{projectData.targetDate}</div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Current Status</Label>
                      <div className="mt-1">
                        <Badge className={currentStage.color}>
                          {currentStage.name}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Client Feedback Status</Label>
                      {isEditing ? (
                        <Select 
                          value={editedProject.clientFeedback} 
                          onValueChange={(value) => setEditedProject({...editedProject, clientFeedback: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="OK">Approved</SelectItem>
                            <SelectItem value="Update Required">Update Required</SelectItem>
                            <SelectItem value="Pending">Pending Review</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1">
                          <Badge className={
                            projectData.remarks === 'OK' ? 'bg-green-100 text-green-800' :
                            projectData.remarks === 'Update Required' ? 'bg-orange-100 text-orange-800' :
                            projectData.remarks === 'Pending' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {projectData.remarks === 'OK' ? 'Approved' : 
                             projectData.remarks === 'Update Required' ? 'Update Required' :
                             projectData.remarks === 'Pending' ? 'Pending Review' : 'Rejected'}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Priority</Label>
                      {isEditing ? (
                        <Select 
                          value={editedProject.priority || 'Low'} 
                          onValueChange={(value) => setEditedProject({...editedProject, priority: value})}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low Priority</SelectItem>
                            <SelectItem value="Medium">Medium Priority</SelectItem>
                            <SelectItem value="High">High Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1">
                          <Badge className={
                            (editedProject.priority || 'Low') === 'High' ? 'bg-red-500 text-white' :
                            (editedProject.priority || 'Low') === 'Medium' ? 'bg-purple-500 text-white' :
                            'bg-green-600 text-white'
                          }>
                            {editedProject.priority || 'Low'}
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Task-INC (Assigned Person)</Label>
                      {isEditing ? (
                        <Input
                          type="text"
                          value={editedProject.taskInc || 'Priyanka'}
                          onChange={(e) => setEditedProject({...editedProject, taskInc: e.target.value})}
                          className="mt-1"
                          placeholder="Assigned person name"
                        />
                      ) : (
                        <div className="mt-1 text-base text-gray-900">{editedProject.taskInc || 'Priyanka'}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Feedback & Updates Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Client Feedback & Updates</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Client Feedback Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Client Feedback</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600 mb-2 block">Client Remarks</Label>
                      {isEditing ? (
                        <Textarea
                          value={editedProject.remarks || ''}
                          onChange={(e) => setEditedProject({...editedProject, remarks: e.target.value})}
                          placeholder="Enter client feedback and remarks..."
                          className="min-h-[80px] resize-none text-sm"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 min-h-[80px]">
                          {editedProject.remarks || projectData.remarks || 'Elegant formal shoes for business professionals'}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600 mb-2 block">Client Approval Status</Label>
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <Select 
                            value={editedProject.clientFeedback} 
                            onValueChange={(value) => setEditedProject({...editedProject, clientFeedback: value})}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="OK">Approved</SelectItem>
                              <SelectItem value="Update Required">Update Required</SelectItem>
                              <SelectItem value="Pending">Pending Review</SelectItem>
                              <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant="secondary" className={
                            (editedProject.clientFeedback || projectData.remarks) === 'OK' ? 'bg-green-100 text-green-700' :
                            (editedProject.clientFeedback || projectData.remarks) === 'Update Required' ? 'bg-orange-100 text-orange-700' :
                            (editedProject.clientFeedback || projectData.remarks) === 'Pending' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }>
                            {(editedProject.clientFeedback || projectData.remarks) === 'OK' ? '✓ Approved' : 
                             (editedProject.clientFeedback || projectData.remarks) === 'Update Required' ? '⚠ Update Required' :
                             (editedProject.clientFeedback || projectData.remarks) === 'Pending' ? '⏳ Pending Review' : '⚠ Update Required'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Update Schedule Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Next Update Schedule</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600 mb-2 block">Next Update Date</Label>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editedProject.nextUpdateDate || ''}
                          onChange={(e) => setEditedProject({...editedProject, nextUpdateDate: e.target.value})}
                          className="w-full"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-900">
                            {editedProject.nextUpdateDate ? formatDate(editedProject.nextUpdateDate) : projectData.nextDate || '30/01/2024'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600 mb-2 block">Update Notes</Label>
                      {isEditing ? (
                        <Textarea
                          value={editedProject.updateNotes || ''}
                          onChange={(e) => setEditedProject({...editedProject, updateNotes: e.target.value})}
                          placeholder="Enter notes for next update meeting..."
                          className="min-h-[60px] resize-none text-sm"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 min-h-[60px]">
                          {editedProject.updateNotes || 'Client requested changes to heel design - revisions needed'}
                        </div>
                      )}
                    </div>

                    {/* Days Until Next Update */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-700">Days Until Next Update</span>
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        {(() => {
                          const nextDate = editedProject.nextUpdateDate || projectData.nextDate || '2024-01-30';
                          const today = new Date();
                          const updateDate = new Date(nextDate);
                          const diffTime = updateDate.getTime() - today.getTime();
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          return diffDays > 0 ? `${diffDays} days` : 'Overdue';
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions for Client Feedback */}
              {isEditing && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Quick Update Actions</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const nextWeek = new Date();
                        nextWeek.setDate(nextWeek.getDate() + 7);
                        setEditedProject({
                          ...editedProject, 
                          nextUpdateDate: nextWeek.toISOString().split('T')[0],
                          updateNotes: 'Schedule follow-up meeting for next week'
                        });
                      }}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule Next Week
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditedProject({
                          ...editedProject, 
                          clientFeedback: 'Update Required',
                          updateNotes: 'Client requested modifications - awaiting detailed feedback'
                        });
                      }}
                    >
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Mark Update Required
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditedProject({
                          ...editedProject, 
                          clientFeedback: 'OK',
                          updateNotes: 'Client approved - ready to proceed to next stage'
                        });
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Mark Approved
                    </Button>
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tentative Cost Dialog */}
      <TentativeCostDialog
        open={tentativeCostOpen}
        onOpenChange={setTentativeCostOpen}
        project={project}
        onApproved={handleTentativeCostApproved}
      />
    </>
  );
}