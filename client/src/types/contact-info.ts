import { UserInfo } from "./user-info";

type ContactInfo = Omit<UserInfo, 'id' | 'profileSetup'> & { _id: string };

export type { ContactInfo }
