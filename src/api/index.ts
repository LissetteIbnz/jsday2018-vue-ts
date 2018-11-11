import { MemberEntity } from '@/models';
import { members } from './mockData';

export const fetchMembers = (): Promise<MemberEntity[]> => Promise.resolve(members);
