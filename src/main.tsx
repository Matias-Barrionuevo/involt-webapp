import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/client-query.config';
import { Toaster } from '@/components/ui/toaster';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <Toaster />
      <RouterProvider router={router} />
    </StrictMode>
  </QueryClientProvider>
);
