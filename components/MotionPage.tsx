import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type MotionPageProps = PropsWithChildren<{
  className?: string;
}>;

export default function MotionPage({ children, className }: MotionPageProps) {
  return <div className={cn(className)}>{children}</div>;
}
