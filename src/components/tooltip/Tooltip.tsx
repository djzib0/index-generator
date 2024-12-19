'use client'

// styles import
import styles from "./tooltip.module.css"

type TooltipProps = {
  message: string;
}

const Tooltip = ({message} : TooltipProps) => {

  return (
    <div className={styles.tooltipContainer}>
      <p>{message}</p>
    </div>
  )
}

export default Tooltip