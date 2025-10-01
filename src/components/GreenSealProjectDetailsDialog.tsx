import React, { useState, useEffect } from 'react';
import { Eye, Edit2, ArrowRight, Calendar, User, IndianRupee, Clock, CheckCircle, AlertTriangle, Workflow, Target, Building, Users, X, Save, RefreshCw, Calculator, MessageSquare, Award, Shield } from 'lucide-react';
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
import { POTargetDialog } from './POTargetDialog';

interface GreenSealProjectDetailsDialogProps {
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
  { id: 'idea-submitted', name: 'Idea Submitted', color: 'bg-blue-100 text-blue-800', progress: 10 },
  { id: 'costing-pending', name: 'Costing Pending', color: 'bg-yellow-100 text-yellow-800', progress: 20 },
  { id: 'costing-received', name: 'Costing Received', color: 'bg-orange-100 text-orange-800', progress: 35 },
  { id: 'prototype', name: 'Prototype', color: 'bg-purple-100 text-purple-800', progress: 50 },
  { id: 'red-seal', name: 'Red Seal', color: 'bg-red-100 text-red-800', progress: 65 },
  { id: 'green-seal', name: 'Green Seal', color: 'bg-green-100 text-green-800', progress: 80 },
  { id: 'final-approved', name: 'Final Approved', color: 'bg-emerald-100 text-emerald-800', progress: 95 },
  { id: 'po-issued', name: 'PO Issued', color: 'bg-teal-100 text-teal-800', progress: 100 }
];

