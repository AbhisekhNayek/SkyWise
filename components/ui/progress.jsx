"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(
  (props, ref) => {
    const { className, value, ...rest } = props;
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-3 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...rest}
      >
        <ProgressPrimitive.Indicator
          className="h-3 w-3 flex-1 rounded-full bg-primary shadow-lg shadow-white ring-2 dark:ring-gray-500"
          style={{ marginLeft: `calc(${value}% - 0.8rem)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
