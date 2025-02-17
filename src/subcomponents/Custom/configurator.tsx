'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Palette, Box, Ruler } from 'lucide-react'
import  SizeGuideTab  from './size-guide-tab.tsx'
import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"

export function Configurator() {
  // const [activeTab, setActiveTab] = useState('logo')
  const [selectedSize, setSelectedSize] = useState<number| null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    if (hexColorRegex.test(value) || value === "") {
      // Valid Hex color or empty input
      setSelectedColor(value);
      setError(null);
    } else {
      // Invalid Hex color
      setError("Please enter a valid Hex color code!");
    }
  };

  const colorMap:Record<string, string> = {
    'bg-red-500': 'Red',
    'bg-blue-500': 'Blue',
    'bg-green-500': 'Green',
    'bg-yellow-500': 'Yellow',
    'bg-purple-500': 'Purple',
    'bg-orange-500': 'Orange',
  }

  const handleSizeChange = (size: number|null) => 
    setSelectedSize(size);
  console.log(selectedSize)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="logo" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logo" >
            <Upload className="h-4 w-4 mr-2" />
            Logo
          </TabsTrigger>
          <TabsTrigger value="colors" >
            <Palette className="h-4 w-4 mr-2" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="packaging" >
            <Box className="h-4 w-4 mr-2" />
            Packaging
          </TabsTrigger>
          <TabsTrigger value="size" >
            <Ruler className="h-4 w-4 mr-2" />
            Size
          </TabsTrigger>
        </TabsList>
        <TabsContent value="logo" className="p-4">
          <div className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="logo">Upload Logo</Label>
              <Input id="logo" type="file" accept="image/*" />
            </div>
            <div className="grid w-full gap-2">
              <Label>Logo Placement</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">Left Side</Button>
                <Button variant="outline">Right Side</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="colors" className="p-4">
          <div className="space-y-4">
            <div className="grid w-full gap-2">
              <Label>Select Color</Label>
              <div className="grid grid-cols-6 gap-2">
                {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-orange-500'].map((color) => (
                  <Button
                    key={color}
                    variant="outline"
                    className={`w-full h-12 ${color}`}
                    onClick={() => setSelectedColor(color) }
                  />
                ))}
              </div>
              {selectedColor && (<p className='font-semibold'>Colour Selected: <span className='font-normal'>{colorMap[selectedColor]}</span></p>)}
              <div className='pt-3'>
      <label className="pr-2">
        Want custom color? Enter color code in Hex format:
      </label>
      <input
        onChange={handleChange}
        className="bg-gray-100 w-28"
        placeholder="#FFFFFF"
      />
      {error && <p className="text-red-500 font-semibold">{error}</p>}
    </div>             
            </div>
          </div>
        </TabsContent>
        <TabsContent value="packaging" className="p-4">
          <div className="space-y-4">
            <div className="grid w-full gap-2">
              <Label>Box Style</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button value={"Standard"} variant="outline">Standard</Button>
                <Button value={"Premium"} variant="outline">Premium</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="size" className="p-4">
          <SizeGuideTab handleSize={handleSizeChange}/>
          {selectedSize && (
            <p className="mt-4 text-sm text-gray-600">Selected Size: {selectedSize}</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

