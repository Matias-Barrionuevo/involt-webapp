'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

export interface ComboboxItem {
  value: string;
  label: string;
  icon?: string;
}

interface ComboboxProps
  extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  placeholder: string;
  emptyMessage: string;
  items: ComboboxItem[];
  popoverContentClassName?: string;
  hasError?: boolean;
  searchPlaceholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const MemoizedItems = React.memo(
  ({
    items,
    value,
    onSelect,
  }: {
    items: ComboboxItem[];
    value: string;
    onSelect: (currentValue: string) => void;
  }) => (
    <>
      {items.map((item) => (
        <CommandItem
          key={item.value}
          value={item.value}
          onSelect={onSelect}
          className="px-3 py-2"
        >
          <Check
            className={cn(
              'mr-2 h-4 w-4',
              value === item.value ? 'opacity-100' : 'opacity-0'
            )}
          />
          {item.icon && (
            <img
              className="mr-2 w-5 h-5 rounded-full object-cover"
              loading="lazy"
              src={item.icon}
            />
          )}
          {item.label}
        </CommandItem>
      ))}
    </>
  )
);
MemoizedItems.displayName = 'MemoizedItems';

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      placeholder,
      emptyMessage,
      items = [],
      onChange,
      hasError,
      popoverContentClassName,
      searchPlaceholder,
      value: defaultValue = '',
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(defaultValue);

    const handleSelect = React.useCallback(
      (currentValue: string) => {
        const selectedValue = currentValue === value ? '' : currentValue;
        setValue(selectedValue);
        setOpen(false);
        onChange?.(selectedValue);
      },
      [value, onChange]
    );

    const currentSelect = items.find((item) => item.value === value);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between',
              hasError && 'border-destructive'
            )}
            ref={ref}
            {...props}
          >
            {value ? (
              <Label className="flex items-center">
                {currentSelect?.icon && (
                  <img
                    className="mr-2 w-5 h-5 rounded-full object-cover"
                    loading="lazy"
                    src={currentSelect?.icon}
                  />
                )}
                {currentSelect?.label}
              </Label>
            ) : (
              <Label
                className={cn(
                  !hasError && 'opacity-50',
                  hasError && 'text-destructive'
                )}
              >
                {placeholder}
              </Label>
            )}
            <ChevronsUpDown
              className={cn(
                'ml-2 h-4 w-4 shrink-0',
                hasError && 'text-destructive'
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'p-0 w-[var(--radix-popover-trigger-width)]',
            popoverContentClassName
          )}
          sideOffset={5}
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <MemoizedItems
                  items={items}
                  value={value}
                  onSelect={handleSelect}
                />
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
Combobox.displayName = 'Combobox';

export { Combobox };
