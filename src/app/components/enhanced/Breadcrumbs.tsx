import { Fragment } from 'react';
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 flex-wrap">
        {/* Home */}
        <li>
          <motion.button
            onClick={() => onNavigate?.("/")}
            className="flex items-center gap-1 text-sm text-zinc-600 hover:text-[#fabf37] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </motion.button>
        </li>

        {/* Items */}
        {items.map((item, index) => (
          <Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
            <li>
              {index === items.length - 1 ? (
                <span className="text-sm font-bold text-zinc-900">{item.label}</span>
              ) : (
                <motion.button
                  onClick={() => item.path && onNavigate?.(item.path)}
                  className="text-sm text-zinc-600 hover:text-[#fabf37] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
