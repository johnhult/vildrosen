import * as React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';
import { useGetGap } from 'helpers/style';
import bg from 'assets/images/background-colored.png';
import { useResize } from 'context/ResizeContext';

type StyleProps = {
  $doc: number;
};

const Menu = () => {
  const scroll = React.useRef<HTMLDivElement>(null);
  const htmlDoc = React.useRef<HTMLElement | null>(null);
  const htmlHeight = React.useRef<number>(0);
  const windowSize = useResize();
  const parallaxLeft = React.useRef(0);
  const defaultParallaxPosX = useGetGap(4);

  React.useEffect(() => {
    htmlHeight.current = document.documentElement.scrollHeight;
    if (scroll.current) {
      if (windowSize.w >= 1200) {
        parallaxLeft.current = windowSize.w / 2 - 1200 / 2;
        scroll.current.style.left = `-${parallaxLeft.current}px`;
        scroll.current.style.width = `${windowSize.w}px`;
      } else {
        scroll.current.style.left = defaultParallaxPosX;
      }
    }
  }, [windowSize, defaultParallaxPosX]);

  React.useEffect(() => {
    htmlDoc.current = document.documentElement;
    function getScroll() {
      return htmlDoc.current ? htmlDoc.current.getBoundingClientRect().top : 0;
    }
    function setStyle() {
      if (scroll.current) {
        scroll.current.style.transform = `translateY(${getScroll() - 20}px)`;
      }
    }
    function scrollChange() {
      window.requestAnimationFrame(setStyle);
    }

    scrollChange();

    window.addEventListener('scroll', scrollChange);
    return () => {
      window.removeEventListener('scroll', scrollChange);
    };
  }, []);

  return (
    <StyledWrapper>
      <StyledMenu>
        <LinkWrapper>
          <MenuLink to='/'>Hem</MenuLink>
          <MenuLink to='/ansokan'>Ansökan</MenuLink>
          <MenuLink to='/barnen'>Barnen</MenuLink>
          <MenuLink to='/foraldrar'>Föräldrarna</MenuLink>
          <MenuLink to='/pedagogerna'>Pedagogerna</MenuLink>
        </LinkWrapper>
        <StyledFallback />
        <StyledParallax ref={scroll} $doc={htmlHeight.current} />
      </StyledMenu>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledParallax = styled.div<StyleProps>`
  position: absolute;
  width: calc(100% + ${() => useGetGap(4)});
  width: 1200px;
  min-height: 1000px;
  height: ${({ $doc }) => $doc}px;
  background-image: url(${bg});
  background-size: 500px 500px;
  background-repeat: repeat;
  will-change: transform;
  left: -${() => useGetGap(4)};
  z-index: -1;
`;

const StyledFallback = styled.div`
  background-color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -2;
`;

const StyledMenu = styled.nav`
  display: flex;
  position: relative;
  width: calc(100% - ${() => useGetGap(8)});
  max-width: 1200px;
  height: ${({ theme }) => theme.gap.menu}px;
  color: ${({ theme }) => theme.colors.ctaText};
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
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
