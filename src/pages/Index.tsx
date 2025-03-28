
import React, { useState } from "react";
import SelectSearch, { SelectOption } from "@/components/SelectSearch";
import AddNewItemForm from "@/components/AddNewItemForm";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Example 1: Basic select with search
  const [fruit, setFruit] = useState<SelectOption | null>(null);
  const fruitOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "strawberry", label: "Strawberry" },
    { value: "blueberry", label: "Blueberry" },
    { value: "mango", label: "Mango" },
    { value: "pineapple", label: "Pineapple" },
  ];

  // Example 2: Select with add new option
  const [country, setCountry] = useState<SelectOption | null>(null);
  const [countries, setCountries] = useState<SelectOption[]>([
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "mx", label: "Mexico" },
    { value: "uk", label: "United Kingdom" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
  ]);

  // Example 3: Custom add component
  const [product, setProduct] = useState<SelectOption | null>(null);
  const [products, setProducts] = useState<SelectOption[]>([
    { value: "laptop", label: "Laptop" },
    { value: "smartphone", label: "Smartphone" },
    { value: "tablet", label: "Tablet" },
    { value: "headphones", label: "Headphones" },
    { value: "monitor", label: "Monitor" },
  ]);

  const handleAddCountry = (newCountry: string) => {
    const newValue = newCountry.trim();
    const newOption: SelectOption = {
      value: newValue.toLowerCase().replace(/\s+/g, "-"),
      label: newValue,
    };
    setCountries([...countries, newOption]);
    setCountry(newOption);
    toast.success(`Added new country: ${newValue}`);
  };

  const handleAddProduct = (name: string, category: string) => {
    const newOption: SelectOption = {
      value: name.toLowerCase().replace(/\s+/g, "-"),
      label: `${name}${category ? ` (${category})` : ""}`,
    };
    setProducts([...products, newOption]);
    setProduct(newOption);
    toast.success(`Added new product: ${name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SelectSearch Component</h1>
          <p className="text-gray-600">
            A reusable select component with search and add new item functionality
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <Tabs defaultValue="basic">
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Usage</TabsTrigger>
              <TabsTrigger value="add-new">Add New Item</TabsTrigger>
              <TabsTrigger value="custom">Custom Form</TabsTrigger>
              <TabsTrigger value="props">Props</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Basic Select with Search</h2>
              <p className="text-gray-600 mb-4">
                Type to search through the available options.
              </p>
              <div className="max-w-md">
                <SelectSearch
                  options={fruitOptions}
                  value={fruit}
                  onChange={setFruit}
                  placeholder="Select a fruit"
                />
              </div>
              {fruit && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
                  Selected: {fruit.label} (value: {fruit.value})
                </div>
              )}
            </TabsContent>

            <TabsContent value="add-new" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Select with Add New Item</h2>
              <p className="text-gray-600 mb-4">
                Click "Add new item" to add a custom entry to the dropdown.
              </p>
              <div className="max-w-md">
                <SelectSearch
                  options={countries}
                  value={country}
                  onChange={setCountry}
                  onAddNewItem={handleAddCountry}
                  placeholder="Select a country"
                />
              </div>
              {country && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
                  Selected: {country.label} (value: {country.value})
                </div>
              )}
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Custom Add Component</h2>
              <p className="text-gray-600 mb-4">
                Using a custom form component to add new items.
              </p>
              <div className="max-w-md">
                <SelectSearch
                  options={products}
                  value={product}
                  onChange={setProduct}
                  onAddNewItem={(name) => handleAddProduct(name, "")}
                  placeholder="Select a product"
                  renderAddComponent={
                    <AddNewItemForm
                      onSubmit={handleAddProduct}
                      onCancel={() => {}}
                    />
                  }
                />
              </div>
              {product && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
                  Selected: {product.label} (value: {product.value})
                </div>
              )}
            </TabsContent>

            <TabsContent value="props" className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Component Props</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Prop</th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Default</th>
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm">options</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-mono text-xs">SelectOption[]</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">-</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Array of options to display in the select</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm">value</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-mono text-xs">SelectOption | null</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">null</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Currently selected option</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm">onChange</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-mono text-xs">function</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">-</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Called when selection changes</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm">onAddNewItem</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-mono text-xs">function</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">undefined</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Called when adding a new item</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm">renderAddComponent</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-mono text-xs">ReactNode</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">undefined</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Custom component to render for adding items</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm">isSearchable</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-mono text-xs">boolean</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">true</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Whether to show search input</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm">disabled</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-mono text-xs">boolean</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">false</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Disables the select control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center">
          <a 
            href="https://github.com/yourusername/your-repo"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
