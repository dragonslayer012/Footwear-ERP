import React, { useState } from "react";
import {
  Plus,
  Target,
  Calculator,
  Users,
  AlertCircle,
  CheckCircle,
  Workflow,
  Clock,
  IndianRupee,
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { useERPStore } from "../lib/data-store";

interface NewProject {
  projectName: string;
  company: string;
  brand: string;
  collection: string;
  category: string;
  productType: string;
  country: string;
  type: string;
  targetCost: string;
  retailPrice: string;
  upperMaterial: string;
  soleType: string;
  heelHeight: string;
  description: string;
  priority: string;
  taskInc: string;
  assignedTeam: string[];
  targetDate: string;
  requirements: string;
}

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateProjectDialog({
  open,
  onClose,
}: CreateProjectDialogProps) {
  const { companies, brands, categories, countries, types, rdProjects } = useERPStore();

  const [newProject, setNewProject] = useState<NewProject>({
    projectName: "",
    company: "",
    brand: "",
    collection: "",
    category: "",
    productType: "",
    country: "",
    type: "",
    targetCost: "",
    retailPrice: "",
    upperMaterial: "",
    soleType: "",
    heelHeight: "",
    description: "",
    priority: "",
    taskInc: "",
    assignedTeam: [],
    targetDate: "",
    requirements: "",
  });

  const [companyOpen, setCompanyOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [taskIncOpen, setTaskIncOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);

  // Image upload states
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const coverInputRef = React.useRef<HTMLInputElement>(null);
  const additionalInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Filter brands and categories based on selected company
  const filteredBrands = newProject.company
    ? brands.filter((brand) => brand.companyId === newProject.company)
    : [];

  const filteredCategories = newProject.company
    ? categories.filter((cat) => cat.companyId === newProject.company)
    : [];

  // Get unique task assignees from existing projects
  const getUniqueTaskAssignees = () => {
    const uniqueNames = [
      ...new Set(
        rdProjects
          .map((project) => project.taskInc)
          .filter(Boolean),
      ),
    ];
    // Add additional predefined names that aren't in the current projects
    const additionalNames = [
      "John Doe",
      "Sarah Wilson",
      "Mike Chen",
    ];
    const allNames = [...uniqueNames, ...additionalNames];
    // Remove duplicates and sort alphabetically
    return [...new Set(allNames)].sort();
  };

  const generateProjectCode = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const month = (now.getMonth() + 1)
      .toString()
      .padStart(2, "0");

    // Extract current year projects to get max number
    const currentYearPrefix = `RND/${currentYear.toString().slice(-2)}-${nextYear.toString().slice(-2)}/${month}/`;
    const currentYearProjects = rdProjects.filter((p) =>
      p.autoCode.startsWith(currentYearPrefix),
    );

    const maxNum =
      currentYearProjects.length > 0
        ? Math.max(
            ...currentYearProjects.map((p) => {
              const parts = p.autoCode.split("/");
              return parseInt(parts[3]) || 0;
            }),
          )
        : 100; // Start from 101

    return `RND/${currentYear.toString().slice(-2)}-${nextYear.toString().slice(-2)}/${month}/${(maxNum + 1).toString().padStart(3, "0")}`;
  };

  // Image upload handlers
  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhoto(reader.result as string);
        toast.success("Cover photo uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...additionalImages];
        newImages[index] = reader.result as string;
        setAdditionalImages(newImages);
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverPhoto = () => {
    setCoverPhoto(null);
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newImages = [...additionalImages];
    newImages[index] = "";
    setAdditionalImages(newImages);
    if (additionalInputRefs.current[index]) {
      additionalInputRefs.current[index]!.value = "";
    }
  };

  const handleCreateProject = async () => {
    if (
      !newProject.projectName ||
      !newProject.brand ||
      !newProject.category
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Mock project creation - in real app this would call addRDProject
    toast.success("R&D Project created successfully!");

    // Reset form
    setNewProject({
      projectName: "",
      company: "",
      brand: "",
      collection: "",
      category: "",
      productType: "",
      country: "",
      type: "",
      targetCost: "",
      retailPrice: "",
      upperMaterial: "",
      soleType: "",
      heelHeight: "",
      description: "",
      priority: "",
      taskInc: "",
      assignedTeam: [],
      targetDate: "",
      requirements: "",
    });

    // Reset images
    setCoverPhoto(null);
    setAdditionalImages([]);

    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="!max-w-[96vw] !w-[96vw] max-h-[95vh] overflow-hidden p-0 m-0 top-[2.5vh] translate-y-0 flex flex-col">
        {/* Sticky Header Section */}
        <div className="sticky top-0 z-50 px-12 py-8 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b-2 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0c9dcb] to-[#26b4e0] rounded-xl flex items-center justify-center shadow-lg">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-4xl font-semibold text-gray-900 mb-2">
                  Create New R&D Project
                </DialogTitle>
                <DialogDescription className="text-xl text-gray-600">
                  Initialize a comprehensive footwear design and
                  development project with full project
                  management capabilities
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl px-8 py-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <div className="text-right">
                    <p className="text-base text-blue-600 font-semibold">
                      Auto-Generated Project Code
                    </p>
                    <p className="text-2xl font-mono font-bold text-blue-800">
                      {generateProjectCode()}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={onClose}
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
          <div className="px-12 py-10 space-y-12">
            {/* Product Development Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Product Development Information
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-6 gap-8">
                {/* First Row - 6 columns */}
                {/* 1. Art/Colour Name */}
                <div className="space-y-4">
                  <Label
                    htmlFor="artColour"
                    className="text-base font-semibold text-gray-700"
                  >
                    Art/Colour Name *
                  </Label>
                  <Input
                    id="artColour"
                    value={newProject.projectName}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        projectName: e.target.value,
                      })
                    }
                    placeholder="e.g., Midnight Black Runner, Ocean Blue Casual"
                    className="h-12 text-base border-2 focus:border-[#0c9dcb]"
                  />
                </div>

                {/* 2. Product Code */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-700">
                    Product Code
                  </Label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg h-12">
                    <span className="text-base font-mono font-bold text-gray-900">
                      {generateProjectCode()}
                    </span>
                  </div>
                </div>

                {/* 3. Company */}
                <div className="space-y-4">
                  <Label
                    htmlFor="company"
                    className="text-base font-semibold text-gray-700"
                  >
                    Company *
                  </Label>
                  <Popover
                    open={companyOpen}
                    onOpenChange={setCompanyOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={companyOpen}
                        className="w-full h-12 justify-between hover:bg-transparent data-[state=open]:border-[#0c9dcb]"
                      >
                        {newProject.company
                          ? companies.find(
                              (company) =>
                                company.id === newProject.company,
                            )?.companyName
                          : "Select company"}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-50"
                        >
                          <path
                            d="m4.93179 5.43179c.20081-.20081.52632-.20081.72713 0l2.34108 2.34108 2.34108-2.34108c.20081-.20081.52632-.20081.72713 0 .20081.20081.20081.52632 0 .72713l-2.70711 2.70711c-.20081.20081-.52632.20081-.72713 0l-2.70711-2.70711c-.20081-.20081-.20081-.52632 0-.72713z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search companies..."
                          className="h-9"
                        />
                        <CommandEmpty>
                          No company found.
                        </CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {companies.map((company) => (
                            <CommandItem
                              key={company.id}
                              value={company.companyName}
                              onSelect={() => {
                                setNewProject({
                                  ...newProject,
                                  company: company.id,
                                  brand: "",
                                  category: "",
                                });
                                setCompanyOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  newProject.company === company.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {company.companyName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 4. Brand */}
                <div className="space-y-4">
                  <Label
                    htmlFor="brand"
                    className="text-base font-semibold text-gray-700"
                  >
                    Brand *
                  </Label>
                  <Popover
                    open={brandOpen}
                    onOpenChange={setBrandOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={brandOpen}
                        disabled={!newProject.company}
                        className="w-full h-12 justify-between hover:bg-transparent data-[state=open]:border-[#0c9dcb] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {newProject.brand
                          ? filteredBrands.find(
                              (brand) =>
                                brand.id === newProject.brand,
                            )?.brandName
                          : newProject.company ? "Select brand" : "Select company first"}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-50"
                        >
                          <path
                            d="m4.93179 5.43179c.20081-.20081.52632-.20081.72713 0l2.34108 2.34108 2.34108-2.34108c.20081-.20081.52632-.20081.72713 0 .20081.20081.20081.52632 0 .72713l-2.70711 2.70711c-.20081.20081-.52632.20081-.72713 0l-2.70711-2.70711c-.20081-.20081-.20081-.52632 0-.72713z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search brands..."
                          className="h-9"
                        />
                        <CommandEmpty>
                          No brand found.
                        </CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {filteredBrands.map((brand) => (
                            <CommandItem
                              key={brand.id}
                              value={brand.brandName}
                              onSelect={() => {
                                setNewProject({
                                  ...newProject,
                                  brand: brand.id,
                                });
                                setBrandOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  newProject.brand === brand.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {brand.brandName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 5. Footwear Category */}
                <div className="space-y-4">
                  <Label
                    htmlFor="category"
                    className="text-base font-semibold text-gray-700"
                  >
                    Footwear Category *
                  </Label>
                  <Popover
                    open={categoryOpen}
                    onOpenChange={setCategoryOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={categoryOpen}
                        disabled={!newProject.company}
                        className="w-full h-12 justify-between hover:bg-transparent data-[state=open]:border-[#0c9dcb]"
                      >
                        {newProject.category
                          ? filteredCategories.find(
                              (category) =>
                                category.id ===
                                newProject.category,
                            )?.categoryName
                          : newProject.company ? "Select category" : "Select company first"}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-50"
                        >
                          <path
                            d="m4.93179 5.43179c.20081-.20081.52632-.20081.72713 0l2.34108 2.34108 2.34108-2.34108c.20081-.20081.52632-.20081.72713 0 .20081.20081.20081.52632 0 .72713l-2.70711 2.70711c-.20081.20081-.52632.20081-.72713 0l-2.70711-2.70711c-.20081-.20081-.20081-.52632 0-.72713z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandEmpty>
                          No category found.
                        </CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {filteredCategories.map((category) => (
                            <CommandItem
                              key={category.id}
                              value={category.categoryName}
                              onSelect={() => {
                                setNewProject({
                                  ...newProject,
                                  category: category.id,
                                });
                                setCategoryOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  newProject.category ===
                                  category.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {category.categoryName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 6. Type */}
                <div className="space-y-4">
                  <Label
                    htmlFor="type"
                    className="text-base font-semibold text-gray-700"
                  >
                    Type *
                  </Label>
                  <Popover
                    open={typeOpen}
                    onOpenChange={setTypeOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={typeOpen}
                        className="w-full h-12 justify-between hover:bg-transparent data-[state=open]:border-[#0c9dcb]"
                      >
                        {newProject.type
                          ? types.find(
                              (type) =>
                                type.id === newProject.type,
                            )?.typeName
                          : "Select type"}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-50"
                        >
                          <path
                            d="m4.93179 5.43179c.20081-.20081.52632-.20081.72713 0l2.34108 2.34108 2.34108-2.34108c.20081-.20081.52632-.20081.72713 0 .20081.20081.20081.52632 0 .72713l-2.70711 2.70711c-.20081.20081-.52632.20081-.72713 0l-2.70711-2.70711c-.20081-.20081-.20081-.52632 0-.72713z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search types..."
                          className="h-9"
                        />
                        <CommandEmpty>
                          No type found.
                        </CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {types.map((type) => (
                            <CommandItem
                              key={type.id}
                              value={type.typeName}
                              onSelect={() => {
                                setNewProject({
                                  ...newProject,
                                  type: type.id,
                                });
                                setTypeOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  newProject.type === type.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {type.typeName} ({type.usageArea})
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Second Row - 4 columns + 2 empty */}
                {/* 7. Country */}
                <div className="space-y-4">
                  <Label
                    htmlFor="country"
                    className="text-base font-semibold text-gray-700"
                  >
                    Country *
                  </Label>
                  <Popover
                    open={countryOpen}
                    onOpenChange={setCountryOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={countryOpen}
                        className="w-full h-12 justify-between hover:bg-transparent data-[state=open]:border-[#0c9dcb]"
                      >
                        {newProject.country
                          ? countries.find(
                              (country) =>
                                country.id === newProject.country,
                            )?.countryName
                          : "Select country"}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-50"
                        >
                          <path
                            d="m4.93179 5.43179c.20081-.20081.52632-.20081.72713 0l2.34108 2.34108 2.34108-2.34108c.20081-.20081.52632-.20081.72713 0 .20081.20081.20081.52632 0 .72713l-2.70711 2.70711c-.20081.20081-.52632.20081-.72713 0l-2.70711-2.70711c-.20081-.20081-.20081-.52632 0-.72713z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search countries..."
                          className="h-9"
                        />
                        <CommandEmpty>
                          No country found.
                        </CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {countries.map((country) => (
                            <CommandItem
                              key={country.id}
                              value={country.countryName}
                              onSelect={() => {
                                setNewProject({
                                  ...newProject,
                                  country: country.id,
                                });
                                setCountryOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  newProject.country === country.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {country.countryName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 8. Size Range */}
                <div className="space-y-4">
                  <Label
                    htmlFor="sizeRange"
                    className="text-base font-semibold text-gray-700"
                  >
                    Size Range *
                  </Label>
                  <Input
                    id="sizeRange"
                    type="text"
                    value={newProject.collection}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        collection: e.target.value,
                      })
                    }
                    placeholder="e.g., Men's: 6-12 UK, Women's: 3-9 UK"
                    className="h-12 text-base border-2 focus:border-[#0c9dcb]"
                  />
                </div>

                {/* 9. Target Gender */}
                <div className="space-y-4">
                  <Label
                    htmlFor="gender"
                    className="text-base font-semibold text-gray-700"
                  >
                    Target Gender
                  </Label>
                  <Select
                    value={newProject.productType}
                    onValueChange={(value) =>
                      setNewProject({
                        ...newProject,
                        productType: value,
                      })
                    }
                  >
                    <SelectTrigger className="h-12 border-2 focus:border-[#0c9dcb]">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Men">
                        Men's Collection
                      </SelectItem>
                      <SelectItem value="Women">
                        Women's Collection
                      </SelectItem>
                      <SelectItem value="Kids">
                        Kids Collection
                      </SelectItem>
                      <SelectItem value="Unisex">
                        Unisex Collection
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 10. Priority */}
                <div className="space-y-4">
                  <Label
                    htmlFor="priority"
                    className="text-base font-semibold text-gray-700"
                  >
                    Priority *
                  </Label>
                  <Popover
                    open={priorityOpen}
                    onOpenChange={setPriorityOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={priorityOpen}
                        className="w-full h-12 justify-between hover:bg-transparent data-[state=open]:border-[#0c9dcb]"
                      >
                        {newProject.priority || "Select priority"}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-50"
                        >
                          <path
                            d="m4.93179 5.43179c.20081-.20081.52632-.20081.72713 0l2.34108 2.34108 2.34108-2.34108c.20081-.20081.52632-.20081.72713 0 .20081.20081.20081.52632 0 .72713l-2.70711 2.70711c-.20081.20081-.52632.20081-.72713 0l-2.70711-2.70711c-.20081-.20081-.20081-.52632 0-.72713z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandGroup>
                          {['High', 'Medium', 'Low'].map((priority) => (
                            <CommandItem
                              key={priority}
                              value={priority}
                              onSelect={() => {
                                setNewProject({
                                  ...newProject,
                                  priority: priority,
                                });
                                setPriorityOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  newProject.priority === priority
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {priority}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Empty columns */}
                <div className="xl:col-span-2"></div>

                {/* Third Row - Product Description */}
                <div className="xl:col-span-6 space-y-4">
                  <Label
                    htmlFor="description"
                    className="text-base font-semibold text-gray-700"
                  >
                    Product Design Brief & Features
                  </Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe the product design concept, key features, comfort elements, aesthetic details, target use cases, unique selling points, and any special technologies or innovations being incorporated..."
                    rows={4}
                    className="resize-none text-base border-2 focus:border-[#0c9dcb] leading-relaxed"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-10" />

            {/* Image & Profile Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Image & Profile
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Cover Photo Upload */}
                <div>
                  <Label className="text-base font-semibold text-gray-700 mb-4 block">
                    Cover Photo
                  </Label>
                  <div className="flex items-center gap-4">
                    {/* Cover Photo Upload Area */}
                    <div className="flex-shrink-0">
                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverPhotoUpload}
                      />
                      {coverPhoto ? (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden group">
                          <img
                            src={coverPhoto}
                            alt="Cover"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={removeCoverPhoto}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => coverInputRef.current?.click()}
                          className="w-32 h-32 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-all cursor-pointer group flex flex-col items-center justify-center gap-2"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <ImageIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="text-center px-2">
                            <p className="text-xs font-medium text-gray-700">Cover Photo</p>
                            <p className="text-xs text-blue-600">Upload</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Additional Images - Horizontal Row */}
                    <div className="flex items-center gap-3 flex-wrap">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i}>
                          <input
                            ref={(el) => {
                              if (additionalInputRefs.current) {
                                additionalInputRefs.current[i] = el;
                              }
                            }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleAdditionalImageUpload(e, i)}
                          />
                          {additionalImages[i] ? (
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden group">
                              <img
                                src={additionalImages[i]}
                                alt={`Additional ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeAdditionalImage(i)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => additionalInputRefs.current[i]?.click()}
                              className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all cursor-pointer flex items-center justify-center group"
                            >
                              <Upload className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Guidelines */}

              </div>
            </div>

            <Separator className="my-10" />

            {/* Cost & Timeline Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Cost Structure & Development Timeline
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Cost Fields */}
                <div className="space-y-4">
                  <Label
                    htmlFor="targetCost"
                    className="text-base font-semibold text-gray-700"
                  >
                    Target Production Cost (₹) *
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="targetCost"
                      type="number"
                      value={newProject.targetCost}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          targetCost: e.target.value,
                        })
                      }
                      placeholder="0"
                      className="pl-12 h-12 text-base border-2 focus:border-[#0c9dcb]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="retailPrice"
                    className="text-base font-semibold text-gray-700"
                  >
                    Target Retail Price (₹)
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="retailPrice"
                      type="number"
                      value={newProject.retailPrice}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          retailPrice: e.target.value,
                        })
                      }
                      placeholder="0"
                      className="pl-12 h-12 text-base border-2 focus:border-[#0c9dcb]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="targetDate"
                    className="text-base font-semibold text-gray-700"
                  >
                    Red Seal Target Date
                  </Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={newProject.targetDate}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        targetDate: e.target.value,
                      })
                    }
                    className="h-12 text-base border-2 focus:border-[#0c9dcb]"
                    style={{
                      colorScheme: "light",
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="taskInc"
                    className="text-base font-semibold text-gray-700"
                  >
                    Task-INC (Assigned Person)
                  </Label>
                  <Popover
                    open={taskIncOpen}
                    onOpenChange={setTaskIncOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={taskIncOpen}
                        className="w-full h-12 border-2 focus:border-[#0c9dcb] justify-between hover:bg-transparent data-[state=open]:border-[#0c9dcb] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {newProject.taskInc ||
                          "e.g., Priyanka, John Doe"}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 opacity-50"
                        >
                          <path
                            d="m4.93179 5.43179c.20081-.20081.52632-.20081.72713 0l2.34108 2.34108 2.34108-2.34108c.20081-.20081.52632-.20081.72713 0 .20081.20081.20081.52632 0 .72713l-2.70711 2.70711c-.20081.20081-.52632.20081-.72713 0l-2.70711-2.70711c-.20081-.20081-.20081-.52632 0-.72713z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[--radix-popover-trigger-width] p-0"
                      side="bottom"
                      align="start"
                      sideOffset={4}
                    >
                      <Command>
                        <CommandInput
                          placeholder="Search or type new name..."
                          className="h-9"
                        />
                        <CommandEmpty>
                          <div className="p-2 text-sm text-muted-foreground">
                            No existing assignee found. Type to
                            add new name.
                          </div>
                        </CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {getUniqueTaskAssignees().map(
                            (assignee) => (
                              <CommandItem
                                key={assignee}
                                value={assignee}
                                onSelect={() => {
                                  setNewProject({
                                    ...newProject,
                                    taskInc: assignee,
                                  });
                                  setTaskIncOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    newProject.taskInc ===
                                    assignee
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                {assignee}
                              </CommandItem>
                            ),
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 px-12 py-8 flex justify-between items-center shadow-lg z-50">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-base font-semibold text-gray-900">
                Ready to Create Your R&D Project?
              </p>
              <p className="text-sm text-gray-600">
                Double-check all required fields marked with *
                before submission
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-base border-2 hover:bg-gray-50"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateProject}
              size="lg"
              className="px-8 py-3 text-base bg-[#0c9dcb] hover:bg-[#0c9dcb]/90"
              type="button"
            >
              <Plus className="w-5 h-5 mr-3" />
              Create R&D Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}