import { Users, ShoppingBag, Star, Trophy } from 'lucide-react'
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface MetricCardProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  targetValue: number;
}

export function SuccessMetrics() {
  const metrics = [
    { icon: Users, label: "Happy Clients", value: 12 },
    { icon: ShoppingBag, label: "Shoes Delivered", value: 363 },
    { icon: Star, label: "Average Rating", value: 4.9 },
    { icon: Trophy, label: "Years of Excellence", value: 10 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {metrics.map(({ icon: Icon, label, value }) => (
        <MetricCard key={label} Icon={Icon} label={label} targetValue={value} />
      ))}
    </div>
  );
}

function MetricCard({ Icon, label, targetValue }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount:"all" });
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    if (isInView) {
      let increment: number;
      let delay: number;

      // Define increment and delay based on the target value
      if (targetValue <= 200) {
        increment = Math.ceil(targetValue / 50); // Adjust speed for smaller values
        delay = 200; // Slower interval for small numbers
      } else {
        increment = Math.ceil(targetValue / 20); // Adjust speed for larger values
        delay = 100; // Faster interval for larger numbers
      }

      let start = 0;
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          clearInterval(timer);
          setCurrentValue(targetValue); // Ensure the final value is set correctly
        } else {
          setCurrentValue(start);
        }
      }, delay); // Apply the appropriate delay

      return () => clearInterval(timer); // Cleanup on unmount or change
    }
  }, [isInView, targetValue]);

  return (
    <div ref={ref} className="text-center">
      <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
      <div className="text-2xl font-bold">{currentValue}+</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}
