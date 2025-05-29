export type Category = {
  id: string;
  proLabel: string;
  isSelectable: boolean;
};

export type Subcategory = {
  id: string;
  categoryId: string;
  proLabel: string;
  appLabel: string;
  isEvent: boolean;
  conditionalFields: string[];
  canExpire: boolean;
  canBeDuo: boolean;
  onlineOfflinePlatform: string;
  isDigitalDeposit: boolean;
  isPhysicalDeposit: boolean;
  reimbursementRule: string;
  isSelectable: boolean;
  canBeWithdrawable: boolean;
  canHaveOpeningHours: boolean;
};

export type Prediction = {
  category: string;
  subcategory: string;
  confidence: number;
};
