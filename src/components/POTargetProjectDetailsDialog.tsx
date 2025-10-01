import React, { useState, useEffect } from "react";
import {
  Eye,
  Edit2,
  ArrowRight,
  Calendar,
  User,
  IndianRupee,
  Clock,
  CheckCircle,
  AlertTriangle,
  Workflow,
  Target,
  Building,
  Users,
  X,
  Save,
  RefreshCw,
  Calculator,
  MessageSquare,
  Award,
  ShoppingCart,
  Factory,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";
import { useERPStore } from "../lib/data-store";
import type { RDProject } from "../lib/data-store";

interface POTargetProjectDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: RDProject | null;
  brands?: any[];
  categories?: any[];
  types?: any[];
  colors?: any[];
  countries?: any[];
}

const workflowStages = [
  {
    id: "idea-submitted",
    name: "Idea Submitted",
    color: "bg-blue-100 text-blue-800",
    progress: 10,
  },
  {
    id: "costing-pending",
    name: "Costing Pending",
    color: "bg-yellow-100 text-yellow-800",
    progress: 20,
  },
  {
    id: "costing-received",
    name: "Costing Received",
    color: "bg-orange-100 text-orange-800",
    progress: 35,
  },
  {
    id: "prototype",
    name: "Prototype",
    color: "bg-purple-100 text-purple-800",
    progress: 50,
  },
  {
    id: "red-seal",
    name: "Red Seal",
    color: "bg-red-100 text-red-800",
    progress: 65,
  },
  {
    id: "green-seal",
    name: "Green Seal",
    color: "bg-green-100 text-green-800",
    progress: 80,
  },
  {
    id: "final-approved",
    name: "Final Approved",
    color: "bg-emerald-100 text-emerald-800",
    progress: 95,
  },
  {
    id: "po-issued",
    name: "PO Issued",
    color: "bg-teal-100 text-teal-800",
    progress: 100,
  },
];

