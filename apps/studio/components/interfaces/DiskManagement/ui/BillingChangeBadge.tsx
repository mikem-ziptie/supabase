import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

import { formatCurrency } from 'lib/helpers'
import { Badge, cn, Tooltip, TooltipContent, TooltipTrigger } from 'ui'

interface BillingChangeBadgeProps {
  beforePrice?: number
  afterPrice?: number
  show: boolean | undefined
  tooltip?: string
  className?: string
  free?: boolean
}

const BillingChangeBadge = ({
  beforePrice,
  afterPrice,
  show,
  tooltip,
  className,
  free,
}: BillingChangeBadgeProps) => {
  return (
    <AnimatePresence>
      {beforePrice !== undefined && afterPrice !== undefined && show && (
        <motion.div
          initial={{ opacity: 0, x: -4, height: 0 }}
          animate={{ opacity: 1, x: 0, height: 'auto' }}
          exit={{ opacity: 0, x: -4, height: 0 }}
          transition={{ type: 'spring', stiffness: 800, damping: 40, duration: 0.3 }}
        >
          <Badge
            variant="default"
            className={cn(
              !free ? `bg-alternative` : `bg-violet-200 border-violet-900 text-violet-1100`,
              `bg-opacity-100 text-warning`,
              className
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-mono text-foreground-muted" translate="no">
                    {formatCurrency(beforePrice)}
                  </span>
                  <ChevronRight size={12} strokeWidth={2} className="text-foreground-muted" />
                  <motion.span
                    key={afterPrice} // This key will change whenever any form value changes
                    className={cn(
                      free ? 'text-violet-1100' : 'text-foreground',
                      'text-xs font-mono'
                    )}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.12 }}
                    translate="no"
                  >
                    {`${formatCurrency(afterPrice)}/month`}
                  </motion.span>
                </div>
              </TooltipTrigger>
              {tooltip !== undefined && <TooltipContent side="bottom">{tooltip}</TooltipContent>}
            </Tooltip>
          </Badge>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { BillingChangeBadge }
