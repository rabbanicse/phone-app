export interface RentSlipDetails {
    id:number;
    year: number;
    month: number;
    templateName: string;
    rent: number;
    waterBill: number;
    gasBill: number;
    electricBill: number;
    others: number;
    serviceCharge: number;
    totalRent: number;
  }