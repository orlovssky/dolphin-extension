import { ERRORS } from "services/constants/app/error.constants";

export interface ITokenData {
  host: string;
  authorization: string;
}
export type TLoadProfile = ({
  dolphinToken,
  initial,
}: {
  dolphinToken: string;
  initial?: boolean;
}) => Promise<{ success: boolean; errorCode?: ERRORS }>;
export type TExtractData = (dolphinToken: string) => ITokenData | null;
export interface ITokenContext {
  isConnected: boolean;
  loading: boolean;
  data: {
    username: string;
  };
  loadProfile: TLoadProfile;
}
