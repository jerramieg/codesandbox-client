import React from 'react';
import { getSandboxName } from '@codesandbox/common/lib/utils/get-sandbox-name';
import { sandboxUrl } from '@codesandbox/common/lib/utils/url-generator';
import Row from '@codesandbox/common/lib/components/flex/Row';
import { Stat } from 'app/components/Stat';
import SvgButton from './play-button.svg';
import {
  Container,
  Title,
  Like,
  Description,
  Stats,
  PlayButtonContainer,
} from './elements';

function SandboxInfo({ sandbox, isLoggedIn }) {
  return (
    <Container>
      <Row alignItems="center">
        <Title>
          {getSandboxName(sandbox)}{' '}
          {isLoggedIn ? <Like sandbox={sandbox} /> : null}
        </Title>
      </Row>
      <Row alignItems="flex-start">
        <div style={{ flex: 6 }}>
          <Description>{sandbox.description}</Description>
        </div>
        <Stats>
          <PlayButtonContainer to={sandboxUrl({ id: sandbox.id })}>
            <img alt="edit" src={SvgButton} />
          </PlayButtonContainer>
          <Stat name="likes" count={sandbox.likeCount} />
          <Stat name="views" count={sandbox.viewCount} />
          <Stat name="forks" count={sandbox.forkCount} />
        </Stats>
      </Row>
    </Container>
  );
}

export default SandboxInfo;
