import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const metricCardVariants = cva(
  "transition-all duration-200 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        primary: "border-primary/20 bg-primary/5",
        secondary: "border-secondary/20 bg-secondary/5",
        accent: "border-accent/20 bg-accent/5",
        muted: "border-muted/20 bg-muted/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
    isPositive?: boolean
  }
  loading?: boolean
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ 
    className, 
    variant, 
    title, 
    value, 
    description, 
    icon, 
    trend, 
    loading = false,
    ...props 
  }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(metricCardVariants({ variant, className }))}
        {...props}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && (
            <div className="h-4 w-4 text-muted-foreground">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {loading ? (
              <div className="h-8 w-20 bg-muted animate-pulse rounded" />
            ) : (
              <div className="text-2xl font-bold text-foreground">
                {value}
              </div>
            )}
            
            {trend && !loading && (
              <div className="flex items-center space-x-1 text-xs">
                <span
                  className={cn(
                    "font-medium",
                    trend.isPositive 
                      ? "text-primary" 
                      : "text-destructive"
                  )}
                >
                  {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
                </span>
                <span className="text-muted-foreground">{trend.label}</span>
              </div>
            )}
            
            {description && !loading && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
MetricCard.displayName = "MetricCard"

export { MetricCard, metricCardVariants }
