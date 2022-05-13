import { ProfileRole, ProfileType } from '../../types/profile';

export const isValidRole = (
  profile: { roles: ProfileRole[]; profileType: ProfileType } | undefined
) => {
  return profile?.profileType !== 'CLINICIAN';
};
