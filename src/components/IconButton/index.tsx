import * as React from "react";
import styled from "styled-components";
import Icon, { Icons } from "components/Icon";

interface IconButtonProps {
  onClick: () => void;
  type: Icons;
  size: "small" | "medium";
  style?: React.CSSProperties;
}

type IconButtonDefaultFix = {
  size?: "small" | "medium";
} & Omit<IconButtonProps, "size">;

const IconButtonDefaults: React.FC<IconButtonProps> = ({
  onClick,
  type,
  size,
  ...props
}) => {
  return (
    <Button onClick={onClick} {...props}>
      <Icon type={type} size={size} />
    </Button>
  );
};

// A bit of a hack to get default props to run well with typescript without having to account for null
const IconButton: React.FC<IconButtonDefaultFix> = ({
  size = "small",
  ...props
}) => <IconButtonDefaults size={size} {...props} />;

export default IconButton;

const Button = styled.button`
  appearance: none;
  border-style: none;
  background-color: initial;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;
