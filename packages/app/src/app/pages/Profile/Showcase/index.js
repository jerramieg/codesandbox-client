import * as React from 'react';
import { inject, observer } from 'app/componentConnectors';

import Column from '@codesandbox/common/lib/components/flex/Column';
import Centered from '@codesandbox/common/lib/components/flex/Centered';
import Margin from '@codesandbox/common/lib/components/spacing/Margin';
import { Button } from '@codesandbox/common/lib/components/Button';

import SandboxInfo from './SandboxInfo';
import ShowcasePreview from '../../common/ShowcasePreview';

import { ErrorTitle } from './elements';

class Showcase extends React.Component {
  openModal = () => {
    this.props.signals.profile.selectSandboxClicked();
  };

  render() {
    const { store } = this.props;
    const sandbox = store.profile.showcasedSandbox;
    const isCurrentUser = store.profile.isProfileCurrentUser;

    if (store.profile.isLoadingProfile) {
      return (
        <Centered vertical horizontal>
          <Margin top={4}>
            <ErrorTitle>Loading showcased sandbox...</ErrorTitle>
          </Margin>
        </Centered>
      );
    }

    if (!sandbox) {
      return (
        <Centered vertical horizontal>
          <Margin top={4}>
            <ErrorTitle>
              {isCurrentUser ? "You don't" : "This user doesn't"} have any
              sandboxes yet
            </ErrorTitle>
          </Margin>
        </Centered>
      );
    }

    return (
      <Column alignItems="center">
        <Margin top={1}>
          {isCurrentUser && (
            <Button small onClick={this.openModal}>
              Change Sandbox
            </Button>
          )}
        </Margin>
        <Margin top={2} style={{ width: '100%' }}>
          <Column alignItems="initial">
            <div style={{ flex: 2 }}>
              <ShowcasePreview
                sandbox={sandbox}
                settings={this.props.store.preferences.settings}
              />
            </div>
            <div style={{ flex: 1 }}>
              <SandboxInfo sandbox={sandbox} isLoggedIn={store.isLoggedIn} />
            </div>
          </Column>
        </Margin>
      </Column>
    );
  }
}

export default inject('signals', 'store')(observer(Showcase));