export function GreenSealProjectDetailsDialog({ open, onOpenChange, project, brands, categories, types, colors, countries }: GreenSealProjectDetailsDialogProps) {
  const { updateRDProject } = useERPStore();

  // Green Seal Development table data - matching the GreenSeal component data
  const greenSealDevelopmentData = [
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
      status: 'Green Seal',
      nextDate: '08/09/2025',
      remarks: 'Update Req',
      priority: 'High',
      taskInc: 'Priyanka',
      finalCost: 1250,
      targetCost: 1200
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
      status: 'Green Seal',
      nextDate: '12/09/2025',
      remarks: 'OK',
      priority: 'Low',
      taskInc: 'Priyanka',
      finalCost: 890,
      targetCost: 850
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
      status: 'Green Seal',
      nextDate: '15/09/2025',
      remarks: 'Pending',
      priority: 'Low',
      taskInc: 'Priyanka',
      finalCost: 1100,
      targetCost: 1050
    },
    { 
      productCode: 'RND/24-25/01/105', 
      brand: 'FlexiWalk', 
      brandCode: 'FLW01',
      category: 'Sports',
      type: 'Running', 
      gender: 'Unisex',
      artColour: 'Mesh Breathable',
      color: 'Black & Neon',
      country: 'Vietnam',
      startDate: '15/02/2024',
      targetDate: '30/05/2024',
      status: 'Green Seal',
      nextDate: '10/09/2025',
      remarks: 'Update Req',
      priority: 'High',
      taskInc: 'Rajesh',
      finalCost: 1450,
      targetCost: 1400
    },
    { 
      productCode: 'RND/24-25/01/108', 
      brand: 'UrbanStep', 
      brandCode: 'UST04',
      category: 'Casual',
      type: 'Sneakers', 
      gender: 'Women',
      artColour: 'Metallic Finish',
      color: 'Rose Gold',
      country: 'Bangladesh',
      startDate: '22/02/2024',
      targetDate: '15/06/2024',
      status: 'Green Seal',
      nextDate: '18/09/2025',
      remarks: 'Pending',
      priority: 'Medium',
      taskInc: 'Sneha',
      finalCost: 1320,
      targetCost: 1280
    },
    { 
      productCode: 'RND/24-25/01/111', 
      brand: 'TechGrip', 
      brandCode: 'TGR05',
      category: 'Formal',
      type: 'Oxford', 
      gender: 'Men',
      artColour: 'Classic Patent',
      color: 'Mahogany Brown',
      country: 'India',
      startDate: '01/03/2024',
      targetDate: '20/06/2024',
      status: 'Green Seal',
      nextDate: '22/09/2025',
      remarks: 'Review Req',
      priority: 'Low',
      taskInc: 'Amit',
      finalCost: 1180,
      targetCost: 1150
    }
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<RDProject | null>(null);
  const [poTargetDialogOpen, setPOTargetDialogOpen] = useState(false);

  useEffect(() => {
    if (project) {
      setEditedProject({ ...project });
    }
  }, [project]);

  if (!project || !editedProject) return null;

  // Get project data based on project code
  const getProjectData = () => {
    const projectData = greenSealDevelopmentData.find(p => p.productCode === project.autoCode);
    return projectData || greenSealDevelopmentData[0]; // fallback to first item
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
    return workflowStages.find(stage => stage.id === 'green-seal') || workflowStages[5];
  };

  const getNextStage = () => {
    const currentIndex = workflowStages.findIndex(stage => stage.id === 'green-seal');
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
      toast.success('Green Seal project updated successfully!');
      setIsEditing(false);
    }
  };

  const handlePOConfirm = () => {
    // This will be called after successful PO target confirmation
    toast.success('Project advanced to PO Issued stage!');
    setPOTargetDialogOpen(false);
    // Optionally close the main dialog or refresh
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
      'Red': 'bg-red-600',
      'Rose Gold': 'bg-pink-400',
      'Mahogany Brown': 'bg-yellow-800',
      'Black & Neon': 'bg-gradient-to-r from-gray-900 to-green-400'
    };
    return colorMap[colorName] || colorMap[projectData.color] || 'bg-gray-400';
  };

  // Calculate cost variance
  const getCostVariance = () => {
    const variance = projectData.finalCost - projectData.targetCost;
    return {
      amount: Math.abs(variance),
      isOverBudget: variance > 0,
      percentage: ((variance / projectData.targetCost) * 100).toFixed(1)
    };
  };

  const costVariance = getCostVariance();

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!max-w-[85vw] !w-[85vw] max-h-[90vh] overflow-hidden p-0 m-0 top-[5vh] translate-y-0 flex flex-col">
          {/* Sticky Header Section */}
          <div className="sticky top-0 z-50 px-8 py-6 bg-gradient-to-r from-green-50 via-white to-green-50 border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-3xl font-semibold text-gray-900 mb-2">
                    Green Seal Approval Details
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    View and manage Green Seal approval project details and information
                  </DialogDescription>
                  <div className="flex items-center gap-4">
                    <span className="text-lg text-gray-600">{projectData.productCode}</span>
                    <Badge className={`${currentStage.color} text-sm px-3 py-1`}>
                      {currentStage.name}
                    </Badge>
                    <Badge className={`${projectData.priority === 'High' ? 'bg-red-500 text-white' : projectData.priority === 'Medium' ? 'bg-purple-500 text-white' : 'bg-green-600 text-white'} text-xs px-2 py-1`}>
                      {projectData.priority}
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
                  <Button 
                    onClick={() => setPOTargetDialogOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Advance to PO Target
                  </Button>
                )}
                <Button 
                  onClick={() => onOpenChange(false)}
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-gray-100 rounded-full cursor-pointer flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </Button>
              </div>
            </div>
          </div>

          {/* Scrollable Main Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="px-8 py-8 space-y-10">
              
              {/* Approval Progress */}
              <div className="space-y-5">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <Workflow className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Green Seal Approval Progress</h3>
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
                      const isCompleted = workflowStages.findIndex(s => s.id === 'green-seal') >= index;
                      const isCurrent = stage.id === 'green-seal';
                      
                      return (
                        <div 
                          key={stage.id}
                          className={`text-center p-2 rounded-lg transition-all ${
                            isCurrent 
                              ? 'bg-green-100 border-2 border-green-400 shadow-md' 
                              : isCompleted 
                                ? 'bg-green-50 border border-green-200' 
                                : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className={`w-6 h-6 mx-auto mb-1 rounded-full flex items-center justify-center text-xs ${
                            isCurrent 
                              ? 'bg-green-500 text-white' 
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

              {/* Green Seal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Green Seal Information</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Product & Brand Details */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Product & Brand Details</h4>
                    
                    {/* Product Preview */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-600 mb-3 block">Product Preview</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                          <img 
                            src={projectData.category === 'Sports' ? 
                              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzaG9lJTIwcHJvZHVjdHxlbnwxfHx8fDE3NTY3MzU5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080" :
                              projectData.category === 'Casual' ?
                              "https://images.unsplash.com/photo-1549298916-b41d501d3772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzaG9lJTIwcHJvZHVjdHxlbnwxfHx8fDE3NTY3MzU5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080" :
                              "https://images.unsplash.com/photo-1533158628620-7e35717d36e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzaG9lJTIwcHJvZHVjdHxlbnwxfHx8fDE3NTY3MzU5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            }
                            alt={projectData.artColour}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-medium text-gray-900">{projectData.artColour}</div>
                          <div className="text-sm text-gray-500 mt-1">Green Seal Sample</div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className={`w-3 h-3 rounded-full ${getColorDisplay()}`}></div>
                            <span className="text-xs text-gray-400">{projectData.color} Variant</span>
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
                        <div className="mt-1">
                          <div className="text-base font-medium text-gray-900">{projectData.brand}</div>
                          <div className="text-sm text-gray-500">{projectData.brandCode}</div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">Category, Type & Gender</Label>
                        <div className="mt-1">
                          <div className="text-base font-medium text-gray-900">{projectData.category}</div>
                          <div className="text-sm text-gray-500">{projectData.type}</div>
                          <div className="text-xs text-gray-400">{projectData.gender}</div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">Art & Colour</Label>
                        <div className="mt-1">
                          <div className="text-base font-medium text-gray-900">{projectData.artColour}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-4 h-4 rounded-full ${getColorDisplay()}`}></div>
                            <span className="text-sm text-gray-500">{projectData.color}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">Country</Label>
                        <div className="mt-1 text-base text-gray-900">{projectData.country}</div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline & Status */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Timeline & Status</h4>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Start Date</Label>
                        <div className="mt-1 text-base text-gray-900">{projectData.startDate}</div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">Target Date</Label>
                        <div className="mt-1 text-base text-gray-900">{projectData.targetDate}</div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">Current Status</Label>
                        <div className="mt-1">
                          <Badge className="bg-green-100 text-green-800">
                            Green Seal
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">Client Feedback Status</Label>
                        <div className="mt-1">
                          <Badge className={
                            projectData.remarks === 'OK' ? 'bg-green-100 text-green-800' :
                            projectData.remarks === 'Update Req' ? 'bg-orange-100 text-orange-800' :
                            projectData.remarks === 'Pending' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {projectData.remarks === 'OK' ? '✓ Approved' : 
                             projectData.remarks === 'Update Req' ? '⚠ Update Required' :
                             projectData.remarks === 'Pending' ? '⏳ Pending Review' : 
                             projectData.remarks === 'Review Req' ? '📝 Review Required' : projectData.remarks}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">Priority</Label>
                        <div className="mt-1">
                          <Badge className={`${projectData.priority === 'High' ? 'bg-red-500 text-white' : projectData.priority === 'Medium' ? 'bg-purple-500 text-white' : 'bg-green-600 text-white'}`}>
                            {projectData.priority}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">Task-INC (Assigned Person)</Label>
                        <div className="mt-1 text-base text-gray-900">{projectData.taskInc}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Materials & Components Analysis */}
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-md">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Materials & Components Analysis</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Components Analysis */}
                  <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-purple-900 mb-4">Components Used</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-600 bg-purple-50 p-2 rounded">
                        <div>COMPONENT</div>
                        <div>DESCRIPTION</div>
                        <div>CONSUMPTION</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Foam</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">7.5grm</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Velcro</div>
                          <div className="text-gray-600">75mm</div>
                          <div className="text-gray-600">1.25 pair</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Elastic Roop</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">-</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Thread</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">-</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Tafta Label</div>
                          <div className="text-gray-600">MRP</div>
                          <div className="text-gray-600">-</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Buckle</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">2pcs</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Heat Transfer</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">-</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Trim</div>
                          <div className="text-gray-600">sticker</div>
                          <div className="text-gray-600">10 pcs</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Welding</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">-</div>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg mt-3">
                        <div className="text-sm text-purple-800">
                          <strong>Total Components:</strong> 9 different components used in production
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Materials Analysis */}
                  <div className="bg-white border-2 border-teal-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-teal-900 mb-4">Materials Used</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-600 bg-teal-50 p-2 rounded">
                        <div>MATERIAL</div>
                        <div>DESCRIPTION</div>
                        <div>CONSUMPTION</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Upper</div>
                          <div className="text-gray-600">Rexine</div>
                          <div className="text-gray-600">26 pairs/mtr</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Lining</div>
                          <div className="text-gray-600">Skinfit</div>
                          <div className="text-gray-600">25 pair @ 155/-</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Lining</div>
                          <div className="text-gray-600">EVA</div>
                          <div className="text-gray-600">33/70 - 1.5mm 35pair</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Footbed</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">-</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Mid Sole 1</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">-</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Mid Sole 2</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">-</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Out Sole</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">-</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">PU Adhesive</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">-</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm py-2 border-b border-gray-200">
                          <div className="font-medium">Print</div>
                          <div className="text-gray-600">-</div>
                          <div className="text-gray-600">-</div>
                        </div>
                      </div>

                      <div className="bg-teal-50 p-3 rounded-lg mt-3">
                        <div className="text-sm text-teal-800">
                          <strong>Total Materials:</strong> 9 different materials used in production
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Analysis Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-teal-50 border-2 border-purple-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Production Analysis Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                      <div className="text-sm text-purple-600 font-medium">Total Components</div>
                      <div className="text-2xl font-bold text-purple-800">9</div>
                      <div className="text-xs text-gray-500 mt-1">Active components</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-teal-200">
                      <div className="text-sm text-teal-600 font-medium">Total Materials</div>
                      <div className="text-2xl font-bold text-teal-800">9</div>
                      <div className="text-xs text-gray-500 mt-1">Raw materials</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-600 font-medium">Production Complexity</div>
                      <div className="text-2xl font-bold text-gray-800">Medium</div>
                      <div className="text-xs text-gray-500 mt-1">18 total items</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="text-sm text-gray-700">
                      <strong>Green Seal Analysis:</strong> Product uses standard footwear materials and components. 
                      Upper materials include Rexine and Skinfit lining with EVA padding. Components feature standard 
                      hardware like velcro, buckles, and heat transfer elements. Material consumption rates are optimized 
                      for efficient production.
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Overview Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                    <IndianRupee className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Cost Overview</h3>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Target Cost */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-700">Target Cost</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xl font-bold text-blue-600">
                        <IndianRupee className="w-4 h-4" />
                        <span>{projectData.targetCost.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Final Cost */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700">Final Cost</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xl font-bold text-green-600">
                        <IndianRupee className="w-4 h-4" />
                        <span>{projectData.finalCost.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Cost Variance */}
                    <div className={`${costVariance.isOverBudget ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border rounded-lg p-4`}>
                      <div className="flex items-center gap-2 mb-2">
                        {costVariance.isOverBudget ? (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        <span className={`text-sm ${costVariance.isOverBudget ? 'text-red-700' : 'text-green-700'}`}>
                          Variance
                        </span>
                      </div>
                      <div className={`flex items-center space-x-1 text-xl font-bold ${costVariance.isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                        <span>{costVariance.isOverBudget ? '+' : '-'}</span>
                        <IndianRupee className="w-4 h-4" />
                        <span>{costVariance.amount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className={`text-xs mt-1 ${costVariance.isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                        {costVariance.isOverBudget ? '+' : ''}{costVariance.percentage}% vs target
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
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Client Feedback</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600 mb-2 block">Client Remarks</Label>
                        {isEditing ? (
                          <Textarea
                            value={editedProject.remarks || ''}
                            onChange={(e) => setEditedProject({...editedProject, remarks: e.target.value})}
                            placeholder="Enter client feedback and remarks..."
                            className="min-h-[100px] resize-none text-sm"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 min-h-[100px] border border-gray-200">
                            {editedProject.remarks || (
                              projectData.remarks === 'OK' ? 
                              'Green Seal sample approved by client. Quality meets standards and specifications. Ready to proceed to Final Approved stage.' :
                              projectData.remarks === 'Update Req' ?
                              'Green Seal sample requires minor updates. Client feedback indicates adjustment needed in finishing quality and material consistency.' :
                              projectData.remarks === 'Pending' ?
                              'Green Seal sample submitted for client review. Awaiting feedback on final design and quality standards.' :
                              'Green Seal sample under review. Client has requested detailed analysis of material specifications and durability testing results.'
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600 mb-2 block">Client Approval Status</Label>
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <Select 
                              value={editedProject.clientFeedback || projectData.remarks} 
                              onValueChange={(value) => setEditedProject({...editedProject, clientFeedback: value as 'OK' | 'Update Req' | 'Pending'})}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="OK">Approved</SelectItem>
                                <SelectItem value="Update Req">Update Required</SelectItem>
                                <SelectItem value="Pending">Pending Review</SelectItem>
                                <SelectItem value="Review Req">Review Required</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge variant="secondary" className={
                              projectData.remarks === 'OK' ? 'bg-green-100 text-green-700' :
                              projectData.remarks === 'Update Req' ? 'bg-orange-100 text-orange-700' :
                              projectData.remarks === 'Pending' ? 'bg-blue-100 text-blue-700' :
                              'bg-purple-100 text-purple-700'
                            }>
                              {projectData.remarks === 'OK' ? '✓ Approved' : 
                               projectData.remarks === 'Update Req' ? '⚠ Update Required' :
                               projectData.remarks === 'Pending' ? '⏳ Pending Review' : 
                               '📝 Review Required'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Update Schedule Card */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Next Update Schedule</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600 mb-2 block">Next Update Date</Label>
                        {isEditing ? (
                          <Input
                            type="date"
                            value={editedProject.nextUpdateDate || '2024-09-20'}
                            onChange={(e) => setEditedProject({...editedProject, nextUpdateDate: e.target.value})}
                            className="w-full"
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm border border-gray-200">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-900">
                              {editedProject.nextUpdateDate ? formatDate(editedProject.nextUpdateDate) : projectData.nextDate}
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
                            className="min-h-[80px] resize-none text-sm"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 min-h-[80px] border border-gray-200">
                            {editedProject.updateNotes || (
                              projectData.remarks === 'OK' ?
                              'Schedule final approval meeting. Prepare documentation for Final Approved stage transition.' :
                              'Schedule follow-up meeting with client to review updated Green Seal sample. Address feedback and finalize specifications.'
                            )}
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
                            const nextDate = editedProject.nextUpdateDate || projectData.nextDate;
                            const today = new Date();
                            const updateDate = new Date(nextDate.split('/').reverse().join('-'));
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
                            updateNotes: 'Schedule follow-up meeting for next week to review updated Green Seal sample'
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
                          const twoWeeks = new Date();
                          twoWeeks.setDate(twoWeeks.getDate() + 14);
                          setEditedProject({
                            ...editedProject, 
                            nextUpdateDate: twoWeeks.toISOString().split('T')[0],
                            updateNotes: 'Allow 2 weeks for Green Seal modifications and client review'
                          });
                        }}
                      >
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule 2 Weeks
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditedProject({
                            ...editedProject, 
                            clientFeedback: 'Update Req',
                            updateNotes: 'Client requested modifications - awaiting revised Green Seal sample'
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
                            updateNotes: 'Green Seal approved by client - ready to proceed to Final Approved stage'
                          });
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Approved
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditedProject({
                            ...editedProject, 
                            status: 'Final Approved',
                            updateNotes: 'Moving to Final Approved stage after Green Seal approval'
                          });
                        }}
                      >
                        <ArrowRight className="w-4 h-4 mr-1" />
                        Move to Final Approved
                      </Button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PO Target Dialog */}
      <POTargetDialog
        open={poTargetDialogOpen}
        onOpenChange={setPOTargetDialogOpen}
        project={project}
        onConfirm={handlePOConfirm}
      />
    </>
  );
}