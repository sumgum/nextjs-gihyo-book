import { ApiContext, User } from 'types/data';
import { fetcher } from 'utils';

export type GetUserParams = {
  /**
   * ユーザーID
   */
  id: number;
};

/**
 * ユーザーAPI（個別取得）
 * @param context APIコンテキスト
 * @param params パラメーター
 * @returns ユーザー
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams,
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  );
};

export default getUser;
