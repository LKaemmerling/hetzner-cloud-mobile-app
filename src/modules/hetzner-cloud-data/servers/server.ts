/**
 * Interface for all IPv4 handels
 */
export interface Ipv4 {
  /**
   * The specific IPv4
   *
   * @type string
   */
  ip: string;
  /**
   * Determine if the IPv4 is blocked
   *
   *  @type boolean
   */
  blocked: boolean;
  /**
   * The DNS for the IPv4
   *
   * @type {string}
   */
  dns_ptr: string;
}

export interface DnsPtr {
  ip: string;
  dns_ptr: string;
}

export interface Ipv6 {
  ip: string;
  blocked: boolean;
  dns_ptr: DnsPtr[];
}

export interface PublicNet {
  ipv4: Ipv4;
  ipv6: Ipv6;
  floating_ips: number[];
}

export interface PriceHourly {
  net: string;
  gross: string;
}

export interface PriceMonthly {
  net: string;
  gross: string;
}

export interface Price {
  location: string;
  price_hourly: PriceHourly;
  price_monthly: PriceMonthly;
}

export interface ServerType {
  id: number;
  name: string;
  description: string;
  cores: number;
  memory: number;
  disk: number;
  prices: Price[];
  storage_type: string;
}

export interface Location {
  id: number;
  name: string;
  description: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface ServerTypes {
  supported: number[];
  available: number[];
}

export interface Datacenter {
  id: number;
  name: string;
  description: string;
  location: Location;
  server_types: ServerTypes;
}

export interface CreatedFrom {
  id: number;
  name: string;
}

export interface Image {
  id: number;
  type: string;
  status: string;
  name: string;
  description: string;
  image_size: number;
  disk_size: number;
  created: string;
  created_from: CreatedFrom;
  bound_to: number;
  os_flavor: string;
  os_version: string;
  rapid_deploy: boolean;
}

export interface Iso {
  id: number;
  name: string;
  description: string;
  type: string;
  deprecated: Date;
}

export interface Server {
  id: number;
  name: string;
  status: string;
  created: string;
  public_net: PublicNet;
  server_type: ServerType;
  datacenter: Datacenter;
  image: Image;
  iso: Iso;
  rescue_enabled: boolean;
  locked: boolean;
  backup_window: string;
  outgoing_traffic: number;
  ingoing_traffic: number;
  included_traffic: number;
}


