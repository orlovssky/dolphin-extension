export interface ISelectedProxy {
  id?: number;
  name: string | null;
  type: string;
  ip: string;
  port: number;
  login: string | null;
  password: string | null;
  change_ip_url: string | null;
}
