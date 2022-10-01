import SigninForm from 'components/organisms/SigninForm';
import { useAuthContext } from 'contexts/AuthContext';
import { useGlobalSpinnerActionContext } from 'contexts/GlobalSpinnerContext';

interface SigninFormContainerProps {
  /**
   * サインインしたときに呼ばれるイベントハンドラ
   */
  onSignin: (error?: Error) => void;
}

/**
 * サインインフォームコンテナ
 */
const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
  const { signin } = useAuthContext();
  const setGlobalSpinner = useGlobalSpinnerActionContext();
  // サインインボタンを押したときのイベントハンドラ
  const handleSignin = async (username: string, password: string) => {
    try {
      // ローディングスピナーを表示する
      setGlobalSpinner(true);
      await signin(username, password);
      onSignin && onSignin();
    } catch (err: unknown) {
      if (err instanceof Error) {
        // エラーの内容を表示
        window.alert(err.message);
        onSignin && onSignin(err);
      }
    } finally {
      setGlobalSpinner(false);
    }
  };

  return <SigninForm onSignin={handleSignin} />;
};

export default SigninFormContainer;
