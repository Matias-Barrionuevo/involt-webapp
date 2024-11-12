import { queryClient } from '@/config/client-query.config';
import { useToast } from '@/hooks/use-toast';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

type ErrorWithProblem = {
  problem?: string;
};

type CustomMutationOptions<
  TData,
  TError extends ErrorWithProblem,
  TVariables,
  TContext
> = UseMutationOptions<TData, TError, TVariables, TContext> & {
  successMessage?: string;
  toastPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  displayError?: boolean;
  omitProblems?: TError[];
  allowProblems?: TError[];
  invalidQueryKey?: string[];
};

export const useCustomMutation = <
  TData = unknown,
  TError extends ErrorWithProblem = { problem: string },
  TVariables = void,
  TContext = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  {
    successMessage = '',
    toastPosition = 'top-right',
    displayError = true,
    omitProblems = [],
    allowProblems = [],
    invalidQueryKey,
    ...options
  }: CustomMutationOptions<TData, TError, TVariables, TContext>
) => {
  const { toast } = useToast();

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
    onSuccess: (data, ...args) => {
      if (successMessage) {
        toast({
          title: successMessage,
          position: toastPosition,
          variant: 'default',
          duration: 4000,
        });
      }

      if (invalidQueryKey) {
        queryClient.invalidateQueries({ queryKey: invalidQueryKey });
      }

      options.onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      if (
        !omitProblems?.includes(error.problem as TError) &&
        (displayError || allowProblems?.includes(error.problem as TError))
      ) {
        toast({
          title: `global.errors.api.${error.problem}`,
          position: 'top-right',
          variant: 'destructive',
          duration: 4000,
        });
      }

      options.onError?.(error, ...args);
    },
  });
};
