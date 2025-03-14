
import React, { useState } from 'react';
import { Shield, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: number;
  users: number;
};

const RoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>([
    { id: '1', name: 'Administrator', description: 'Full system access', permissions: 15, users: 2 },
    { id: '2', name: 'Manager', description: 'Can manage alerts and billing', permissions: 10, users: 5 },
    { id: '3', name: 'Operator', description: 'Can view dashboard and alerts', permissions: 5, users: 8 },
    { id: '4', name: 'Guest', description: 'Read-only access', permissions: 2, users: 3 },
  ]);
  
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = (role?: Role) => {
    if (role) {
      setEditRole(role);
    } else {
      setEditRole(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditRole(null);
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be API calls to save the role
    handleCloseDialog();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Role Management</h2>
          <p className="text-gas-neutral-500 dark:text-gas-neutral-400">
            Define user roles and permissions
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Users</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gas-blue-500" />
                    {role.name}
                  </div>
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{role.permissions} permissions</Badge>
                </TableCell>
                <TableCell>{role.users} users</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(role)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editRole ? 'Edit Role' : 'Create New Role'}</DialogTitle>
            <DialogDescription>
              {editRole ? 'Modify role details and permissions' : 'Define a new role with specific permissions'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveRole}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  defaultValue={editRole?.name || ''} 
                  className="col-span-3" 
                  placeholder="Role name"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input 
                  id="description" 
                  defaultValue={editRole?.description || ''} 
                  className="col-span-3" 
                  placeholder="Brief description"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="permissions" className="text-right">Permissions</Label>
                <Input 
                  id="permissions" 
                  type="number" 
                  min="1"
                  defaultValue={editRole?.permissions || 1} 
                  className="col-span-3" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit">{editRole ? 'Save Changes' : 'Create Role'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
