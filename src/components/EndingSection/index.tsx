import Button, { ButtonProps } from 'components/Button';
import Divider from 'components/Divider';
import Header, { HeaderTypes } from 'components/Header';
import { minWidth, pX, pY, useGetGap } from 'helpers/style';
import * as React from 'react';
import styled, { useTheme } from 'styled-components';

type EndingSectionProps = {
  title: string;
  text: string;
  button: ButtonProps;
};

const EndingSection: React.FC<EndingSectionProps> = ({
  title,
  text,
  button,
}) => {
  const theme = useTheme();
  const divGap = useGetGap(32);
  return (
    <StyledWrapper>
      <StyledCenterWrapper>
        <Divider
          $h={2}
          $color={theme.colors.light}
          $mY={{ top: 0, bot: divGap }}
        />
        <Header type={HeaderTypes.SMALL} color={theme.colors.palette[0]}>
          {title}
        </Header>
        <StyledDividerArea>
          <Header type={HeaderTypes.H1} as='span'>
            {text}
          </Header>
          <Divider $length={'40%'} $color={theme.colors.palette[0]} />
        </StyledDividerArea>
        <Button {...button} />
        <Divider
          $h={2}
          $color={theme.colors.light}
          $mY={{ top: divGap, bot: 0 }}
        />
      </StyledCenterWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  width: 100%;
  background-color: white;
  ${({ theme }) => pX(theme.gap.section.x.desktop)}
  ${() => pY(useGetGap(16))}
  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    ${() => pY(useGetGap(16))}
  }
`;

const StyledCenterWrapper = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: auto;
`;

const StyledDividerArea = styled.div`
  width: 800px;
  max-width: 100%;
`;

export default EndingSection;
