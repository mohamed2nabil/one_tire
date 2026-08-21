import * as React from 'react'

export const Dialog = ({ children, open, onOpenChange }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === DialogContent) {
          return React.cloneElement(child, { onClose: () => onOpenChange(false) });
        }
        return null;
      })}
    </div>
  )
}

export const DialogTrigger = ({ children, asChild }: any) => {
  return <>{children}</> // For this simple polyfill, trigger is handled via state externally
}

export const DialogContent = ({ children, className, dir, onClose }: any) => {
  return (
    <div className={g-background text-foreground rounded-lg p-6 max-w-lg w-full } dir={dir}>
      {children}
    </div>
  )
}

export const DialogHeader = ({ children }: any) => <div className="mb-4">{children}</div>
export const DialogTitle = ({ children }: any) => <h2 className="text-xl font-bold">{children}</h2>
