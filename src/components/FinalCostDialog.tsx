import React, { useState, useEffect } from 'react';
import { Calculator, IndianRupee, CheckCircle, ArrowRight, X, AlertTriangle } from 'lucide-react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogPortal, DialogOverlay } from './ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog@1.1.6';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { useERPStore } from '../lib/data-store';
import type { RDProject } from '../lib/data-store';
import { cn } from './ui/utils';

interface FinalCostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: RDProject | null;
  onApproved?: () => void;
}

export function FinalCostDialog({ open, onOpenChange, project, onApproved }: FinalCostDialogProps) {
  const { updateRDProject } = useERPStore();
  const [finalCost, setFinalCost] = useState<number>(0);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    if (project && open) {
      // Initialize with existing final cost or a calculated estimate
      setFinalCost(project.finalCost || project.tentativeCost * 1.05);
    }
  }, [project, open]);

  if (!project) return null;

  const tentativeCost = project.tentativeCost || 0;
  const targetCost = project.targetCost || 0;
  const difference = finalCost - targetCost;
  const tentativeDifference = finalCost - tentativeCost;

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const handleApprove = async () => {
    if (finalCost <= 0) {
      toast.error('Please enter a valid final cost');
      return;
    }

    setIsApproving(true);
    
    try {
      // Update project with final cost and advance to Green Seal
      const updatedProject = {
        ...project,
        finalCost: finalCost,
        difference: difference,
        status: 'Green Seal',
        lastModified: new Date().toISOString()
      };

      updateRDProject(project.id, updatedProject);
      
      toast.success('Final cost approved! Project advanced to Green Seal stage.');
      
      // Close dialog and notify parent
      onOpenChange(false);
      if (onApproved) {
        onApproved();
      }
    } catch (error) {
      toast.error('Failed to approve final cost');
    } finally {
      setIsApproving(false);
    }
  };

  const getDifferenceColor = (diff: number) => {
    if (diff > 0) return 'text-red-600';
    if (diff < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const getDifferenceIcon = (diff: number) => {
    if (diff > 0) return <AlertTriangle className="w-4 h-4 text-red-600" />;
    if (diff < 0) return <CheckCircle className="w-4 h-4 text-green-600" />;
    return <CheckCircle className="w-4 h-4 text-gray-600" />;
  };

  // Custom DialogContent without built-in close button
  const CustomDialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
  >(({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  ));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <CustomDialogContent className="max-w-2xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Final Cost Approval
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mt-1">
                  {project.autoCode} • Advance to Green Seal Stage
                </DialogDescription>
              </div>
            </div>
            <Button 
              onClick={() => onOpenChange(false)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Cost Overview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Cost Overview</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Tentative Cost</span>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {formatCurrency(tentativeCost)}
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">Target Cost (BTC)</span>
                </div>
                <div className="text-xl font-bold text-purple-600">
                  {formatCurrency(targetCost)}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Final Cost Input */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Final Cost Entry</h3>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Enter Final Cost (₹)
              </Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="number"
                  value={finalCost}
                  onChange={(e) => setFinalCost(Number(e.target.value))}
                  className="pl-10 text-lg font-medium"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Real-time Calculations */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {getDifferenceIcon(tentativeDifference)}
                  <span className="text-sm font-medium text-gray-700">vs Tentative</span>
                </div>
                <div className={`text-lg font-bold ${getDifferenceColor(tentativeDifference)}`}>
                  {tentativeDifference >= 0 ? '+' : ''}{formatCurrency(tentativeDifference)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {tentativeDifference > 0 ? 'Over tentative' : tentativeDifference < 0 ? 'Under tentative' : 'Equal to tentative'}
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {getDifferenceIcon(difference)}
                  <span className="text-sm font-medium text-gray-700">vs Target</span>
                </div>
                <div className={`text-lg font-bold ${getDifferenceColor(difference)}`}>
                  {difference >= 0 ? '+' : ''}{formatCurrency(difference)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {difference > 0 ? 'Over budget' : difference < 0 ? 'Under budget' : 'On budget'}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Final Cost Summary */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-emerald-700">Final Approved Cost</span>
              <Badge className={`${difference <= 0 ? 'bg-green-600' : 'bg-orange-500'} text-white`}>
                {difference <= 0 ? 'Within Budget' : 'Over Budget'}
              </Badge>
            </div>
            <div className="text-2xl font-bold text-emerald-600">
              {formatCurrency(finalCost)}
            </div>
            <div className="text-sm text-emerald-600 mt-1">
              Ready for Green Seal approval
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              onClick={() => onOpenChange(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleApprove}
              disabled={finalCost <= 0 || isApproving}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              {isApproving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Approving...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Advance to Green Seal
                </>
              )}
            </Button>
          </div>
        </div>
      </CustomDialogContent>
    </Dialog>
  );
}