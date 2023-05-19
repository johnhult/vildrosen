import { getRandomColorFromPalette, minWidth } from 'helpers/style';
import * as React from 'react';
import styled, { css, keyframes, useTheme } from 'styled-components';

export enum HeaderTypes {
  HERO = 'hero',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  SMALL = 'small',
}

type HeaderProps = {
  as?: keyof JSX.IntrinsicElements;
  color?: string;
  fancy?: boolean;
  mb?: boolean;
  type: HeaderTypes;
};

type HeaderStyleProps = {
  as?: keyof JSX.IntrinsicElements;
  $color?: string;
  $fancy?: boolean;
  $mb?: boolean;
  $type?: HeaderTypes;
};

type LetterStyleProps = {
  $shadowStyle?: boolean;
  $randomColor?: string;
  $radius: number;
  $rotate: number;
  $index: number;
};

const Header: React.FC<React.PropsWithChildren<HeaderProps>> = ({
  as,
  fancy,
  color,
  mb,
  type,
  children,
  ...props
}) => {
  const theme = useTheme();
  const curvedMap = React.useMemo(
    () => ({
      mobile: {
        arc: 120,
        radius: 200,
      },
      desktop: {
        arc: 120,
        radius: 400,
      },
    }),
    []
  );
  const colors = React.useMemo(() => {
    if (typeof children === 'string') {
      const tempColors = new Array(children.length).fill('').map((_, i) => {
        return getRandomColorFromPalette(theme);
      });
      return tempColors;
    }
    return [];
  }, [children, theme]);
  const StyledHeader = headers[type];
  const [size, setSize] = React.useState(
    typeof window !== 'undefined' && window.visualViewport
      ? window.visualViewport?.width
      : 0
  );

  React.useEffect(() => {
    const debounceResize = () => {
      const calculateResize = () => {
        clearTimeout(listener);
        setSize(window.visualViewport?.width || window.innerWidth);
      };
      const listener = setTimeout(calculateResize, 250);
    };
    if (typeof window !== undefined) {
      window.addEventListener('resize', debounceResize);
    }
    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener('resize', debounceResize);
      }
    };
  }, []);

  const makeArc = React.useCallback(
    (children: React.ReactNode) => {
      if (typeof children === 'string') {
        const mapKey =
          size >= theme.breakpoints.tablet.asNumber ? 'desktop' : 'mobile';
        const characters = children.split('');
        const arc = curvedMap[mapKey].arc;
        const radius = curvedMap[mapKey].radius;
        const degree = arc / characters.length;

        return characters.map((char, i) => (
          <React.Fragment key={`heading-span-${i}`}>
            <Letter
              $shadowStyle={true}
              $index={i}
              $rotate={degree * i - arc / 2}
              $radius={radius}
            >
              {char}
            </Letter>
            <Letter
              $randomColor={colors[i]}
              $index={i}
              $rotate={degree * i - arc / 2}
              $radius={radius}
            >
              {char}
            </Letter>
          </React.Fragment>
        ));
      } else {
        console.error('Child has to be string when using HeaderType.HERO');
        return children;
      }
    },
    [size, theme, curvedMap, colors]
  );

  return (
    <StyledHeader
      $color={color}
      $fancy={fancy}
      $mb={mb}
      $type={type}
      //@ts-ignore-next-line Using imperative declaration somehow breaks TS
      as={as}
      {...props}
    >
      {type === HeaderTypes.HERO ? makeArc(children) : children}
    </StyledHeader>
  );
};

export default Header;

const baseHeader = css<HeaderStyleProps>`
  word-break: normal;
  hyphens: auto;
  display: inline-flex;
  color: ${({ theme, $color }) => ($color ? $color : theme.colors.text)};
  background-image: ${({ theme, $fancy, $type }) =>
    $fancy && $type !== HeaderTypes.HERO
      ? theme.name === 'light'
        ? 'linear-gradient(to bottom right, #e76800, #7c1488)'
        : 'linear-gradient(to bottom right, #e35bdc, #6ef19c)'
      : theme.colors.dark};
  background-clip: text;
  -webkit-background-clip: text;
  background-size: 100%;
  -webkit-text-fill-color: ${({ $type }) =>
    $type === HeaderTypes.HERO ? '' : 'initial'};
  margin: 0;
  margin-bottom: ${({ $mb }) => ($mb ? '1rem' : undefined)};
  font-family: 'DynaPuff', serif;
`;

const movement = (shadow: boolean, rotate: number) => keyframes`
  0% {
    transform: rotate(${rotate}deg) translate3d(${
  shadow ? '5px,5px,0' : '0px,0px,0px'
});
  }
  100% {
    transform: rotate(${rotate}deg) translate3d(${
  shadow ? '5px,-5px,0' : '0px,-15px,0px'
});
  }
`;

const HeroStyled = styled.h1<HeaderStyleProps>`
  ${baseHeader}
  display: block;
  font-size: calc(64rem / 16);
  font-weight: 700;
  user-select: none;
  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    font-size: calc(128rem / 16);
  }
`;
const Letter = styled.span<LetterStyleProps>`
  display: block;
  position: absolute;
  width: 80px;
  color: ${({ theme, $randomColor, $shadowStyle }) =>
    $shadowStyle ? theme.colors.headerShadow : $randomColor};
  height: ${({ $radius }) => $radius}px;
  transform-origin: 0 ${({ $radius }) => $radius}px 0;
  transform: rotate(${({ $rotate }) => $rotate}deg)
    translate3d(${({ $shadowStyle }) => ($shadowStyle ? '5px,5px,0' : '0,0,0')});
  animation: ${({ $shadowStyle, $rotate }) => movement(!!$shadowStyle, $rotate)}
    2s infinite ${({ $index }) => $index * 0.2}s ease-in-out alternate;
`;
const H1Styled = styled.h1<HeaderStyleProps>`
  ${baseHeader}
  font-size: calc(32rem / 16);
  font-weight: 700;
`;
const H2Styled = styled.h2<HeaderStyleProps>`
  ${baseHeader}
  font-size: calc(28rem / 16);
  font-weight: 600;
`;
const H3Styled = styled.h3<HeaderStyleProps>`
  ${baseHeader}
  font-size: calc(24rem / 16);
  font-weight: 700;
`;
const Small = styled.span<HeaderStyleProps>`
  ${baseHeader}
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  font-size: calc(14rem / 16);
  font-weight: 700;
`;

const headers = {
  hero: HeroStyled,
  h1: H1Styled,
  h2: H2Styled,
  h3: H3Styled,
  small: Small,
};
