interface CurrencyProps {
  amount: number;
  currency?: string;
  className?: string;
}

export default function CurrencyFormat({
  amount,
  currency = '$',
  className = 'text-foreground',
}: CurrencyProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <span className={className}>
      {currency} {formatCurrency(amount)}
    </span>
  );
}
