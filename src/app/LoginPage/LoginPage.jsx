// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginPageRenderer from './LoginPageRenderer';
import { createWalletFromJSON } from '../../store/services/wallet';
import type { LoginWithWallet } from '../../types/loginPage';

type Props = {
  authenticated: boolean,
  loginWithMetamask: () => void,
  loginWithWallet: LoginWithWallet => void,
  loginWithTrezorWallet: () => void,
  loginWithLedgerWallet: () => void,
  removeNotification: any => void
};

//TODO: Remove Notification handling

type State = {
  view: string,
  metamaskStatus: 'unlocked' | 'locked' | 'undefined'
};

class LoginPage extends React.PureComponent<Props, State> {
  state = {
    view: 'loginMethods',
    metamaskStatus: 'undefined'
  };

  componentDidMount = () => {
    typeof window.web3 === 'undefined'
      ? this.setState({ metamaskStatus: 'undefined' })
      : typeof window.web3.eth.defaultAccount === 'undefined'
      ? this.setState({ metamaskStatus: 'locked' })
      : this.setState({ metamaskStatus: 'unlocked' });
  };

  showWalletLoginForm = () => {
    this.setState({ view: 'wallet' });
  };

  showLoginMethods = () => {
    this.setState({ view: 'loginMethods' });
  };

  showCreateWallet = () => {
    this.setState({ view: 'createWallet' });
  };

  loginWithMetamask = () => {
    this.props.loginWithMetamask();
  };

  hideModal = () => {
    this.setState({ view: 'loginMethods' });
  };

  componentWillMount = () => {
    // this.props.removeNotification({ id: 1 });
  };

  walletCreated = async (props: Object) => {
    const { password, encryptedWallet, storeWallet, storePrivateKey } = props;
    var { wallet } = await createWalletFromJSON(encryptedWallet, password);
    if (wallet) {
      this.props.loginWithWallet({
        wallet,
        encryptedWallet,
        storeWallet,
        storePrivateKey
      });
    }
  };

  render() {
    const {
      props: { loginWithMetamask, loginWithWallet, loginWithTrezorWallet, loginWithLedgerWallet, authenticated },
      state: { view, metamaskStatus },
      showWalletLoginForm,
      showLoginMethods,
      showCreateWallet,
      hideModal,
      walletCreated
    } = this;
    // go to wallet by default to update balances
    if (authenticated) {
      // check if there is no account balances then go to /wallet page
      return <Redirect to="/wallet" />;
    }
    return (
      <div>
        <LoginPageRenderer
          view={view}
          metamaskStatus={metamaskStatus}
          loginWithWallet={loginWithWallet}
          showCreateWallet={showCreateWallet}
          hideModal={hideModal}
          walletCreated={walletCreated}
          loginWithMetamask={loginWithMetamask}
          loginWithTrezorWallet={loginWithTrezorWallet}
          loginWithLedgerWallet={loginWithLedgerWallet}
          showWalletLoginForm={showWalletLoginForm}
          showLoginMethods={showLoginMethods}
        />
      </div>
    );
  }
}

export default LoginPage;
