import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  title: string
  image: string
  category: string
  colors: number
  minOrder: number
}

export function ProductCard({ title, image, category, colors, minOrder }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden cursor-pointer">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={image}
            alt={title}
            
            className="w-full object-center object-cover aspect-4/3 transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-4 text-white h-full flex flex-col justify-end">
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <div className="space-y-1">
                <p className="text-sm">Available Colors: {colors}</p>
                <p className="text-sm">Minimum Order: {minOrder} pairs</p>
                <Badge variant="secondary" className="mt-2">
                  {category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
