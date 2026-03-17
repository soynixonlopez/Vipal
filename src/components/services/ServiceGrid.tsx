import { Service } from "@/types";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  items: Service[];
}

export function ServiceGrid({ items }: ServiceGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {items.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
