
import { Smartphone, Apple, Smartphone as SamsungIcon, Smartphone as GoogleIcon, Smartphone as OnePlusIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Define brand icons mapping
export const brandIcons: Record<string, LucideIcon> = {
  "Apple": Apple,
  "Samsung": SamsungIcon,
  "Google": GoogleIcon,
  "OnePlus": OnePlusIcon,
  "default": Smartphone
};
