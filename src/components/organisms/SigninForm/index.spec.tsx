import {
  render,
  act,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import SigninForm from '.';
import { theme } from 'themes';

describe('SigninForm', () => {
  let renderResult: RenderResult;
  let handleSignin: jest.Mock;

  beforeEach(() => {
    // ダミー関数
    handleSignin = jest.fn();
    renderResult = render(
      <ThemeProvider theme={theme}>
        <SigninForm onSignin={handleSignin} />
      </ThemeProvider>,
    );
  });

  afterEach(() => {
    renderResult.unmount();
  });

  it('ユーザー名とパスワードを入力後、onSigninが呼ばれる', async () => {
    // DOMが更新されることをact関数で保証、React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
      // ユーザー名入力
      const inputUsernameNode = screen.getByPlaceholderText(
        /ユーザー名/,
      ) as HTMLInputElement;
      fireEvent.change(inputUsernameNode, { target: { value: 'user' } });
      // パスワード入力
      const inputPasswordNode = screen.getByPlaceholderText(
        /パスワード/,
      ) as HTMLInputElement;
      fireEvent.change(inputPasswordNode, { target: { value: 'password' } });
      // サインインボタンをクリック
      fireEvent.click(screen.getByText('サインイン'));
    });

    // handleSigninが呼ばれたことを確認
    expect(handleSignin).toHaveBeenCalledTimes(1);
  });

  it('ユーザー名入力だけでは、バリデーションエラーでonSigininが呼ばれない', async () => {
    // DOMが更新されることを保証、React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
      // ユーザー名入力
      const inputUsernameNode = screen.getByPlaceholderText(
        /ユーザー名/,
      ) as HTMLInputElement;
      fireEvent.change(inputUsernameNode, { target: { value: 'user' } });
      // サインインボタンをクリック
      fireEvent.click(screen.getByText('サインイン'));
    });

    // handleSigininが呼ばれていないことを確認
    expect(handleSignin).toHaveBeenCalledTimes(0);
  });
});
