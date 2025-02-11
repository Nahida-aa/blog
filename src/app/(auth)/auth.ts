import { cookies } from 'next/headers'
// import { verifyJWT } from '@/lib/core/token';
// import { SessionTokenPayload } from '@/lib/middleware/auth';

export type AuthSession = {
  user: {
    id: string;
    name: string;
    image: string;
    nickname?: string;
    email?: string;
  };
  token: string;
};
export type ServerAuthFunc = () => Promise<AuthSession | null>;
type ServerAuthFuncReturn = AuthSession | null;
export const server_auth = async () => {
  return null as ServerAuthFuncReturn
  // const cookieStore = await cookies();
  // const token = cookieStore.get('session_token')?.value;
  
  // if (!token) {
  //   return null;
  // }
  // let de_payload = null
  // try{
  //   de_payload = await verifyJWT(token) as SessionTokenPayload
  // } catch (error) {
  //   console.error(`app/(auth)/auth.ts::server_auth: token 解析失败: ${error}`);
  //   return null;
  // }
  // const user = de_payload.user as NonNullable<SessionTokenPayload['user']>;

  // return { user: {
  //   id: user.id,
  //   email: user?.email || '',
  //   name: user.name,
  //   image: user?.image,
  //   nickname: user?.nickname,
  // }, token};
};