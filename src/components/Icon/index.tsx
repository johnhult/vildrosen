import * as React from "react";
import Arrow_L from "assets/gfx/arrow_l.svg";
import Arrow_R from "assets/gfx/arrow_r.svg";
import Expand from "assets/gfx/expand.svg";
import Close from "assets/gfx/close.svg";
import styled from "styled-components";

export enum Icons {
  ARROW_L = "arrow_l",
  ARROW_R = "arrow_r",
  EXPAND = "expand",
  CLOSE = "close",
}

type Sizes = "xSmall" | "small" | "medium";

interface IconProps {
  type: Icons;
  size: Sizes;
}

type IconDefaultFix = {
  size?: Sizes;
} & Omit<IconProps, "size">;

type IconStyleProps = {
  $stroke: boolean;
  $fill: boolean;
} & Pick<IconProps, "size">;

const matchIcon = {
  arrow_l: { component: Arrow_L, fill: true, stroke: true },
  arrow_r: { component: Arrow_R, fill: true, stroke: true },
  expand: { component: Expand, fill: false, stroke: true },
  close: { component: Close, fill: false, stroke: true },
};

const matchSize = {
  xSmall: "16px",
  small: "32px",
  medium: "64px",
};

const IconDefaults: React.FC<IconProps> = ({ type, size, ...props }) => {
  const Icon = matchIcon[type].component;
  const fill = matchIcon[type].fill;
  const stroke = matchIcon[type].stroke;
  return (
    <StyledIcon
      as={Icon}
      size={size}
      $fill={fill}
      $stroke={stroke}
      {...props}
    />
  );
};

const Icon: React.FC<IconDefaultFix> = ({ size = "small", ...props }) => (
  <IconDefaults size={size} {...props} />
);

const StyledIcon = styled.div<IconStyleProps>`
  width: ${({ size }) => matchSize[size]};
  height: ${({ size }) => matchSize[size]};
  & path,
  line {
    fill: ${({ theme, $fill }) => $fill && theme.colors.text};
    stroke: ${({ theme, $stroke }) => $stroke && theme.colors.text};
  }
`;

export default Icon;
