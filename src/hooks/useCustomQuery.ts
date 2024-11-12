import { useToast } from '@/hooks/use-toast';
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

type ErrorWithProblem = {
  problem?: string;
};

interface CustomQueryOptions<TData, TError, TVariables>
  extends Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryFn'> {
  params?: TVariables;
  successMessage?: string;
  toastPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  displayError?: boolean;
  omitProblems?: string[];
  allowProblems?: string[];
}

export const useCustomQuery = <
  TData = unknown,
  TError extends ErrorWithProblem = { problem?: string },
  TVariables = unknown
>(
  queryFn: (
    variables: TVariables
  ) => Promise<{ data: TData; problem?: TError['problem'] }>,
  {
    params,
    successMessage = '',
    toastPosition = 'top-right',
    displayError = true,
    omitProblems = [],
    allowProblems = [],
    ...options
  } = {} as CustomQueryOptions<TData, TError, TVariables>
) => {
  const { toast } = useToast();

  return useQuery<TData, TError>({
    ...options,
    queryFn: async () => {
      const { data, problem } = await queryFn(params as TVariables);

      if (!problem && successMessage) {
        toast({
          title: successMessage,
          position: toastPosition,
          variant: 'default',
          duration: 4000,
        });
      }

      if (
        problem &&
        !omitProblems.includes(problem) &&
        (displayError || allowProblems.includes(problem))
      ) {
        toast({
          title: `global.errors.api.${problem}`,
          position: 'bottom-right',
          variant: 'destructive',
          duration: 4000,
        });
      }

      return data;
    },
  });
};
