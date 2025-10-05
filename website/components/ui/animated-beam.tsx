'use client'

import React, { useEffect, useId, useState } from 'react'
import { motion } from 'framer-motion'

export const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 2,
  delay = 0,
  pathColor = 'gray',
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = '#60a5fa',
  gradientStopColor = '#a78bfa',
}: {
  className?: string
  containerRef: React.RefObject<HTMLElement>
  fromRef: React.RefObject<HTMLElement>
  toRef: React.RefObject<HTMLElement>
  curvature?: number
  reverse?: boolean
  duration?: number
  delay?: number
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
}) => {
  const id = useId()
  const [pathD, setPathD] = useState('')
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const fromRect = fromRef.current.getBoundingClientRect()
        const toRect = toRef.current.getBoundingClientRect()

        const fromX = fromRect.left - containerRect.left + fromRect.width / 2
        const fromY = fromRect.top - containerRect.top + fromRect.height / 2
        const toX = toRect.left - containerRect.left + toRect.width / 2
        const toY = toRect.top - containerRect.top + toRect.height / 2

        const midX = (fromX + toX) / 2
        const midY = (fromY + toY) / 2 + curvature

        const path = `M ${fromX},${fromY} Q ${midX},${midY} ${toX},${toY}`
        setPathD(path)
        setSvgDimensions({
          width: containerRect.width,
          height: containerRect.height,
        })
      }
    }

    updatePath()
    window.addEventListener('resize', updatePath)
    return () => window.removeEventListener('resize', updatePath)
  }, [containerRef, fromRef, toRef, curvature])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute left-0 top-0 transform-gpu pointer-events-none ${className}`}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="1" stopColor={gradientStopColor} />
          <motion.stop
            offset="0%"
            stopColor={gradientStartColor}
            stopOpacity="0"
          >
            <animate
              attributeName="offset"
              values={reverse ? '1;0' : '0;1'}
              dur={`${duration}s`}
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
          </motion.stop>
          <motion.stop offset="50%" stopColor={gradientStopColor}>
            <animate
              attributeName="offset"
              values={reverse ? '1;0' : '0;1'}
              dur={`${duration}s`}
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
          </motion.stop>
          <motion.stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          >
            <animate
              attributeName="offset"
              values={reverse ? '1;0' : '0;1'}
              dur={`${duration}s`}
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
          </motion.stop>
        </linearGradient>
      </defs>
    </svg>
  )
}
