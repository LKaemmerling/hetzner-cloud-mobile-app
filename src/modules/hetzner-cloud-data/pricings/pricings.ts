import {ServerType} from "../servers/server";

/**
 *
 */
export interface PricePerGbMonth {
  net: string;
  gross: string;
}

export interface Image {
  price_per_gb_month: PricePerGbMonth;
}

export interface PriceMonthly {
  net: string;
  gross: string;
}

export interface FloatingIp {
  price_monthly: PriceMonthly;
}

export interface PricePerTb {
  net: string;
  gross: string;
}

export interface Traffic {
  price_per_tb: PricePerTb;
}

export interface ServerBackup {
  percentage: string;
}

export interface PriceHourly {
  net: string;
  gross: string;
}
export interface Price {
  location: string;
  price_hourly: PriceHourly;
  price_monthly: PriceMonthly;
}


export interface Pricing {
  currency: string;
  vat_rate: string;
  image: Image;
  floating_ip: FloatingIp;
  traffic: Traffic;
  server_backup: ServerBackup;
  server_types: ServerType[];
}
