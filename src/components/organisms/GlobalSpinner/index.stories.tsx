import { ComponentMeta } from '@storybook/react';
import GlobalSpinner from '.';
import Button from 'components/atoms/Button';
import GlobalSpinnerContextProvider, {
  useGlobalSpinnerActionContext,
} from 'contexts/GlobalSpinnerContext';

export default {
  title: 'Organisms/GlobalSpinner',
} as ComponentMeta<typeof GlobalSpinner>;

export const WithContextProvider = () => {
  const ChildComponent = () => {
    const setGlobalSpinner = useGlobalSpinnerActionContext();
    const handleClick = () => {
      setGlobalSpinner(true);
      // 5秒後に閉じる
      setTimeout(() => {
        setGlobalSpinner(false);
      }, 5000);
    };

    return (
      <>
        <GlobalSpinner />
        <Button onClick={handleClick}>スピナー表示</Button>
      </>
    );
  };

  return (
    <GlobalSpinnerContextProvider>
      <ChildComponent />
    </GlobalSpinnerContextProvider>
  );
};
