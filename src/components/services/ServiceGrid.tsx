import { Service } from "@/types";
import { ServiceCard } from "./ServiceCard";
import { MotionSection } from "@/components/shared/MotionSection";

interface ServiceGridProps {
  items: Service[];
}

export function ServiceGrid({ items }: ServiceGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {items.map((service, index) => (
        <MotionSection key={service.slug} delayMs={index * 80}>
          <ServiceCard service={service} />
        </MotionSection>
      ))}
    </div>
  );
}
