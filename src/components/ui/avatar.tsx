"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import Image, { type ImageProps } from "next/image"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

type AvatarImageProps = Omit<ImageProps, "onLoadingComplete"> & {
  fallbackToLocal?: boolean // true quando src vem do teu backend local (dev)
}

function AvatarImage({
  className,
  src,
  alt,
  fallbackToLocal = true,
  onError,
  ...props
}: AvatarImageProps) {
  const [hasError, setHasError] = React.useState(false)

  // reset o erro sempre que a src mudar (ex: user trocou o avatar)
  React.useEffect(() => {
    setHasError(false)
  }, [src])

  if (!src || hasError) {
    return null // deixa o AvatarFallback do Radix aparecer por baixo
  }

  return (
    <Image
      data-slot="avatar-image"
      src={src}
      alt={alt}
      fill
      className={cn("aspect-square object-cover", className)}
      unoptimized={fallbackToLocal}
      onError={(e) => {
        setHasError(true)
        onError?.(e)
      }}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }