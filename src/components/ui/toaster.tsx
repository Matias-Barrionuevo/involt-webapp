import { Fragment } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

export function Toaster() {
  const { toasts } = useToast();

  const positionClasses = {
    'top-left': 'sm:top-0 sm:left-0',
    'top-right': 'sm:top-0 sm:right-0',
    'bottom-left': 'sm:bottom-0 sm:left-0',
    'bottom-right': 'sm:bottom-0 sm:right-0',
  };

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        position = 'top-right',
        ...props
      }) {
        return (
          <Fragment key={id}>
            <Toast {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </Toast>
            <ToastViewport
              className={`p-6 focus:outline-none pointer-events-none ${positionClasses[position]}`}
            />
          </Fragment>
        );
      })}
    </ToastProvider>
  );
}
