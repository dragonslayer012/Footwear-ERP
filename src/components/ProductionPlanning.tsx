import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Search,
  Filter,
  Clock,
  Users,
  Package,
  CheckCircle,
  AlertTriangle,
  Edit,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Target,
  Factory,
  ArrowRight,
  IndianRupee,
  Eye,
  Building,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useERPStore } from '../lib/data-store';
import { CreateProductionCardDialog } from './CreateProductionCardDialog';

// Production Plan interface based on R&D project data
interface ProductionPlan {
  id: string;
  rdProjectId: string;
  projectCode: string;
  poNumber: string;
  planName: string;
  productName: string;
  brand: string;
  brandCode: string;
  category: string;
  type: string;
  gender: string;
  artColour: string;
  color: string;
  country: string;
  quantity: number;
  startDate: string;
  endDate: string;
  deliveryDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Planning' | 'Capacity Allocated' | 'Manufacturing Assigned' | 'Process Defined' | 'Ready for Production' | 'In Production';
  assignedPlant: string;
  assignedTeam: string;
  taskInc: string;
  
  // Cost Information from R&D
  targetCost: number;
  finalCost: number;
  poValue: number;
  estimatedCost: number;
  costVariance: {
    amount: number;
    isOverBudget: boolean;
    percentage: string;
  };
  
  // Materials from R&D (simplified for display)
  materials: Array<{ name: string; required: number; available: number }>;
  
  // Production progress
  progress: number;
  
  remarks: string;
  createdDate: string;
  updatedDate: string;
}

