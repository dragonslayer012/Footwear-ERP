import React, { useState } from 'react';
import { Search, Bell, User, Plus, Edit, Trash2, Eye, Download, Filter, Shield, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from './ui/label';

export function UserManagement() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample user data
  const users = [
    {
      id: 'USR001',
      name: 'John Smith',
      email: 'john.smith@nerowink.com',
      role: 'Admin',
      department: 'IT',
      status: 'Active',
      lastLogin: '2024-01-22 09:30 AM',
      createdDate: '2024-01-15',
      avatar: null
    },
    {
      id: 'USR002', 
      name: 'Sarah Johnson',
      email: 'sarah.johnson@nerowink.com',
      role: 'R&D Manager',
      department: 'R&D',
      status: 'Active',
      lastLogin: '2024-01-22 08:45 AM',
      createdDate: '2024-01-10',
      avatar: null
    },
    {
      id: 'USR003',
      name: 'Mike Chen',
      email: 'mike.chen@nerowink.com', 
      role: 'Designer',
      department: 'Design',
      status: 'Active',
      lastLogin: '2024-01-21 04:15 PM',
      createdDate: '2024-01-20',
      avatar: null
    },
    {
      id: 'USR004',
      name: 'Emily Davis',
      email: 'emily.davis@nerowink.com',
      role: 'Plant Manager',
      department: 'Production',
      status: 'Active', 
      lastLogin: '2024-01-22 07:20 AM',
      createdDate: '2024-01-05',
      avatar: null
    },
    {
      id: 'USR005',
      name: 'Robert Wilson',
      email: 'robert.wilson@nerowink.com',
      role: 'Client',
      department: 'External',
      status: 'Inactive',
      lastLogin: '2024-01-18 02:30 PM',
      createdDate: '2024-01-25',
      avatar: null
    }
  ];

  // Sample role data
  const roles = [
    {
      id: 'ROL001',
      name: 'Admin',
      description: 'Full system access and user management',
      permissions: ['All'],
      userCount: 2,
      status: 'Active',
      createdDate: '2024-01-15'
    },
    {
      id: 'ROL002',
      name: 'R&D Manager', 
      description: 'R&D project management and oversight',
      permissions: ['R&D Management', 'Assign Designers', 'Approve Costing'],
      userCount: 3,
      status: 'Active',
      createdDate: '2024-01-10'
    },
    {
      id: 'ROL003',
      name: 'Designer',
      description: 'Upload prototypes and add project remarks',
      permissions: ['Upload Prototype', 'Add Remarks', 'View Projects'],
      userCount: 8,
      status: 'Active',
      createdDate: '2024-01-20'
    },
    {
      id: 'ROL004',
      name: 'Plant Manager',
      description: 'Production oversight and quality control',
      permissions: ['Production Management', 'Quality Control', 'Plant Tracking'],
      userCount: 4,
      status: 'Active',
      createdDate: '2024-01-05'
    },
    {
      id: 'ROL005',
      name: 'Client',
      description: 'Limited access to view prototypes and provide feedback',
      permissions: ['View Prototype', 'Upload Feedback'],
      userCount: 12,
      status: 'Active',
      createdDate: '2024-01-25'
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'R&D Manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Designer': return 'bg-green-100 text-green-800 border-green-200';
      case 'Plant Manager': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Client': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CreateUserDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#0c9dcb] hover:bg-[#0a8bb5] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account with assigned role and department. The user will receive login credentials via email.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-[#6b6b6b]">Full Name</Label>
              <Input placeholder="Enter full name" />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#6b6b6b]">Email</Label>
              <Input placeholder="Enter email address" type="email" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-[#6b6b6b]">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-[#6b6b6b]">Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="rd">R&D</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-[#6b6b6b]">Password</Label>
              <Input placeholder="Enter password" type="password" />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#6b6b6b]">Status</Label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-[#0c9dcb] hover:bg-[#0a8bb5] text-white">Create User</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const CreateRoleDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#0c9dcb] hover:bg-[#0a8bb5] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Role
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogDescription>
            Define a new role with specific permissions and access levels. Users assigned to this role will inherit these permissions.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-[#6b6b6b]">Role Name</Label>
            <Input placeholder="Enter role name" />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-[#6b6b6b]">Description</Label>
            <Input placeholder="Enter role description" />
          </div>

          <div>
            <Label className="text-sm font-medium text-[#6b6b6b]">Permissions</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                'R&D Management', 'Master Data Management', 'Production Management', 
                'Inventory Management', 'User Management', 'Reports & Analytics',
                'Workflow Automation', 'Notifications'
              ].map(permission => (
                <label key={permission} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-[#6b6b6b]">{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-[#0c9dcb] hover:bg-[#0a8bb5] text-white">Create Role</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#07131d] tracking-wide">User & Role Management</h1>
          <p className="text-sm text-[#515556] mt-1">Manage users, roles, and permissions across the system</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#80898b] w-4 h-4" />
            <input
              type="text"
              placeholder="Search users or roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-[280px] border border-[#d2d6da] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0c9dcb] focus:border-transparent"
            />
          </div>
          <Bell className="w-6 h-6 text-[#515556]" />
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-[#515556]" />
            <span className="text-sm font-semibold text-[#515556]">Admin</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#e9ecef]">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'users'
                ? 'border-[#0c9dcb] text-[#0c9dcb]'
                : 'border-transparent text-[#515556] hover:text-[#041013]'
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'roles'
                ? 'border-[#0c9dcb] text-[#0c9dcb]'
                : 'border-transparent text-[#515556] hover:text-[#041013]'
            }`}
          >
            Roles & Permissions ({roles.length})
          </button>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-[#26b4e0] text-[#26b4e0] hover:bg-[#26b4e0] hover:text-white">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-[#6c757d] text-[#6c757d] hover:bg-[#6c757d] hover:text-white">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-[#6c757d]">
            Total {activeTab === 'users' ? 'Users' : 'Roles'}: 
            <span className="font-semibold text-[#26b4e0] ml-1">
              {activeTab === 'users' ? filteredUsers.length : filteredRoles.length}
            </span>
          </div>
          {activeTab === 'users' ? <CreateUserDialog /> : <CreateRoleDialog />}
        </div>
      </div>

      {/* Users Table */}
      {activeTab === 'users' && (
        <Card className="shadow-lg border border-[#e9ecef] rounded-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f7f7f7] border-b border-[#e9ecef]">
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">User</TableHead>
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">Role</TableHead>
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">Department</TableHead>
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">Last Login</TableHead>
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">Created</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-b border-[#e9ecef] hover:bg-[#f8f9fa]">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-[#0c9dcb] text-white text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-semibold text-[#041013]">{user.name}</p>
                          <p className="text-xs text-[#6c757d]">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={`${getRoleColor(user.role)} border text-xs`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-xs font-semibold text-[#80898b]">{user.department}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={`${getStatusColor(user.status)} border text-xs`}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-xs font-semibold text-[#80898b]">{user.lastLogin}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-xs font-semibold text-[#80898b]">
                        {new Date(user.createdDate).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-[#0c9dcb]" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-[#6c757d]" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Roles Table */}
      {activeTab === 'roles' && (
        <Card className="shadow-lg border border-[#e9ecef] rounded-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#f7f7f7] border-b border-[#e9ecef]">
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">Role Name</TableHead>
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">Description</TableHead>
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">Users</TableHead>
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">Permissions</TableHead>
                  <TableHead className="text-xs font-semibold text-[#565757] py-4">Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id} className="border-b border-[#e9ecef] hover:bg-[#f8f9fa]">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-[#0c9dcb]" />
                        <span className="text-xs font-semibold text-[#041013]">{role.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-xs text-[#6c757d]">{role.description}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-xs font-semibold text-[#80898b]">{role.userCount}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 2).map(permission => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {role.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={`${getStatusColor(role.status)} border text-xs`}>
                        {role.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-[#0c9dcb]" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-[#6c757d]" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-md border border-[#e9ecef]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#0c9dcb] bg-opacity-10 rounded-lg">
                <User className="w-6 h-6 text-[#0c9dcb]" />
              </div>
              <div>
                <p className="text-sm text-[#6c757d]">Total Users</p>
                <p className="text-2xl font-bold text-[#041013]">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-[#e9ecef]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 bg-opacity-10 rounded-lg">
                <UserPlus className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-[#6c757d]">Active Users</p>
                <p className="text-2xl font-bold text-[#041013]">
                  {users.filter(u => u.status === 'Active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-[#e9ecef]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 bg-opacity-10 rounded-lg">
                <Shield className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-[#6c757d]">Total Roles</p>
                <p className="text-2xl font-bold text-[#041013]">{roles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-[#e9ecef]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 bg-opacity-10 rounded-lg">
                <User className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-[#6c757d]">Admins</p>
                <p className="text-2xl font-bold text-[#041013]">
                  {users.filter(u => u.role === 'Admin').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}