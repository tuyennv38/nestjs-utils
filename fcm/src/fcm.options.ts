import { ServiceAccount } from "firebase-admin";
export const FCM_OPTIONS = 'FcmOptions';
export interface FcmOptions {
    serviceAccount: ServiceAccount;
    logger?: any;
  }