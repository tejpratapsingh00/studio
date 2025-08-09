export type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
};

export type WasteSubmission = {
  id: string;
  date: string;
  type: 'Plastic' | 'E-waste' | 'Paper' | 'Metal' | 'Organic';
  weight: number;
  points: number;
  status: 'Processed' | 'Pending' | 'On the way';
};

export type MarketPrice = {
  type: 'Plastic' | 'E-waste' | 'Paper' | 'Metal' | 'Organic';
  price: number;
  trend: 'up' | 'down';
};
