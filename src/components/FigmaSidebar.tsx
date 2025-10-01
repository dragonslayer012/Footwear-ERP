import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Lightbulb, 
  Factory, 
  Package, 
  Users, 
  Settings, 
  FileText, 
  BarChart3, 
  Menu,
  X,
  Grid,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Calculator,
  Palette,
  MapPin,
  Tags,
  Building,
  Truck,
  ShoppingCart,
  ClipboardList,
  TrendingUp,
  PieChart,
  Home,
  Minimize2,
  CheckCircle,
  Calendar,
  Warehouse,
  BarChart4,
  Target,
  Layers,
  TrendingDown
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface SidebarProps {
  currentModule: string;
  currentSubModule?: string;
  onModuleChange: (module: string, subModule?: string) => void;
  onCollapseChange?: (collapsed: boolean) => void;
}

interface SubModule {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: string;
}

interface Module {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: string;
  description: string;
  subModules?: SubModule[];
}

export function FigmaSidebar({ currentModule, currentSubModule, onModuleChange, onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>(['master-data', 'rd-management', 'production', 'inventory']);

  const handleCollapseToggle = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onCollapseChange?.(collapsed);
  };

  const modules: Module[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      description: 'Overview and analytics'
    },
    {
      id: 'master-data',
      name: 'Master Data Management',
      icon: <Database className="w-5 h-5" />,
      description: 'Standardize reference data'
    },
    {
      id: 'rd-management',
      name: 'R&D Management',
      icon: <Lightbulb className="w-5 h-5" />,
      description: 'Design lifecycle management',
      subModules: [
        { id: 'rd-dashboard', name: 'R&D Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'project', name: 'Project', icon: <Target className="w-4 h-4" /> },
        { id: 'red-seal', name: 'Red Seal', icon: <AlertTriangle className="w-4 h-4" /> },
        { id: 'green-seal', name: 'Green Seal', icon: <CheckCircle className="w-4 h-4" /> },
        { id: 'po-target-date', name: 'PO Target Date', icon: <ShoppingCart className="w-4 h-4" /> }
      ]
    },
    {
      id: 'production',
      name: 'Production Management',
      icon: <Factory className="w-5 h-5" />,
      description: 'Manufacturing process tracking',
      subModules: [
        { id: 'production-dashboard', name: 'Production Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'production-planning', name: 'Production Planning', icon: <Calendar className="w-4 h-4" /> },
        { id: 'production-tracking', name: 'Production Tracking', icon: <ClipboardList className="w-4 h-4" /> },
        { id: 'production-analytics', name: 'Analytics & Reports', icon: <PieChart className="w-4 h-4" /> }
      ]
    },
    {
      id: 'inventory',
      name: 'Inventory & Storage',
      icon: <Warehouse className="w-5 h-5" />,
      description: 'Smart inventory management and storage optimization',
      subModules: [
        { id: 'inventory', name: 'Inventory', icon: <Layers className="w-4 h-4" /> },
        { id: 'material-requisition', name: 'Issue Material', icon: <ShoppingCart className="w-4 h-4" /> },
        { id: 'vendor-management', name: 'Vendor Management', icon: <Users className="w-4 h-4" /> },
        { id: 'reports-analysis', name: 'Reports & Analysis', icon: <BarChart4 className="w-4 h-4" /> }
      ]
    },
    {
      id: 'users',
      name: 'User & Role Management',
      icon: <Users className="w-5 h-5" />,
      description: 'Team and permissions'
    },
    {
      id: 'notifications',
      name: 'Notifications & Alerts',
      icon: <Bell className="w-5 h-5" />,
      description: 'System alerts and reminders'
    },
    {
      id: 'reports',
      name: 'Reporting & Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Business intelligence',
      subModules: [
        { id: 'prototype-reports', name: 'Prototype Reports', icon: <TrendingUp className="w-4 h-4" /> },
        { id: 'designer-productivity', name: 'Designer Productivity', icon: <Users className="w-4 h-4" /> },
        { id: 'brand-costing', name: 'Brand Costing', icon: <Calculator className="w-4 h-4" /> },
        { id: 'plant-utilization', name: 'Plant Utilization', icon: <PieChart className="w-4 h-4" /> }
      ]
    },
    {
      id: 'wireframe',
      name: 'System Documentation',
      icon: <Grid className="w-5 h-5" />,
      description: 'Design system'
    },
  ];

  const handleModuleClick = (moduleId: string, hasSubModules = false) => {
    if (hasSubModules) {
      // For modules with sub-modules, only toggle expansion - don't navigate
      toggleModuleExpansion(moduleId);
    } else {
      // For modules without sub-modules, navigate directly
      onModuleChange(moduleId);
    }
  };

  const handleSubModuleClick = (parentModuleId: string, subModuleId: string) => {
    onModuleChange(parentModuleId, subModuleId);
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <>
      {/* Fixed Figma-style Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transform transition-all duration-300 ease-out shadow-lg ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className={`p-4 border-b border-gray-100 ${isCollapsed ? 'px-3' : 'px-6'}`}>
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#0c9dcb] to-[#26b4e0] rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                {!isCollapsed && (
                  <div>
                    <h1 className="font-bold text-gray-900 text-base">ERP System</h1>
                    <p className="text-xs text-gray-500">Manufacturing Suite</p>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCollapseToggle(true)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Hamburger Toggle when collapsed */}
          {isCollapsed && (
            <div className="p-3 border-b border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCollapseToggle(false)}
                className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Search - only when expanded */}
          {!isCollapsed && (
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search modules..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0c9dcb] focus:border-transparent bg-gray-50"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className={`flex-1 overflow-y-auto scrollbar-hide ${isCollapsed ? 'px-2 py-3' : 'px-4 py-4'}`}>
            <div className="space-y-1">
              {modules.map((module) => (
                <div key={module.id}>
                  <button
                    onClick={() => handleModuleClick(module.id, module.id !== 'master-data' && !!module.subModules)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                      currentModule === module.id
                        ? 'bg-[#0c9dcb] text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? module.name : ''}
                  >
                    <div className={`flex-shrink-0 ${
                      currentModule === module.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                    }`}>
                      {module.icon}
                    </div>
                    
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm ${
                            currentModule === module.id ? 'text-white' : 'text-gray-900'
                          }`}>
                            {module.name}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {module.subModules && module.id !== 'master-data' && (
                            <div className={`${
                              currentModule === module.id ? 'text-white' : 'text-gray-400'
                            }`}>
                              {expandedModules.includes(module.id) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </button>

                  {/* Sub-modules - only when expanded */}
                  {!isCollapsed && module.subModules && expandedModules.includes(module.id) && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-4">
                      {module.subModules.map((subModule) => (
                        <button
                          key={subModule.id}
                          onClick={() => handleSubModuleClick(module.id, subModule.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left text-sm transition-colors ${
                            currentSubModule === subModule.id && currentModule === module.id
                              ? 'bg-[#0c9dcb]/10 text-[#0c9dcb] font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <div className={`flex-shrink-0 ${
                            currentSubModule === subModule.id && currentModule === module.id
                              ? 'text-[#0c9dcb]'
                              : 'text-gray-400'
                          }`}>
                            {subModule.icon}
                          </div>
                          <span className="truncate">{subModule.name}</span>
                          {subModule.badge && (
                            <Badge variant="secondary" className="text-xs ml-auto">
                              {subModule.badge}
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Footer - only when expanded */}
          {!isCollapsed && (
            <>
              <Separator className="mx-4" />
              <div className="p-4">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-sm">Settings</span>
                </button>
              </div>
            </>
          )}

          {/* Collapsed footer */}
          {isCollapsed && (
            <div className="p-2 border-t border-gray-100">
              <button 
                className="w-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="w-4 h-4 mx-auto" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}