export function ProductionPlanning() {
  const { rdProjects, brands, categories, types, colors, countries } = useERPStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('list');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // September 2025

  // Production cards management state
  const [isProductionDialogOpen, setIsProductionDialogOpen] = useState(false);
  const [isCreateCardDialogOpen, setIsCreateCardDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ProductionPlan | null>(null);
  const [productionCards, setProductionCards] = useState<Array<{
    id: string;
    cardName: string;
    description: string;
    assignedTo: string;
    priority: 'High' | 'Medium' | 'Low';
    startDate: string;
    endDate: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    createdDate: string;
  }>>([]);

  // Production plans data based on R&D approved projects
  const [productionPlans] = useState<ProductionPlan[]>([
    {
      id: 'PP001',
      rdProjectId: 'rd-001',
      projectCode: 'RND/25-26/09/103',
      poNumber: 'PO-2024-001',
      planName: 'Milange Black Production',
      productName: 'Milange-Black',
      brand: 'UA Sports',
      brandCode: 'UAS01',
      category: 'Formal',
      type: 'Leather',
      gender: 'Men',
      artColour: 'Milange Black',
      color: 'Black',
      country: 'China',
      quantity: 1200,
      startDate: '2025-09-01',
      endDate: '2025-09-30',
      deliveryDate: '2025-10-15',
      priority: 'High',
      status: 'Planning',
      assignedPlant: 'Plant A - China',
      assignedTeam: 'Team Alpha',
      taskInc: 'Priyanka',
      targetCost: 1200,
      finalCost: 1250,
      poValue: 1875000,
      estimatedCost: 1875000,
      costVariance: {
        amount: 50,
        isOverBudget: true,
        percentage: '4.2'
      },
      materials: [
        { name: 'Upper (Rexine)', required: 60, available: 55 },
        { name: 'Lining (Skinfit)', required: 65, available: 70 },
        { name: 'Out Sole', required: 1500, available: 1520 },
        { name: 'Velcro & Buckles', required: 3000, available: 2800 }
      ],
      progress: 15,
      remarks: 'All Ok',
      createdDate: '2025-01-11',
      updatedDate: '2025-01-11'
    },
    {
      id: 'PP002',
      rdProjectId: 'rd-002',
      projectCode: 'RND/25-26/09/104',
      poNumber: 'PO-2024-002',
      planName: 'Cityfit Camo Production',
      productName: 'Cityfit-camo',
      brand: 'CityFit',
      brandCode: 'CIF02',
      category: 'Casual',
      type: 'CKD',
      gender: 'Men',
      artColour: 'Camo',
      color: 'Tan',
      country: 'India',
      quantity: 350,
      startDate: '2025-09-02',
      endDate: '2025-09-30',
      deliveryDate: '2025-10-10',
      priority: 'Medium',
      status: 'Capacity Allocated',
      assignedPlant: 'Plant B - India',
      assignedTeam: 'Team Beta',
      taskInc: 'Priyanka',
      targetCost: 850,
      finalCost: 890,
      poValue: 1780000,
      estimatedCost: 1780000,
      costVariance: {
        amount: 40,
        isOverBudget: true,
        percentage: '4.7'
      },
      materials: [
        { name: 'Upper (Synthetic)', required: 75, available: 80 },
        { name: 'Lining (Mesh)', required: 70, available: 65 },
        { name: 'Out Sole (Rubber)', required: 2000, available: 2100 },
        { name: 'Thread & Labels', required: 4000, available: 4500 }
      ],
      progress: 35,
      remarks: 'All ok',
      createdDate: '2025-01-08',
      updatedDate: '2025-01-11'
    },
    {
      id: 'PP003',
      rdProjectId: 'rd-003',
      projectCode: 'RND/25-26/09/105',
      poNumber: 'PO-2024-003',
      planName: 'KAPPA Black Production',
      productName: 'KAPPA-Black',
      brand: 'KAPPA',
      brandCode: 'KAP03',
      category: 'Sports',
      type: 'Running',
      gender: 'Men',
      artColour: 'KAPPA Black',
      color: 'Black',
      country: 'India',
      quantity: 1200,
      startDate: '2025-09-08',
      endDate: '2025-09-30',
      deliveryDate: '2025-10-05',
      priority: 'Medium',
      status: 'Manufacturing Assigned',
      assignedPlant: 'Plant C - India',
      assignedTeam: 'Team Gamma',
      taskInc: 'Priyanka',
      targetCost: 1050,
      finalCost: 1100,
      poValue: 1320000,
      estimatedCost: 1320000,
      costVariance: {
        amount: 50,
        isOverBudget: true,
        percentage: '4.8'
      },
      materials: [
        { name: 'Upper (Leather)', required: 55, available: 50 },
        { name: 'Lining (Fabric)', required: 60, available: 65 },
        { name: 'Zip & Hardware', required: 1200, available: 1100 },
        { name: 'Thread (Cotton)', required: 2400, available: 2600 }
      ],
      progress: 60,
      remarks: 'Size 11-upper issue',
      createdDate: '2025-01-05',
      updatedDate: '2025-01-10'
    },
    {
      id: 'PP004',
      rdProjectId: 'rd-004',
      projectCode: 'RND/25-26/09/106',
      poNumber: 'PO-2024-004',
      planName: 'Floral Baby P Production',
      productName: 'Floral-Baby-P',
      brand: 'FlexiWalk',
      brandCode: 'FLW01',
      category: 'Kids',
      type: 'Casual',
      gender: 'Kids',
      artColour: 'Floral Baby',
      color: 'Pink',
      country: 'Vietnam',
      quantity: 1200,
      startDate: '2025-09-05',
      endDate: '2025-09-30',
      deliveryDate: '2025-10-20',
      priority: 'High',
      status: 'Process Defined',
      assignedPlant: 'Plant D - Vietnam',
      assignedTeam: 'Team Delta',
      taskInc: 'Rajesh',
      targetCost: 1400,
      finalCost: 1450,
      poValue: 4350000,
      estimatedCost: 4350000,
      costVariance: {
        amount: 50,
        isOverBudget: true,
        percentage: '3.6'
      },
      materials: [
        { name: 'Upper (Mesh)', required: 105, available: 110 },
        { name: 'Out Sole (EVA)', required: 3000, available: 3200 },
        { name: 'Laces & Eyelets', required: 6000, available: 6500 },
        { name: 'Thread (Nylon)', required: 9000, available: 8800 }
      ],
      progress: 80,
      remarks: 'All ok',
      createdDate: '2025-01-03',
      updatedDate: '2025-01-11'
    },
    // Additional products to match the calendar image
    {
      id: 'PP005',
      rdProjectId: 'rd-005',
      projectCode: 'RND/25-26/09/107',
      poNumber: 'PO-2024-005',
      planName: 'Drift Grey Production',
      productName: 'Drift-Grey',
      brand: 'UrbanStep',
      brandCode: 'UST04',
      category: 'Casual',
      type: 'Sneakers',
      gender: 'Unisex',
      artColour: 'Drift Grey',
      color: 'Grey',
      country: 'Bangladesh',
      quantity: 936,
      startDate: '2025-09-07',
      endDate: '2025-09-30',
      deliveryDate: '2025-10-25',
      priority: 'Low',
      status: 'Ready for Production',
      assignedPlant: 'Plant E - Bangladesh',
      assignedTeam: 'Team Echo',
      taskInc: 'Sneha',
      targetCost: 1280,
      finalCost: 1320,
      poValue: 2376000,
      estimatedCost: 2376000,
      costVariance: {
        amount: 40,
        isOverBudget: true,
        percentage: '3.1'
      },
      materials: [
        { name: 'Upper (Synthetic Leather)', required: 80, available: 85 },
        { name: 'Sole (Rubber)', required: 1800, available: 1900 },
        { name: 'Metallic Paint', required: 270, available: 300 },
        { name: 'Thread (Polyester)', required: 3600, available: 3800 }
      ],
      progress: 95,
      remarks: 'Sole-180 Balance Sole -74',
      createdDate: '2025-01-01',
      updatedDate: '2025-01-11'
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      'Planning': 'bg-blue-100 text-blue-800',
      'Capacity Allocated': 'bg-yellow-100 text-yellow-800',
      'Manufacturing Assigned': 'bg-purple-100 text-purple-800',
      'Process Defined': 'bg-orange-100 text-orange-800',
      'Ready for Production': 'bg-green-100 text-green-800',
      'In Production': 'bg-teal-100 text-teal-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'High': 'bg-red-500 text-white',
      'Medium': 'bg-purple-500 text-white',
      'Low': 'bg-green-600 text-white'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const filteredPlans = productionPlans.filter(plan => {
    const matchesSearch = plan.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || plan.status.toLowerCase().replace(' ', '-') === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getResourceAvailability = (materials: Array<{ name: string; required: number; available: number }>) => {
    const total = materials.reduce((sum, mat) => sum + mat.required, 0);
    const available = materials.reduce((sum, mat) => sum + Math.min(mat.available, mat.required), 0);
    return (available / total) * 100;
  };

  // Status-based filtering counts
  const statusCounts = {
    planning: productionPlans.filter(p => p.status === 'Planning').length,
    capacityAllocated: productionPlans.filter(p => p.status === 'Capacity Allocated').length,
    manufacturingAssigned: productionPlans.filter(p => p.status === 'Manufacturing Assigned').length,
    processDefinied: productionPlans.filter(p => p.status === 'Process Defined').length,
    readyForProduction: productionPlans.filter(p => p.status === 'Ready for Production').length,
    inProgress: productionPlans.filter(p => p.status === 'In Production').length
  };

  // Calendar helper functions
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Start week on Monday
    return new Date(d.setDate(diff));
  };

  const getWeekDays = (weekStart: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getWeeksInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstWeekStart = getWeekStart(firstDay);
    const weeks = [];
    
    let currentWeek = new Date(firstWeekStart);
    while (currentWeek <= lastDay) {
      weeks.push(new Date(currentWeek));
      currentWeek.setDate(currentWeek.getDate() + 7);
    }
    
    return weeks;
  };

  const getProductionsForDate = (date: Date) => {
    return filteredPlans.filter(plan => {
      const startDate = new Date(plan.startDate);
      const endDate = new Date(plan.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const getWeekTotal = (weekStart: Date) => {
    const weekDays = getWeekDays(weekStart);
    const weekProductions = weekDays.flatMap(day => getProductionsForDate(day));
    return weekProductions.reduce((total, plan) => total + plan.quantity, 0);
  };

  const getOrdinalSuffix = (num: number) => {
    if (num > 3 && num < 21) return 'th';
    switch (num % 10) {
      case 1: return 'st';
      case 2: return 'nd'; 
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // Production card management functions
  const handleStartProduction = (plan: ProductionPlan) => {
    setSelectedPlan(plan);
    setIsCreateCardDialogOpen(true);
  };
  
  // Convert production plan to RD Project format for the dialog
  const convertPlanToRDProject = (plan: ProductionPlan | null) => {
    if (!plan) return null;
    
    // Find matching brand, category, type, color, country by name
    const brand = brands.find(b => b.brandName === plan.brand);
    const category = categories.find(c => c.categoryName === plan.category);
    const type = types.find(t => t.typeName === plan.type);
    const color = colors.find(c => c.colorName === plan.color);
    const country = countries.find(c => c.countryName === plan.country);
    
    return {
      id: plan.rdProjectId,
      autoCode: plan.projectCode,
      brandId: brand?.id || '1',
      categoryId: category?.id || '1',
      typeId: type?.id || '1',
      colorId: color?.id || '1',
      countryId: country?.id || '1',
      designerId: '3',
      status: 'Final Approved' as const,
      tentativeCost: plan.targetCost,
      targetCost: plan.targetCost,
      finalCost: plan.finalCost,
      difference: plan.finalCost - plan.targetCost,
      startDate: plan.startDate,
      endDate: plan.endDate,
      duration: Math.ceil((new Date(plan.endDate).getTime() - new Date(plan.startDate).getTime()) / (1000 * 60 * 60 * 24)),
      poTarget: plan.deliveryDate,
      poReceived: plan.deliveryDate,
      poNumber: plan.poNumber,
      poStatus: 'Approved' as const,
      poDelay: 0,
      nextUpdateDate: plan.updatedDate,
      remarks: plan.remarks,
      clientFeedback: 'OK' as const,
      priority: plan.priority,
      taskInc: plan.taskInc,
      updateNotes: '',
      createdDate: plan.createdDate,
      updatedDate: plan.updatedDate
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Production Planning</h1>
            <p className="text-gray-600">Schedule and manage manufacturing operations from approved R&D projects</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>

            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Production Plan</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="planName">Plan Name</Label>
                    <Input id="planName" placeholder="Enter plan name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productCode">R&D Project Code</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select R&D project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RND/25-26/09/103">RND/25-26/09/103</SelectItem>
                        <SelectItem value="RND/25-26/09/104">RND/25-26/09/104</SelectItem>
                        <SelectItem value="RND/25-26/09/105">RND/25-26/09/105</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Production Quantity</Label>
                    <Input id="quantity" type="number" placeholder="Enter quantity" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Production Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Target Completion Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plantId">Assigned Manufacturing Plant</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plant-a-china">Plant A - China</SelectItem>
                      <SelectItem value="plant-b-india">Plant B - India</SelectItem>
                      <SelectItem value="plant-c-india">Plant C - India</SelectItem>
                      <SelectItem value="plant-d-vietnam">Plant D - Vietnam</SelectItem>
                      <SelectItem value="plant-e-bangladesh">Plant E - Bangladesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Production Requirements & Notes</Label>
                  <Textarea id="notes" placeholder="Enter any production requirements, material specifications, or additional notes" />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Create Production Plan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Total Plans</p>
                <p className="text-2xl font-bold text-blue-900">{productionPlans.length}</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">From R&D Projects</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Ready for Production</p>
                <p className="text-2xl font-bold text-green-900">
                  {statusCounts.readyForProduction + statusCounts.processDefinied}
                </p>
                <div className="flex items-center mt-2">
                  <Play className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Ready to Start</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Factory className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">In Planning</p>
                <p className="text-2xl font-bold text-orange-900">
                  {statusCounts.planning + statusCounts.capacityAllocated + statusCounts.manufacturingAssigned}
                </p>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">Being Planned</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Total PO Value</p>
                <p className="text-2xl font-bold text-purple-900">
                  {formatCurrency(productionPlans.reduce((sum, plan) => sum + plan.poValue, 0))}
                </p>
                <div className="flex items-center mt-2">
                  <IndianRupee className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">Total Order Value</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search production plans, PO numbers, products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[220px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="capacity-allocated">Capacity Allocated</SelectItem>
                  <SelectItem value="manufacturing-assigned">Manufacturing Assigned</SelectItem>
                  <SelectItem value="process-defined">Process Defined</SelectItem>
                  <SelectItem value="ready-for-production">Ready for Production</SelectItem>
                  <SelectItem value="in-production">In Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={selectedView === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedView('list')}
              >
                List View
              </Button>
              <Button
                variant={selectedView === 'calendar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedView('calendar')}
              >
                Calendar View
              </Button>
            </div>
          </div>

          {/* Production Plans List - Card Based */}
          {selectedView === 'list' ? (
            <div className="space-y-4">
              {filteredPlans.map((plan) => (
                <Card key={plan.id} className="border hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-5">
                      {/* Header Section */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#0c9dcb] to-[#26b4e0] rounded-xl flex items-center justify-center shadow-sm">
                          <Factory className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 leading-tight">{plan.planName}</h3>
                            <Badge className={`${getStatusColor(plan.status)} text-xs px-2 py-1`}>
                              {plan.status}
                            </Badge>
                            <Badge className={`${getPriorityColor(plan.priority)} text-xs px-2 py-1`}>
                              {plan.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="font-mono font-medium text-blue-600">{plan.projectCode}</span>
                            <span className="font-mono font-medium text-green-600">{plan.poNumber}</span>

                          </div>
                        </div>
                      </div>

                      {/* Product Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Product Information</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Product Name</p>
                            <p className="text-sm font-medium text-gray-900">{plan.productName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Brand</p>
                            <p className="text-sm font-medium text-gray-900">{plan.brand}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Category</p>
                            <p className="text-sm font-medium text-gray-900">{plan.category}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Type & Gender</p>
                            <p className="text-sm font-medium text-gray-900">{plan.type} • {plan.gender}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Art & Colour</p>
                            <p className="text-sm font-medium text-gray-900">{plan.artColour}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Color</p>
                            <p className="text-sm font-medium text-gray-900">{plan.color}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Country</p>
                            <p className="text-sm font-medium text-gray-900">{plan.country}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Order Quantity</p>
                            <p className="text-sm font-medium text-green-600">{plan.quantity.toLocaleString('en-IN')} units</p>
                          </div>
                        </div>
                      </div>



                      {/* Manufacturing Assignment */}
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-orange-800 mb-3">Manufacturing Assignment</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-orange-600 mb-1">Assigned Plant</p>
                            <p className="text-sm font-medium text-orange-900">{plan.assignedPlant}</p>
                          </div>
                          <div>
                            <p className="text-xs text-orange-600 mb-1">Production Team</p>
                            <p className="text-sm font-medium text-orange-900">{plan.assignedTeam}</p>
                          </div>
                          <div>
                            <p className="text-xs text-orange-600 mb-1">Task Coordinator</p>
                            <p className="text-sm font-medium text-orange-900">{plan.taskInc}</p>
                          </div>
                        </div>
                      </div>

                      {/* Material Availability */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Components Used */}
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <h4 className="text-sm font-semibold text-purple-800 mb-4">Components Used</h4>
                          <div className="space-y-1">
                            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-purple-700 border-b border-purple-200 pb-2">
                              <div className="col-span-4">COMPONENT</div>
                              <div className="col-span-4">DESCRIPTION</div>
                              <div className="col-span-4">CONSUMPTION</div>
                            </div>
                            
                            <div className="grid grid-cols-12 gap-2 text-xs py-1">
                              <div className="col-span-4 text-gray-800">Foam</div>
                              <div className="col-span-4 text-gray-600">-</div>
                              <div className="col-span-4 text-gray-800">7.5grm</div>
                            </div>
                            
                            <div className="grid grid-cols-12 gap-2 text-xs py-1">
                              <div className="col-span-4 text-gray-800">Velcro</div>
                              <div className="col-span-4 text-gray-600">75mm</div>
                              <div className="col-span-4 text-gray-800">1.25 pair</div>
                            </div>
                            
                            <div className="grid grid-cols-12 gap-2 text-xs py-1">
                              <div className="col-span-4 text-gray-800">Buckle</div>
                              <div className="col-span-4 text-gray-600">-</div>
                              <div className="col-span-4 text-gray-800">2pcs</div>
                            </div>
                            
                            <div className="grid grid-cols-12 gap-2 text-xs py-1">
                              <div className="col-span-4 text-gray-800">Trim</div>
                              <div className="col-span-4 text-gray-600">sticker</div>
                              <div className="col-span-4 text-gray-800">10 pcs</div>
                            </div>
                          </div>
                          <div className="mt-3 pt-2 border-t border-purple-200">
                            <p className="text-xs text-purple-700 font-medium">
                              Total Components: 4 different components used in production
                            </p>
                          </div>
                        </div>

                        {/* Materials Used */}
                        <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                          <h4 className="text-sm font-semibold text-cyan-800 mb-4">Materials Used</h4>
                          <div className="space-y-1">
                            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-cyan-700 border-b border-cyan-200 pb-2">
                              <div className="col-span-4">MATERIAL</div>
                              <div className="col-span-4">DESCRIPTION</div>
                              <div className="col-span-4">CONSUMPTION</div>
                            </div>
                            
                            <div className="grid grid-cols-12 gap-2 text-xs py-1">
                              <div className="col-span-4 text-gray-800">Upper</div>
                              <div className="col-span-4 text-gray-600">Rexine</div>
                              <div className="col-span-4 text-gray-800">26 pairs/mtr</div>
                            </div>
                            
                            <div className="grid grid-cols-12 gap-2 text-xs py-1">
                              <div className="col-span-4 text-gray-800">Lining</div>
                              <div className="col-span-4 text-gray-600">Skinfit</div>
                              <div className="col-span-4 text-gray-800">25 pair @ 15/-</div>
                            </div>
                            
                            <div className="grid grid-cols-12 gap-2 text-xs py-1">
                              <div className="col-span-4 text-gray-800">Lining</div>
                              <div className="col-span-4 text-gray-600">EVA</div>
                              <div className="col-span-4 text-gray-800">33/70 - 1.5mm 35pair</div>
                            </div>
                          </div>
                          <div className="mt-3 pt-2 border-t border-cyan-200">
                            <p className="text-xs text-cyan-700 font-medium">
                              Total Materials: 3 different materials used in production
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remarks */}
                      {plan.remarks && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">
                            <span className="font-medium">Remarks: </span>
                            {plan.remarks}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons - Moved to Bottom */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit Plan
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          {plan.status === 'Planning' && (
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleStartProduction(plan)}>
                              <Play className="w-4 h-4 mr-1" />
                              Start Production
                            </Button>
                          )}
                          {plan.status === 'Capacity Allocated' && (
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleStartProduction(plan)}>
                              <Play className="w-4 h-4 mr-1" />
                              Start Production
                            </Button>
                          )}
                          {plan.status === 'Manufacturing Assigned' && (
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleStartProduction(plan)}>
                              <Play className="w-4 h-4 mr-1" />
                              Start Production
                            </Button>
                          )}
                          {plan.status === 'Process Defined' && (
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleStartProduction(plan)}>
                              <Play className="w-4 h-4 mr-1" />
                              Start Production
                            </Button>
                          )}
                          {plan.status === 'Ready for Production' && (
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleStartProduction(plan)}>
                              <Play className="w-4 h-4 mr-1" />
                              Start Production
                            </Button>
                          )}
                          {plan.status === 'In Production' && (
                            <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                              <Pause className="w-4 h-4 mr-1" />
                              Pause Production
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredPlans.length === 0 && (
                <div className="text-center py-12">
                  <Factory className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No production plans found</h3>
                  <p className="text-gray-600 mb-4">No production plans match your current search and filter criteria.</p>
                  <Button onClick={() => { setSearchTerm(''); setSelectedFilter('all'); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                    className="hover:bg-white/80 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Production Schedule
                  </h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                    className="hover:bg-white/80 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  {/* Month Total */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/50 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-blue-900">
                        {(() => {
                          // Calculate month total by summing daily quantities (similar to week totals)
                          const year = currentDate.getFullYear();
                          const month = currentDate.getMonth();
                          const firstDay = new Date(year, month, 1);
                          const lastDay = new Date(year, month + 1, 0);
                          let monthTotal = 0;
                          
                          for (let day = 1; day <= lastDay.getDate(); day++) {
                            const currentDay = new Date(year, month, day);
                            const dayProductions = getProductionsForDate(currentDay);
                            monthTotal += dayProductions.reduce((total, plan) => total + plan.quantity, 0);
                          }
                          
                          return monthTotal.toLocaleString();
                        })()}
                      </div>
                      <div className="text-xs text-blue-800 font-medium">Month Total</div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                    className="hover:bg-white/80 transition-colors"
                  >
                    Today
                  </Button>
                </div>
              </div>

              {/* Weekly Production Schedule - Responsive Grid Layout */}
              <div className="space-y-6">
                {getWeeksInMonth(currentDate).map((weekStart, weekIndex) => {
                  const weekDays = getWeekDays(weekStart);
                  const weekTotal = getWeekTotal(weekStart);
                  
                  return (
                    <div key={weekIndex} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                      {/* Week Header */}
                      <div className="bg-gradient-to-r from-violet-50 to-violet-100 p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">{weekIndex + 1}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-violet-900">Week {weekIndex + 1}</h3>
                              <p className="text-sm text-violet-600">
                                {weekStart.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - {getWeekDays(weekStart)[6].toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-violet-800">{weekTotal.toLocaleString()}</div>
                            <div className="text-sm text-violet-600">Total Units</div>
                          </div>
                        </div>
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 divide-x divide-gray-200">
                        {weekDays.map((day, dayIndex) => {
                          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                          const dayProductions = getProductionsForDate(day);
                          const isToday = day.toDateString() === new Date().toDateString();
                          const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                          const dayAbbrevs = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                          
                          // Get theme colors based on day
                          let headerBg = 'bg-gray-50';
                          let headerText = 'text-gray-700';
                          let cellBg = 'bg-white';
                          
                          if (dayIndex === 0 || dayIndex === 2 || dayIndex === 4) { // Mon, Wed, Fri
                            headerBg = 'bg-emerald-50';
                            headerText = 'text-emerald-700';
                            cellBg = 'bg-emerald-25';
                          } else if (dayIndex === 1 || dayIndex === 3) { // Tue, Thu
                            headerBg = 'bg-sky-50';
                            headerText = 'text-sky-700';
                            cellBg = 'bg-sky-25';
                          } else if (dayIndex === 5) { // Sat
                            headerBg = 'bg-slate-50';
                            headerText = 'text-slate-700';
                            cellBg = 'bg-slate-25';
                          } else if (dayIndex === 6) { // Sun
                            headerBg = 'bg-orange-50';
                            headerText = 'text-orange-700';
                            cellBg = 'bg-orange-25';
                          }

                          if (!isCurrentMonth) {
                            headerBg = 'bg-gray-50';
                            headerText = 'text-gray-400';
                            cellBg = 'bg-gray-50';
                          }

                          return (
                            <div key={dayIndex} className={`min-h-[200px] ${isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}`}>
                              {/* Day Header */}
                              <div className={`${headerBg} p-3 border-b border-gray-200`}>
                                <div className="text-center">
                                  <div className={`text-lg font-bold ${headerText} ${isToday ? 'text-blue-600' : ''}`}>
                                    {String(day.getDate()).padStart(2, '0')}
                                  </div>
                                  <div className={`text-xs font-medium uppercase tracking-wide ${headerText} ${isToday ? 'text-blue-500' : ''}`}>
                                    {dayAbbrevs[dayIndex]}
                                  </div>
                                  {dayProductions.length > 0 && (
                                    <div className="mt-1 inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                      {dayProductions.length} items
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Day Content */}
                              <div className={`${cellBg} p-3 min-h-[160px]`}>
                                {isCurrentMonth ? (
                                  <div className="space-y-2">
                                    {dayProductions.map((production, idx) => (
                                      <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                                        {/* Product Name and Quantity */}
                                        <div className="flex items-center justify-between mb-2">
                                          <h4 className="font-semibold text-gray-900 text-sm leading-tight truncate flex-1 mr-2">
                                            {production.productName}
                                          </h4>
                                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            {production.quantity.toLocaleString()}
                                          </span>
                                        </div>
                                        
                                        {/* Remarks */}
                                        {production.remarks && (
                                          <p className="text-xs text-gray-600 leading-relaxed">
                                            {production.remarks}
                                          </p>
                                        )}
                                      </div>
                                    ))}
                                    
                                    {dayProductions.length === 0 && (
                                      <div className="flex items-center justify-center h-32 text-gray-400">
                                        <div className="text-center">
                                          <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                          <p className="text-xs">No production scheduled</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center h-32">
                                    <span className="text-gray-400 text-sm">{day.getDate()}</span>
                                  </div>
                                )}
                                
                                {/* Today indicator */}
                                {isToday && (
                                  <div className="absolute top-2 right-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Production Management Dialog */}
      <Dialog open={isProductionDialogOpen} onOpenChange={setIsProductionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Factory className="w-5 h-5 text-green-600" />
              Production Management - {selectedPlan?.planName}
            </DialogTitle>
            <DialogDescription>
              Manage production cards and track progress for this production plan.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPlan && (
            <div className="space-y-6">
              {/* Project Details */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3">Project Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Project Code</p>
                    <p className="font-medium text-blue-900">{selectedPlan.projectCode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Product Name</p>
                    <p className="font-medium text-blue-900">{selectedPlan.productName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Brand</p>
                    <p className="font-medium text-blue-900">{selectedPlan.brand}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Quantity</p>
                    <p className="font-medium text-blue-900">{selectedPlan.quantity.toLocaleString()} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Priority</p>
                    <Badge className={`${getPriorityColor(selectedPlan.priority)} text-xs`}>
                      {selectedPlan.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Status</p>
                    <Badge className={`${getStatusColor(selectedPlan.status)} text-xs`}>
                      {selectedPlan.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Start Date</p>
                    <p className="font-medium text-blue-900">{formatDate(selectedPlan.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">End Date</p>
                    <p className="font-medium text-blue-900">{formatDate(selectedPlan.endDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 mb-1">Assigned Plant</p>
                    <p className="font-medium text-blue-900">{selectedPlan.assignedPlant}</p>
                  </div>
                </div>
              </div>

              {/* Production Cards Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Production Cards</h3>
                  <Button onClick={() => setIsCreateCardDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-1" />
                    Create Production Card
                  </Button>
                </div>

                {productionCards.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="font-medium text-gray-900 mb-2">No Production Cards</h4>
                    <p className="text-gray-600 mb-4">Create production cards to organize and track different aspects of production.</p>
                    <Button onClick={() => setIsCreateCardDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-1" />
                      Create Your First Card
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {productionCards.map((card) => (
                      <Card key={card.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{card.cardName}</h4>
                            <Badge className={`${getPriorityColor(card.priority)} text-xs`}>
                              {card.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{card.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Assigned to:</span>
                              <span className="font-medium">{card.assignedTo}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Start Date:</span>
                              <span className="font-medium">{formatDate(card.startDate)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">End Date:</span>
                              <span className="font-medium">{formatDate(card.endDate)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Status:</span>
                              <Badge variant="outline" className="text-xs">
                                {card.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Production Card Dialog */}
      <CreateProductionCardDialog
        open={isCreateCardDialogOpen}
        onClose={() => setIsCreateCardDialogOpen(false)}
        selectedProject={convertPlanToRDProject(selectedPlan)}
      />
    </div>
  );
}

export default ProductionPlanning;