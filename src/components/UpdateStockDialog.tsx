import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  X,
  AlertCircle,
  FileText,
  Truck,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { useERPStore } from '../lib/data-store';

interface UpdateStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: any;
}

export function UpdateStockDialog({ open, onOpenChange, selectedItem }: UpdateStockDialogProps) {
  const [stockUpdate, setStockUpdate] = useState({
    additionalQuantity: '',
    vendorId: '',
    notes: '',
  });

  const { updateInventoryItem, vendors } = useERPStore();

  // Reset form when dialog opens
  useEffect(() => {
    if (open && selectedItem) {
      setStockUpdate({
        additionalQuantity: '',
        vendorId: selectedItem.vendorId || '',
        notes: '',
      });
    }
  }, [open, selectedItem]);

  const handleUpdateStock = () => {
    // Validation
    if (!stockUpdate.additionalQuantity) {
      toast.error('Please enter the additional stock quantity');
      return;
    }

    const additionalQuantity = parseInt(stockUpdate.additionalQuantity);
    if (isNaN(additionalQuantity) || additionalQuantity < 0) {
      toast.error('Please enter a valid quantity (0 or greater)');
      return;
    }

    // Calculate new total quantity
    const currentQuantity = selectedItem.quantity || 0;
    const newTotalQuantity = currentQuantity + additionalQuantity;

    // Update the inventory item
    updateInventoryItem(selectedItem.id, {
      quantity: newTotalQuantity,
      vendorId: stockUpdate.vendorId || selectedItem.vendorId,
      lastUpdate: new Date().toLocaleDateString(),
      lastUpdateTime: new Date().toLocaleTimeString(),
    });

    toast.success(`Stock updated successfully! Added ${additionalQuantity} ${selectedItem.quantityUnit}. New total: ${newTotalQuantity} ${selectedItem.quantityUnit}`);

    // Reset form and close dialog
    setStockUpdate({
      additionalQuantity: '',
      vendorId: '',
      notes: '',
    });

    onOpenChange(false);
  };

  const calculateNewTotal = () => {
    const currentQuantity = selectedItem?.quantity || 0;
    const additionalQuantity = parseInt(stockUpdate.additionalQuantity) || 0;
    return currentQuantity + additionalQuantity;
  };

  if (!selectedItem) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onOpenChange(false);
      }}
    >
      <DialogContent className="!max-w-2xl !w-2xl max-h-[90vh] overflow-hidden p-0 m-0 top-[5vh] translate-y-0 flex flex-col">
        {/* Header Section */}
        <div className="sticky top-0 z-50 px-8 py-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b-2 border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-semibold text-gray-900 mb-1">
                  Add New Stock
                </DialogTitle>
                <DialogDescription className="text-lg text-gray-600">
                  Add stock for {selectedItem.itemName}
                </DialogDescription>
              </div>
            </div>
            <Button
              onClick={() => onOpenChange(false)}
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Item Information Card */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedItem.itemName}</h3>
                  <p className="text-sm text-gray-600">{selectedItem.code} • {selectedItem.category}</p>
                  <p className="text-xs text-gray-500">{selectedItem.subCategory}</p>
                  {(selectedItem.brand || selectedItem.color) && (
                    <p className="text-xs text-blue-600">
                      {selectedItem.brand && `Brand: ${selectedItem.brand}`}
                      {selectedItem.brand && selectedItem.color && ' • '}
                      {selectedItem.color && `Color: ${selectedItem.color}`}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Stock</p>
                <p className="text-2xl font-bold text-gray-900">{selectedItem.quantity} <span className="text-lg font-normal text-gray-600">{selectedItem.quantityUnit}</span></p>
              </div>
            </div>
          </div>

          {/* Stock Update Form */}
          <div className="space-y-6">
            {/* New Stock Input - Highlighted */}
            <div className="space-y-4">
              <Label htmlFor="additionalQuantity" className="text-base font-semibold text-gray-700">
                Add New Stock Quantity *
              </Label>
              <div className="relative">
                <Plus className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                <Input
                  id="additionalQuantity"
                  type="number"
                  min="0"
                  value={stockUpdate.additionalQuantity}
                  onChange={(e) => setStockUpdate({ ...stockUpdate, additionalQuantity: e.target.value })}
                  placeholder="Enter quantity to add"
                  className="pl-12 h-16 text-lg border-3 border-blue-200 focus:border-blue-500 bg-blue-50 focus:bg-white font-semibold text-blue-900 placeholder:text-blue-400"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 font-semibold">
                  {selectedItem.quantityUnit}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Enter the quantity of new stock you want to add to the existing inventory
              </p>
            </div>

            {/* Stock Calculation Summary */}
            {stockUpdate.additionalQuantity && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-900">Stock Update Summary</h4>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-sm text-gray-600 mb-1">Current Stock</p>
                    <p className="text-xl font-bold text-gray-900">{selectedItem.quantity}</p>
                    <p className="text-xs text-gray-500">{selectedItem.quantityUnit}</p>
                  </div>
                  <div className="bg-green-100 rounded-lg p-4 border border-green-300">
                    <p className="text-sm text-green-700 mb-1">Adding</p>
                    <p className="text-xl font-bold text-green-900">+{stockUpdate.additionalQuantity}</p>
                    <p className="text-xs text-green-600">{selectedItem.quantityUnit}</p>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-4 border border-blue-300">
                    <p className="text-sm text-blue-700 mb-1">New Total</p>
                    <p className="text-xl font-bold text-blue-900">{calculateNewTotal()}</p>
                    <p className="text-xs text-blue-600">{selectedItem.quantityUnit}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Vendor Selection */}
            <div className="space-y-4">
              <Label htmlFor="vendorId" className="text-base font-semibold text-gray-700">
                Vendor / Supplier
              </Label>
              <Select
                value={stockUpdate.vendorId}
                onValueChange={(value) => setStockUpdate({ ...stockUpdate, vendorId: value })}
              >
                <SelectTrigger className="h-12 border-2 focus:border-blue-500">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.vendorName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600">
                Select the vendor who supplied this stock
              </p>
            </div>

            {/* Notes Section */}
            <div className="space-y-4">
              <Label htmlFor="notes" className="text-base font-semibold text-gray-700">
                Notes & Comments
              </Label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <Textarea
                  id="notes"
                  value={stockUpdate.notes}
                  onChange={(e) => setStockUpdate({ ...stockUpdate, notes: e.target.value })}
                  placeholder="Add notes about this stock update (supplier, batch number, quality notes, etc.)"
                  rows={4}
                  className="pl-12 pt-4 text-base border-2 focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 px-8 py-6 flex justify-between items-center shadow-lg">
          

          <div className="flex items-center gap-4 ml-auto">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onOpenChange(false)}
              className="px-8 py-3 text-base border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStock}
              size="lg"
              className="px-8 py-3 text-base bg-blue-600 hover:bg-blue-700"
              disabled={!stockUpdate.additionalQuantity}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Stock
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}