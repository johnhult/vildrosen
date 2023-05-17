import * as React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
import { useGetGap } from 'helpers/style';
import bg from 'assets/images/background-colored.png';

type StyleProps = {
  $doc: number;
  // $scroll: number;
};

const Menu = () => {
  const scroll = React.useRef<HTMLDivElement>(null);
  const htmlDoc = React.useRef(document.documentElement);
  const htmlHeight = React.useRef<number>(0);

  React.useLayoutEffect(() => {
    console.log(
      document.documentElement.getBoundingClientRect().height,
      document.documentElement.scrollHeight
    );
    htmlHeight.current = document.documentElement.scrollHeight;
  });

  React.useEffect(() => {
    function getScroll() {
      return htmlDoc.current ? htmlDoc.current.getBoundingClientRect().top : 0;
    }
    function setStyle() {
      if (scroll.current) {
        scroll.current.style.transform = `translateY(${getScroll()}px)`;
      }
    }
    function scrollChange() {
      window.requestAnimationFrame(setStyle);
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', scrollChange);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', scrollChange);
      }
    };
  }, []);

  return (
    <StyledMenu>
      <LinkWrapper>
        <MenuLink to='/'>Hem</MenuLink>
        <MenuLink to='/ansokan'>Ansökan</MenuLink>
        <MenuLink to='/barnen'>Barnen</MenuLink>
        <MenuLink to='/foraldrar'>Föräldrarna</MenuLink>
        <MenuLink to='/pedagogerna'>Pedagogerna</MenuLink>
      </LinkWrapper>
      <StyledParallax ref={scroll} $doc={htmlHeight.current} />
    </StyledMenu>
  );
};

const StyledParallax = styled.div<StyleProps>`
  position: absolute;
  width: 100%;
  min-height: 1000px;
  height: ${({ $doc }) => $doc}px;
  background-image: url(${bg});
  background-size: 500px 500px;
  background-repeat: repeat;
  will-change: transform;
  z-index: -1;
`;

const StyledMenu = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: ${({ theme }) => theme.gap.menu}px;
  /* background-color: ${({ theme }) => theme.colors.background}; */
  color: ${({ theme }) => theme.colors.ctaText};
  overflow: hidden;
`;

const LinkWrapper = styled.div`
  height: 100%;
  display: flex;
  margin-left: auto;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 ${() => useGetGap(6)};
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  font-size: calc(16rem / 16);
  &.activeLink {
    border-bottom: 5px solid ${({ theme }) => theme.colors.ctaText};
  }
`;

export default Menu;