export function POTargetProjectDetailsDialog({
  open,
  onOpenChange,
  project,
  brands,
  categories,
  types,
  colors,
  countries,
}: POTargetProjectDetailsDialogProps) {
  const { updateRDProject } = useERPStore();

  // PO Target Development table data - matching the POTargetDate component data
  const poTargetDevelopmentData = [
    {
      productCode: "RND/24-25/01/102",
      brand: "UA Sports",
      brandCode: "UAS01",
      category: "Formal",
      type: "Leather",
      gender: "Men",
      artColour: "Chunky Mickey",
      color: "Brown",
      country: "China",
      startDate: "05/01/2024",
      poTargetDate: "20/09/2025",
      deliveryDate: "15/11/2025",
      status: "PO Confirmed",
      nextDate: "25/09/2025",
      remarks: "PO Confirmed",
      priority: "High",
      taskInc: "Priyanka",
      finalCost: 1250,
      targetCost: 1200,
      orderQty: 1500,
      poValue: 1875000,
    },
    {
      productCode: "RND/24-25/01/107",
      brand: "AquaTech",
      brandCode: "AQT02",
      category: "Casual",
      type: "CKD",
      gender: "Men",
      artColour: "Hydro Dipping Film",
      color: "White",
      country: "India",
      startDate: "12/01/2024",
      poTargetDate: "25/09/2025",
      deliveryDate: "20/11/2025",
      status: "PO Ready",
      nextDate: "28/09/2025",
      remarks: "PO Ready",
      priority: "Low",
      taskInc: "Priyanka",
      finalCost: 890,
      targetCost: 850,
      orderQty: 2000,
      poValue: 1780000,
    },
    {
      productCode: "RND/24-25/01/110",
      brand: "ZipStyle",
      brandCode: "ZPS03",
      category: "Formal",
      type: "Leather",
      gender: "Men",
      artColour: "Red zip pocket",
      color: "Navy Blue",
      country: "India",
      startDate: "18/01/2024",
      poTargetDate: "30/09/2025",
      deliveryDate: "25/11/2025",
      status: "Client Approval",
      nextDate: "30/09/2025",
      remarks: "Client Approval",
      priority: "Medium",
      taskInc: "Priyanka",
      finalCost: 1100,
      targetCost: 1050,
      orderQty: 1200,
      poValue: 1320000,
    },
    {
      productCode: "RND/24-25/01/105",
      brand: "FlexiWalk",
      brandCode: "FLW01",
      category: "Sports",
      type: "Running",
      gender: "Unisex",
      artColour: "Mesh Breathable",
      color: "Black & Neon",
      country: "Vietnam",
      startDate: "15/02/2024",
      poTargetDate: "26/09/2025",
      deliveryDate: "20/11/2025",
      status: "PO Confirmed",
      nextDate: "26/09/2025",
      remarks: "PO Confirmed",
      priority: "High",
      taskInc: "Rajesh",
      finalCost: 1450,
      targetCost: 1400,
      orderQty: 3000,
      poValue: 4350000,
    },
    {
      productCode: "RND/24-25/01/108",
      brand: "UrbanStep",
      brandCode: "UST04",
      category: "Casual",
      type: "Sneakers",
      gender: "Women",
      artColour: "Metallic Finish",
      color: "Rose Gold",
      country: "Bangladesh",
      startDate: "22/02/2024",
      poTargetDate: "02/10/2025",
      deliveryDate: "30/11/2025",
      status: "PO Ready",
      nextDate: "02/10/2025",
      remarks: "PO Ready",
      priority: "Medium",
      taskInc: "Sneha",
      finalCost: 1320,
      targetCost: 1280,
      orderQty: 1800,
      poValue: 2376000,
    },
    {
      productCode: "RND/24-25/01/111",
      brand: "TechGrip",
      brandCode: "TGR05",
      category: "Formal",
      type: "Oxford",
      gender: "Men",
      artColour: "Classic Patent",
      color: "Mahogany Brown",
      country: "India",
      startDate: "01/03/2024",
      poTargetDate: "05/10/2025",
      deliveryDate: "05/12/2025",
      status: "Client Approval",
      nextDate: "05/10/2025",
      remarks: "Client Approval",
      priority: "Low",
      taskInc: "Amit",
      finalCost: 1180,
      targetCost: 1150,
      orderQty: 1000,
      poValue: 1180000,
    },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] =
    useState<RDProject | null>(null);
  const [poNumber, setPONumber] = useState("");
  const [isAddingPO, setIsAddingPO] = useState(false);

  useEffect(() => {
    if (project) {
      setEditedProject({ ...project });
    }
  }, [project]);

  if (!project || !editedProject) return null;

  // Get project data based on project code
  const getProjectData = () => {
    const projectData = poTargetDevelopmentData.find(
      (p) => p.productCode === project.autoCode,
    );
    return projectData || poTargetDevelopmentData[0]; // fallback to first item
  };

  const projectData = getProjectData();

  const getBrandName = (brandId: string) => {
    if (!brands || brands.length === 0)
      return projectData.brand;
    const brand = brands.find((b) => b.id === brandId);
    return brand?.brandName || projectData.brand;
  };

  const getBrandCode = (brandId: string) => {
    if (!brands || brands.length === 0)
      return projectData.brandCode;
    const brand = brands.find((b) => b.id === brandId);
    return brand?.brandCode || projectData.brandCode;
  };

  const getCategoryName = (categoryId: string) => {
    if (!categories || categories.length === 0)
      return projectData.category;
    const category = categories.find(
      (c) => c.id === categoryId,
    );
    return category?.categoryName || projectData.category;
  };

  const getTypeName = (typeId: string) => {
    if (!types || types.length === 0) return projectData.type;
    const type = types.find((t) => t.id === typeId);
    return type?.typeName || projectData.type;
  };

  const getColorName = (colorId: string) => {
    if (!colors || colors.length === 0)
      return projectData.color;
    const color = colors.find((c) => c.id === colorId);
    return color?.colorName || projectData.color;
  };

  const getCountryName = (countryId: string) => {
    if (!countries || countries.length === 0)
      return projectData.country;
    const country = countries.find((c) => c.id === countryId);
    return country?.countryName || projectData.country;
  };

  const getCurrentStage = () => {
    // For PO Target, we're at the final stage
    return (
      workflowStages.find(
        (stage) => stage.id === "po-issued",
      ) || workflowStages[7]
    );
  };

  const getNextStage = () => {
    // PO Issued is the final stage, so no next stage
    return null;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return projectData.startDate;
    // If it's already in DD/MM/YYYY format, return as is
    if (dateString.includes("/")) return dateString;
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleSave = () => {
    if (editedProject) {
      updateRDProject(editedProject.id, editedProject);
      toast.success("PO Target project updated successfully!");
      setIsEditing(false);
    }
  };

  const handleAddPONumber = () => {
    if (poNumber.trim() && editedProject) {
      const updatedProject = {
        ...editedProject,
        poNumber: poNumber.trim(),
        poStatus: "Approved",
        status: "PO Issued",
      };
      updateRDProject(editedProject.id, updatedProject);
      setEditedProject(updatedProject);
      setPONumber("");
      setIsAddingPO(false);
      toast.success(
        "PO Number added successfully! Project status updated to PO Approved.",
      );
    } else {
      toast.error("Please enter a valid PO number.");
    }
  };

  const handleEditPONumber = () => {
    if (poNumber.trim() && editedProject) {
      const updatedProject = {
        ...editedProject,
        poNumber: poNumber.trim(),
      };
      updateRDProject(editedProject.id, updatedProject);
      setEditedProject(updatedProject);
      setPONumber("");
      setIsAddingPO(false);
      toast.success("PO Number updated successfully!");
    } else {
      toast.error("Please enter a valid PO number.");
    }
  };

  // Check if project is pending (no PO or pending status)
  const isPOPending = () => {
    return (
      !project.poNumber &&
      (project.poStatus === "Pending" || !project.poStatus)
    );
  };

  // Check if project is approved (has PO number)
  const isPOApproved = () => {
    return project.poNumber && project.poStatus === "Approved";
  };

  const currentStage = getCurrentStage();
  const nextStage = getNextStage();

  // Get color based on project color
  const getColorDisplay = () => {
    const colorName = getColorName(project.colorId);
    const colorMap: Record<string, string> = {
      Black: "bg-gray-900",
      White: "bg-gray-100 border border-gray-300",
      Brown: "bg-yellow-600",
      "Navy Blue": "bg-blue-900",
      Red: "bg-red-600",
      "Rose Gold": "bg-pink-400",
      "Mahogany Brown": "bg-yellow-800",
      "Black & Neon":
        "bg-gradient-to-r from-gray-900 to-green-400",
    };
    return (
      colorMap[colorName] ||
      colorMap[projectData.color] ||
      "bg-gray-400"
    );
  };

  // Calculate cost variance
  const getCostVariance = () => {
    const variance =
      projectData.finalCost - projectData.targetCost;
    return {
      amount: Math.abs(variance),
      isOverBudget: variance > 0,
      percentage: (
        (variance / projectData.targetCost) *
        100
      ).toFixed(1),
    };
  };

  const costVariance = getCostVariance();

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!max-w-[85vw] !w-[85vw] max-h-[90vh] overflow-hidden p-0 m-0 top-[5vh] translate-y-0 flex flex-col">
          {/* Sticky Header Section */}
          <div className="sticky top-0 z-50 px-8 py-6 bg-gradient-to-r from-teal-50 via-white to-teal-50 border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-3xl font-semibold text-gray-900 mb-2">
                    PO Target Details
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    View and manage PO Target project details
                    and information
                  </DialogDescription>
                  <div className="flex items-center gap-4">
                    <span className="text-lg text-gray-600">
                      {projectData.productCode}
                    </span>
                    <Badge
                      className={`${currentStage.color} text-sm px-3 py-1`}
                    >
                      {currentStage.name}
                    </Badge>
                    <Badge
                      className={`${projectData.priority === "High" ? "bg-red-500 text-white" : projectData.priority === "Medium" ? "bg-purple-500 text-white" : "bg-green-600 text-white"} text-xs px-2 py-1`}
                    >
                      {projectData.priority}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    console.log("Current project status:", projectData.status);
                    toast.success("Advancing to Production phase");
                    // Add logic to advance to production
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Factory className="w-4 h-4 mr-2" />
                  Advance to Production
                </Button>
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
                  <h3 className="text-xl font-semibold text-gray-900">
                    PO Target Progress
                  </h3>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Overall Progress
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {currentStage.progress}%
                      </span>
                    </div>
                    <Progress
                      value={currentStage.progress}
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-8 gap-2">
                    {workflowStages.map((stage, index) => {
                      const isCompleted =
                        workflowStages.findIndex(
                          (s) => s.id === "po-issued",
                        ) >= index;
                      const isCurrent =
                        stage.id === "po-issued";

                      return (
                        <div
                          key={stage.id}
                          className={`text-center p-2 rounded-lg transition-all ${
                            isCurrent
                              ? "bg-teal-100 border-2 border-teal-400 shadow-md"
                              : isCompleted
                                ? "bg-teal-50 border border-teal-200"
                                : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 mx-auto mb-1 rounded-full flex items-center justify-center text-xs ${
                              isCurrent
                                ? "bg-teal-500 text-white"
                                : isCompleted
                                  ? "bg-teal-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="text-xs font-medium text-gray-700">
                            {stage.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* PO Target Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    PO Target Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Product & Brand Details */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Product & Brand Details
                    </h4>

                    {/* Product Preview */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label className="text-sm font-medium text-gray-600 mb-3 block">
                        Product Preview
                      </Label>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                          <img
                            src={
                              projectData.category === "Sports"
                                ? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzaG9lJTIwcHJvZHVjdHxlbnwxfHx8fDE3NTY3MzU5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                : projectData.category ===
                                    "Casual"
                                  ? "https://images.unsplash.com/photo-1549298916-b41d501d3772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzaG9lJTIwcHJvZHVjdHxlbnwxfHx8fDE3NTY3MzU5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                  : "https://images.unsplash.com/photo-1533158628620-7e35717d36e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzaG9lJTIwcHJvZHVjdHxlbnwxfHx8fDE3NTY3MzU5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            }
                            alt={projectData.artColour}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-medium text-gray-900">
                            {projectData.artColour}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            PO Target Sample
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className={`w-3 h-3 rounded-full ${getColorDisplay()}`}
                            ></div>
                            <span className="text-xs text-gray-400">
                              {projectData.color} Variant
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Product Code
                        </Label>
                        <div className="mt-1 text-base font-mono font-bold text-gray-900">
                          {projectData.productCode}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Brand & Profile
                        </Label>
                        <div className="mt-1">
                          <div className="text-base font-medium text-gray-900">
                            {projectData.brand}
                          </div>
                          <div className="text-sm text-gray-500">
                            {projectData.brandCode}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Category, Type & Gender
                        </Label>
                        <div className="mt-1">
                          <div className="text-base font-medium text-gray-900">
                            {projectData.category}
                          </div>
                          <div className="text-sm text-gray-500">
                            {projectData.type}
                          </div>
                          <div className="text-xs text-gray-400">
                            {projectData.gender}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Art & Colour
                        </Label>
                        <div className="mt-1">
                          <div className="text-base font-medium text-gray-900">
                            {projectData.artColour}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className={`w-4 h-4 rounded-full ${getColorDisplay()}`}
                            ></div>
                            <span className="text-sm text-gray-500">
                              {projectData.color}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Country
                        </Label>
                        <div className="mt-1 text-base text-gray-900">
                          {projectData.country}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline & Status */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Timeline & Status
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Start Date
                        </Label>
                        <div className="mt-1 text-base text-gray-900">
                          {projectData.startDate}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          PO Target Date
                        </Label>
                        <div className="mt-1 text-base text-gray-900">
                          {projectData.poTargetDate}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Delivery Date
                        </Label>
                        <div className="mt-1 text-base text-gray-900">
                          {projectData.deliveryDate}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Current Status
                        </Label>
                        <div className="mt-1">
                          <Badge className="bg-teal-100 text-teal-800">
                            PO Issued
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          PO Status
                        </Label>
                        <div className="mt-1">
                          <Badge
                            className={
                              projectData.status ===
                              "PO Confirmed"
                                ? "bg-green-100 text-green-800"
                                : projectData.status ===
                                    "PO Ready"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-orange-100 text-orange-800"
                            }
                          >
                            {projectData.status ===
                            "PO Confirmed"
                              ? "✓ PO Confirmed"
                              : projectData.status ===
                                  "PO Ready"
                                ? "📋 PO Ready"
                                : "⏳ Client Approval"}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Priority
                        </Label>
                        <div className="mt-1">
                          <Badge
                            className={`${projectData.priority === "High" ? "bg-red-500 text-white" : projectData.priority === "Medium" ? "bg-purple-500 text-white" : "bg-green-600 text-white"}`}
                          >
                            {projectData.priority}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Task-INC (Assigned Person)
                        </Label>
                        <div className="mt-1 text-base text-gray-900">
                          {projectData.taskInc}
                        </div>
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
                      <strong>PO Target Analysis:</strong> Product ready for production order with standardized materials and components. 
                      Upper materials include Rexine and Skinfit lining with EVA padding. Component specifications finalized with 
                      velcro, buckles, and heat transfer elements. All material consumption rates have been validated for efficient 
                      production and cost optimization.
                    </div>
                  </div>
                </div>
              </div>

              {/* PO Number Management Section - For Pending Projects Only */}
              {isPOPending() && (
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      PO Number Management
                    </h3>
                  </div>

                  <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="text-lg font-semibold text-orange-800 mb-2">
                          PO Number Required
                        </h4>
                        <p className="text-sm text-orange-700">
                          This project is currently pending PO
                          approval. Add a PO number to move this
                          project to the approved section and
                          update its status.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-lg border border-orange-200">
                      {!isAddingPO ? (
                        <div className="text-center">
                          <Button
                            onClick={() => setIsAddingPO(true)}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add PO Number
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">
                              Purchase Order Number
                            </Label>
                            <Input
                              value={poNumber}
                              onChange={(e) =>
                                setPONumber(e.target.value)
                              }
                              placeholder="Enter PO number (e.g., PO-2024-001)"
                              className="mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Enter the official purchase order
                              number provided by the client
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              onClick={handleAddPONumber}
                              className="bg-green-500 hover:bg-green-600"
                              disabled={!poNumber.trim()}
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Add PO Number
                            </Button>
                            <Button
                              onClick={() => {
                                setIsAddingPO(false);
                                setPONumber("");
                              }}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* PO Number Display & Edit Section - For Approved Projects Only */}
              {isPOApproved() && (
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      PO Number Information
                    </h3>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="text-lg font-semibold text-green-800 mb-2">
                          PO Number Approved
                        </h4>
                        <p className="text-sm text-green-700">
                          This project has been approved and has
                          an assigned PO number. You can edit
                          the PO number if needed.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Current PO Number
                          </Label>
                          {!isAddingPO ? (
                            <div className="mt-1 flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-center gap-3">
                                <Badge className="bg-green-100 text-green-800 px-3 py-1 text-base font-mono">
                                  {project.poNumber ||
                                    "PO-2024-001"}
                                </Badge>
                                <span className="text-sm text-gray-600">
                                  Approved PO Number
                                </span>
                              </div>
                              <Button
                                onClick={() => {
                                  setIsAddingPO(true);
                                  setPONumber(
                                    project.poNumber || "",
                                  );
                                }}
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-50 hover:border-blue-300"
                              >
                                <Edit2 className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                            </div>
                          ) : (
                            <div className="mt-1 space-y-3">
                              <Input
                                value={poNumber}
                                onChange={(e) =>
                                  setPONumber(e.target.value)
                                }
                                placeholder="Enter new PO number (e.g., PO-2024-001)"
                                className="mt-1"
                              />
                              <p className="text-xs text-gray-500">
                                Update the purchase order number
                                for this project
                              </p>
                              <div className="flex gap-3">
                                <Button
                                  onClick={handleEditPONumber}
                                  className="bg-green-500 hover:bg-green-600"
                                  disabled={!poNumber.trim()}
                                >
                                  <Save className="w-4 h-4 mr-2" />
                                  Update PO Number
                                </Button>
                                <Button
                                  onClick={() => {
                                    setIsAddingPO(false);
                                    setPONumber("");
                                  }}
                                  variant="outline"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          Project Status:
                        </span>
                      </div>
                      <ul className="text-xs text-blue-700 ml-6 space-y-1">
                        <li>
                          • This project is in the "PO Approved"
                          section
                        </li>
                        <li>
                          • Project status: "PO Issued" (100%
                          complete)
                        </li>
                        <li>• PO status: "Approved"</li>
                        <li>
                          • You can edit the PO number without
                          changing the project status
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Cost & Order Overview Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                    <IndianRupee className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Cost & Order Overview
                  </h3>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Target Cost */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-700">
                          Target Cost
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-xl font-bold text-blue-600">
                        <IndianRupee className="w-4 h-4" />
                        <span>
                          {projectData.targetCost.toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Final Cost */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700">
                          Final Cost
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-xl font-bold text-green-600">
                        <IndianRupee className="w-4 h-4" />
                        <span>
                          {projectData.finalCost.toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Order Quantity */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingCart className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-700">
                          Order Quantity
                        </span>
                      </div>
                      <div className="text-xl font-bold text-purple-600">
                        {projectData.orderQty.toLocaleString(
                          "en-IN",
                        )}{" "}
                        units
                      </div>
                    </div>

                    {/* PO Value */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-orange-700">
                          PO Value
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-xl font-bold text-orange-600">
                        <IndianRupee className="w-4 h-4" />
                        <span>
                          {projectData.poValue.toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cost Variance Section */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div
                      className={`${costVariance.isOverBudget ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"} border rounded-lg p-4`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {costVariance.isOverBudget ? (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        <span
                          className={`text-sm ${costVariance.isOverBudget ? "text-red-700" : "text-green-700"}`}
                        >
                          Cost Variance Analysis
                        </span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 text-xl font-bold ${costVariance.isOverBudget ? "text-red-600" : "text-green-600"}`}
                      >
                        <span>
                          {costVariance.isOverBudget
                            ? "+"
                            : "-"}
                        </span>
                        <IndianRupee className="w-4 h-4" />
                        <span>
                          {costVariance.amount.toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </div>
                      <div
                        className={`text-xs mt-1 ${costVariance.isOverBudget ? "text-red-500" : "text-green-500"}`}
                      >
                        {costVariance.isOverBudget ? "+" : ""}
                        {costVariance.percentage}% vs target
                        cost
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Feedback & Updates */}
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Client Feedback & Updates
                  </h3>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Client Feedback Status
                        </Label>
                        <div className="mt-2">
                          <Badge
                            className={
                              projectData.status ===
                              "PO Confirmed"
                                ? "bg-green-100 text-green-800 text-sm px-3 py-2"
                                : projectData.status ===
                                    "PO Ready"
                                  ? "bg-blue-100 text-blue-800 text-sm px-3 py-2"
                                  : "bg-orange-100 text-orange-800 text-sm px-3 py-2"
                            }
                          >
                            {projectData.status ===
                            "PO Confirmed"
                              ? "✅ Client Approved & PO Confirmed"
                              : projectData.status ===
                                  "PO Ready"
                                ? "📋 Ready for PO Generation"
                                : "⏳ Awaiting Client Approval"}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Next Action Date
                        </Label>
                        <div className="mt-2 text-base text-gray-900">
                          {projectData.nextDate}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-sm font-medium text-gray-600 mb-3 block">
                        PO Target Summary
                      </Label>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">
                              Product:
                            </span>
                            <div className="text-gray-900">
                              {projectData.artColour}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              Quantity:
                            </span>
                            <div className="text-gray-900">
                              {projectData.orderQty.toLocaleString(
                                "en-IN",
                              )}{" "}
                              units
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              Total Value:
                            </span>
                            <div className="text-gray-900 flex items-center">
                              <IndianRupee className="w-3 h-3 mr-1" />
                              {projectData.poValue.toLocaleString(
                                "en-IN",
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}