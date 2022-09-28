export interface Template {
    id: number;
    templateName: string;
    ownerId: string;
    year: number;
    month: number;
    monthName: string;
    rent: number;
    waterBill: number;
    gasBill: number;
    electricBill: number;
    serviceCharge: number;
    others: number;
    totalRent:number;
  }