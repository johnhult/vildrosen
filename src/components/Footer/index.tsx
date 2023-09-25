import Divider from 'components/Divider';
import Header, { HeaderTypes } from 'components/Header';
import SectionWrapper from 'components/SectionWrapper';
import Text from 'components/Text';
import { Link } from 'gatsby';
import { minWidth, pY, useGetGap } from 'helpers/style';
import * as React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <StyledFlex>
        <div>
          <Header type={HeaderTypes.H3} color='inherit'>
            Vildrosen
          </Header>
        </div>
        <div>
          <Text mb={0}>Föräldrakooperativ Vildrosen</Text>
          <Text mb={0}>Karl Johansgatan 98B</Text>
          <Text mb={0}>414 55, Göteborg</Text>
          <Divider $length={'50%'} $color='white' />
          <div>
            <iframe
              title='Google Maps position'
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8529.69684147782!2d11.917487!3d57.6922624!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff334ebee0cdb%3A0xccb0e9a4b6f8de3a!2sF%C3%B6r%C3%A4ldrakooperativet%20Vildrosen!5e0!3m2!1sen!2sse!4v1684523221218!5m2!1sen!2sse'
              width='100%'
              height='200'
              style={{ border: 0 }}
              allowFullScreen={false}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
        <div>
          <TextLink forwardedAs={Link} to='/hem'>
            Hem
          </TextLink>
          <TextLink forwardedAs={Link} to='/ansok'>
            Ansök
          </TextLink>
          <TextLink forwardedAs={Link} to='/barn'>
            Barnen
          </TextLink>
          <TextLink forwardedAs={Link} to='/foraldrar'>
            Föräldrarna
          </TextLink>
          <TextLink forwardedAs={Link} to='/pedagoger'>
            Pedagogerna
          </TextLink>
        </div>
      </StyledFlex>
      <Divider $h={1} $color='white' />
      <Sign>
        Made with &lt;3 by <a href='https://iamjohnhult.com'>@iamjohnhult</a>
      </Sign>
    </StyledFooter>
  );
};

const StyledFooter = styled(SectionWrapper)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.ctaText};
  color: white;
`;

const TextLink = styled(Text)`
  color: inherit;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: auto;
  & > div {
    flex: 1 0 33.33333%;
  }
  ${({ theme }) => minWidth(theme.breakpoints.tablet.asNumber)} {
    flex-direction: row;
    & > div:last-of-type {
      text-align: end;
    }
  }
`;

const Sign = styled(Text)`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: auto;
  white-space: pre;
  margin-top: ${() => useGetGap(4)};
  a {
    color: inherit;
  }
`;

export default Footer;
