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
import { FinalCostDialog } from './FinalCostDialog';

interface RedSealProjectDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: RDProject | null;
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

export function RedSealProjectDetailsDialog({
  open,
  onOpenChange,
  project
}: RedSealProjectDetailsDialogProps) {
  const { 
    brands, 
    categories, 
    types, 
    colors, 
    countries,
    updateRDProject 
  } = useERPStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Partial<RDProject>>({});
  const [finalCostOpen, setFinalCostOpen] = useState(false);

  useEffect(() => {
    if (project) {
      setEditedProject(project);
    }
  }, [project]);

  if (!project) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getCurrentStage = () => {
    return workflowStages.find(stage => stage.id === project.status.toLowerCase().replace(' ', '-')) || workflowStages[4]; // Default to Red Seal
  };

  const currentStage = getCurrentStage();

  const getBrandName = (brandId: string) => {
    return brands?.find(b => b.id === brandId)?.brandName || 'Toucan';
  };

  const getBrandCode = (brandId: string) => {
    return brands?.find(b => b.id === brandId)?.brandCode || 'TC04';
  };

  const getCategoryName = (categoryId: string) => {
    return categories?.find(c => c.id === categoryId)?.categoryName || 'Boots';
  };

  const getTypeName = (typeId: string) => {
    return types?.find(t => t.id === typeId)?.typeName || 'Leather';
  };

  const getColorName = (colorId: string) => {
    return colors?.find(c => c.id === colorId)?.colorName || 'Black';
  };

  const getColorDisplay = () => {
    return 'bg-gray-900';
  };

  const getCountryName = (countryId: string) => {
    return countries?.find(c => c.id === countryId)?.countryName || 'Vietnam';
  };

  const handleSave = () => {
    if (editedProject.id) {
      updateRDProject(editedProject.id, editedProject);
      toast.success('Red Seal project updated successfully');
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedProject(project);
    setIsEditing(false);
  };

  const handleFinalCostApproved = () => {
    setFinalCostOpen(false);
    onOpenChange(false); // Close the main dialog
    toast.success('Project successfully advanced to Green Seal stage!');
  };

  const projectData = {
    productCode: project.autoCode,
    artColour: 'Boots - Black',
    targetDate: formatDate(project.endDate),
    nextDate: formatDate(project.nextUpdateDate),
    remarks: project.remarks,
    gender: 'Men'
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[85vw] !w-[85vw] max-h-[90vh] overflow-hidden p-0 m-0 top-[5vh] translate-y-0 flex flex-col">
        {/* Sticky Header Section - Exact same as ProjectDetailsDialog */}
        <div className="sticky top-0 z-50 px-8 py-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-semibold text-gray-900 mb-2">
                  Red Seal Approval Details
                </DialogTitle>
                <DialogDescription className="sr-only">
                  View and manage Red Seal Approval project details and information
                </DialogDescription>
                <div className="flex items-center gap-4">
                  <span className="text-lg text-gray-600">{project.autoCode}</span>
                  <Badge className="bg-red-100 text-red-800 text-sm px-3 py-1">
                    🔴 Red Seal Approval
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <>
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Project
                  </Button>
                  <Button 
                    onClick={() => setFinalCostOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Advance to Green Seal
                  </Button>
                </>
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
                    onClick={handleCancel}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
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

        {/* Scrollable Main Content - Exact same structure as ProjectDetailsDialog */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-8 py-8 space-y-10">
            
            {/* Approval Progress - matching ProjectDetailsDialog structure */}
            <div className="space-y-5">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                  <Workflow className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Approval Progress</h3>
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
                    const isCompleted = workflowStages.findIndex(s => s.id === 'red-seal') >= index;
                    const isCurrent = stage.id === 'red-seal';
                    
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

            {/* Approval Information - Same structure as ProjectDetailsDialog */}
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Approval Information</h3>
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
                          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzaG9lJTIwcHJvZHVjdHxlbnwxfHx8fDE3NTY3MzU5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                          alt={projectData.artColour}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-medium text-gray-900">Chunky Mickey</div>
                        <div className="text-sm text-gray-500 mt-1">Development Sample</div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                          <span className="text-xs text-gray-400">Brown Variant</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Product Code</Label>
                      <div className="mt-1 text-base font-mono font-bold text-gray-900">RND0002</div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Brand & Profile</Label>
                      <div className="mt-1">
                        <div className="text-base font-medium text-gray-900">UA Sports</div>
                        <div className="text-sm text-gray-500">UAS01</div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Category, Type & Gender</Label>
                      <div className="mt-1">
                        <div className="text-base font-medium text-gray-900">Formal</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline & Status */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Timeline & Status</h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Start Date</Label>
                      <div className="mt-1 text-base text-gray-900">05/01/2024</div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Target Date</Label>
                      <div className="mt-1 text-base text-gray-900">20/04/2024</div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Current Status</Label>
                      <div className="mt-1">
                        <Badge className="bg-red-100 text-red-800">
                          Red Seal
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Client Feedback Status</Label>
                      <div className="mt-1">
                        <Badge className="bg-orange-100 text-orange-800">
                          Update Required
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Priority</Label>
                      <div className="mt-1">
                        <Badge className="bg-green-600 text-white">
                          Low
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Task-INC (Assigned Person)</Label>
                      <div className="mt-1 text-base text-gray-900">Priyanka</div>
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
                          {editedProject.remarks || 'Red Seal sample shows good quality but the sole thickness needs adjustment. Client requested modification in heel height by 2mm for better comfort. Material selection approved but color consistency needs improvement.'}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600 mb-2 block">Client Approval Status</Label>
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <Select 
                            value={editedProject.clientFeedback || 'Update Required'} 
                            onValueChange={(value) => setEditedProject({...editedProject, clientFeedback: value as 'OK' | 'Update Required' | 'Pending'})}
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
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            ⚠ Update Required
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
                          value={editedProject.nextUpdateDate || '2024-09-15'}
                          onChange={(e) => setEditedProject({...editedProject, nextUpdateDate: e.target.value})}
                          className="w-full"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm border border-gray-200">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-900">
                            {editedProject.nextUpdateDate ? formatDate(editedProject.nextUpdateDate) : '15/09/2024'}
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
                          {editedProject.updateNotes || 'Schedule follow-up meeting with client to review updated Red Seal sample. Prepare revised prototype with adjusted sole thickness and improved color consistency for approval.'}
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
                          const nextDate = editedProject.nextUpdateDate || '2024-09-15';
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
                          updateNotes: 'Schedule follow-up meeting for next week to review updated Red Seal sample'
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
                          updateNotes: 'Allow 2 weeks for Red Seal modifications and client review'
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
                          clientFeedback: 'Update Required',
                          updateNotes: 'Client requested modifications - awaiting revised Red Seal sample'
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
                          updateNotes: 'Red Seal approved by client - ready to proceed to Green Seal stage'
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
                          status: 'Green Seal',
                          updateNotes: 'Moving to Green Seal stage after Red Seal approval'
                        });
                      }}
                    >
                      <ArrowRight className="w-4 h-4 mr-1" />
                      Move to Green Seal
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Red Seal Development - Tentative Cost Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Cost Breakdown & Final Tentaive Cost</h3>
              </div>

              {/* Cost Analysis & Summary */}
              <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis & Final Calculations</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-600 font-medium">Target Cost</div>
                    <div className="text-xl font-bold text-blue-800">₹12,500</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-green-600 font-medium">Final Tentative Cost</div>
                    <div className="text-xl font-bold text-green-800">₹15,247</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-sm text-orange-600 font-medium">Cost Variance</div>
                    <div className="text-xl font-bold text-orange-800">+₹2,747</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-600 font-medium">Profit Margin</div>
                    <div className="text-xl font-bold text-purple-800">25.0%</div>
                  </div>
                </div>

                {/* Cost Breakdown Summary */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Cost Breakdown Summary</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Upper Cost:</span>
                      <span className="font-medium">₹6.20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Component Cost:</span>
                      <span className="font-medium">₹4.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material Cost:</span>
                      <span className="font-medium">₹109.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Packaging Cost:</span>
                      <span className="font-medium">₹22.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Labour + OH:</span>
                      <span className="font-medium">₹62.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Miscellaneous:</span>
                      <span className="font-medium">₹6.06</span>
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-semibold">
                    <span>Total Production Cost:</span>
                    <span>₹209.26</span>
                  </div>
                </div>
              </div>

              {/* Detailed Cost Breakdown Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upper Cost Details */}
                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-orange-900 mb-4">Upper Cost Breakdown</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-600 bg-orange-50 p-2 rounded">
                      <div>ITEM</div>
                      <div>DESCRIPTION</div>
                      <div>CONSUMPTION</div>
                      <div>COST</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-200">
                      <div className="font-medium">Upper</div>
                      <div className="text-gray-600">Rexine</div>
                      <div className="text-gray-600">26 pairs/mtr</div>
                      <div className="font-medium">₹0.00</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-200">
                      <div className="font-medium">Lining</div>
                      <div className="text-gray-600">Skinfit</div>
                      <div className="text-gray-600">25 pair @ 155/-</div>
                      <div className="font-medium">₹6.20</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-200">
                      <div className="font-medium">Lining</div>
                      <div className="text-gray-600">EVA</div>
                      <div className="text-gray-600">33/70 - 1.5mm 35pair</div>
                      <div className="font-medium">₹0.00</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg mt-3">
                      <div className="flex justify-between font-semibold text-orange-900">
                        <span>Total Upper Cost:</span>
                        <span>₹6.20</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Component Cost Details */}
                <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-purple-900 mb-4">Component Cost Breakdown</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-600 bg-purple-50 p-2 rounded">
                      <div>COMPONENT</div>
                      <div>DESCRIPTION</div>
                      <div>CONSUMPTION</div>
                      <div>COST</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-200">
                      <div className="font-medium">Thread</div>
                      <div className="text-gray-600">-</div>
                      <div className="text-gray-600">-</div>
                      <div className="font-medium">₹1.00</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-200">
                      <div className="font-medium">Tafta Label</div>
                      <div className="text-gray-600">MRP</div>
                      <div className="text-gray-600">-</div>
                      <div className="font-medium">₹1.00</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-200">
                      <div className="font-medium">Heat Transfer</div>
                      <div className="text-gray-600">-</div>
                      <div className="text-gray-600">-</div>
                      <div className="font-medium">₹1.00</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-200">
                      <div className="font-medium">Welding</div>
                      <div className="text-gray-600">-</div>
                      <div className="text-gray-600">-</div>
                      <div className="font-medium">₹1.00</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg mt-3">
                      <div className="flex justify-between font-semibold text-purple-900">
                        <span>Total Component Cost:</span>
                        <span>₹4.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Material Cost Details */}
                <div className="bg-white border-2 border-teal-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-teal-900 mb-4">Material Cost Breakdown</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-600 bg-teal-50 p-2 rounded">
                      <div>MATERIAL</div>
                      <div>DESCRIPTION</div>
                      <div>CONSUMPTION</div>
                      <div>COST</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-200">
                      <div className="font-medium">Out Sole</div>
                      <div className="text-gray-600">-</div>
                      <div className="text-gray-600">-</div>
                      <div className="font-medium">₹98.00</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-200">
                      <div className="font-medium">PU Adhesive</div>
                      <div className="text-gray-600">-</div>
                      <div className="text-gray-600">-</div>
                      <div className="font-medium">₹7.00</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-gray-200">
                      <div className="font-medium">Print</div>
                      <div className="text-gray-600">-</div>
                      <div className="text-gray-600">-</div>
                      <div className="font-medium">₹4.00</div>
                    </div>
                    <div className="bg-teal-50 p-3 rounded-lg mt-3">
                      <div className="flex justify-between font-semibold text-teal-900">
                        <span>Total Material Cost:</span>
                        <span>₹109.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Packaging & Labour Cost Details */}
                <div className="bg-white border-2 border-indigo-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-indigo-900 mb-4">Packaging & Labour Costs</h4>
                  <div className="space-y-4">
                    {/* Packaging Cost */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Packaging Cost</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Inner Packaging:</span>
                          <span className="font-medium">₹22.00</span>
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-2 rounded mt-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Packaging Subtotal:</span>
                          <span>₹22.00</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Labour Cost */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Labour + OH Cost</h5>
                      <div className="bg-indigo-50 p-2 rounded">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Total Labour Cost:</span>
                          <span>₹62.00</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Miscellaneous Cost */}
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Miscellaneous Cost</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Seconds (4.064%):</span>
                          <span className="font-medium">₹4.06</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Freight:</span>
                          <span className="font-medium">₹2.00</span>
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-2 rounded mt-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Miscellaneous Subtotal:</span>
                          <span>₹6.06</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Calculation Summary */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Final Tentative Cost Calculation
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900">Cost Calculation</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Production Cost:</span>
                        <span className="font-medium">₹209.26</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profit (25.0%):</span>
                        <span className="font-medium">₹52.31</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional Costs:</span>
                        <span className="font-medium">₹0.00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg text-green-700">
                        <span>Final Tentative Cost:</span>
                        <span>₹261.57</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-semibold text-gray-900">Cost Analysis</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target Cost:</span>
                        <span className="font-medium">₹12,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tentative Cost:</span>
                        <span className="font-medium">₹261.57</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span className="font-medium">Cost Variance:</span>
                        <span className="font-bold">-₹12,238.43</span>
                      </div>
                      <div className="bg-green-100 border border-green-300 rounded p-2 mt-2">
                        <div className="text-xs text-green-800">
                          <strong>Status:</strong> Tentative cost is significantly lower than target cost. Excellent margin for Red Seal approval.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Notes */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Tentative Cost Approval Notes</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-700">
                      <strong>Cost Calculation Summary:</strong> Tentative cost calculated: ₹261.57. Total Cost: ₹209.26, Profit: ₹52.31 (25.0%). 
                      Cost breakdown includes upper materials (₹6.20), components (₹4.00), materials (₹109.00), packaging (₹22.00), 
                      labour costs (₹62.00), and miscellaneous expenses (₹6.06).
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-medium">Tentative cost approved and ready for Red Seal development stage</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Approved on: {new Date().toLocaleDateString('en-GB')}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </DialogContent>

      {/* Final Cost Dialog */}
      <FinalCostDialog
        open={finalCostOpen}
        onOpenChange={setFinalCostOpen}
        project={project}
        onApproved={handleFinalCostApproved}
      />
    </Dialog>
  );
}