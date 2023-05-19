import { mY, useGetGapNumber } from 'helpers/style';
import * as React from 'react';
import styled from 'styled-components';

type DividerProps = {
  $length?: number | string;
  $color?: string;
  $mY?:
    | number
    | string
    | {
        top: number | string;
        bot: number | string;
      };
  $h?: number;
};

const Divider: React.FC<DividerProps> = ({
  $length = '100%',
  $color,
  $h = 5,
  $mY,
}) => {
  return <StyledDivider $length={$length} $color={$color} $h={$h} $mY={$mY} />;
};

const StyledDivider = styled.div<DividerProps>`
  width: ${({ $length }) =>
    typeof $length === 'string' ? $length : `${$length}px`};
  height: ${({ $h }) => $h}px;
  flex-shrink: 0;
  border-radius: 3px;
  background-color: ${({ theme, $color }) =>
    !$color ? theme.colors.dark : $color};
  ${({ $mY }) => (!$mY ? mY(useGetGapNumber(8)) : mY($mY))};
`;

export default Divider;
