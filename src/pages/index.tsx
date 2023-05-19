import * as React from 'react';
import * as Gatsby from 'gatsby';
import Hero from 'components/Hero';
import WaveSection from 'components/WaveSection';
import { useTheme } from 'styled-components';
import Header, { HeaderTypes } from 'components/Header';
import Text from 'components/Text';
import SpeechBubbleSection from 'components/SpeechBubbleSection';
import ImageCarousel from 'components/ImageCarousel';
import InformationSection from 'components/InformationSection';
import EndingSection from 'components/EndingSection';

interface HomepageProps {}

export default function Homepage(props: HomepageProps) {
  const theme = useTheme();
  const handleClick = async () => {
    try {
      const id = 'someid';
      const ya = await fetch(`/api/google-sheets?query=${id}`);
      console.log(ya);

      if (!ya.ok) {
        throw new Error(ya.statusText);
      }
      const result = await ya.json();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Hero
        title={'Vildrosen'}
        ingress={
          'En kooperativ förskola för alla barn som ska få vara precis hur de vill.'
        }
        cta={{
          label: 'Ansök nu!',
          ariaLabel: 'Gå till ansökan',
          interaction: '/ansok',
        }}
      />
      <WaveSection bg={theme.colors.palette[4]}>
        <Header type={HeaderTypes.H2} mb={true}>
          Om förskolan
        </Header>
        <Text mb={0}>
          På förskolan jobbar vi mycket med att äta mat. Det blir väldigt mycket
          mat. Frukt också. Om man gillar frukt så är det helt grymt att gå på
          förskolan. Alla barn gillar frukt. Inte alla frukter, men i alla fall
          någon. Hugo kanske gillar banan? Dante gillar faktiskt de flesta
          frukter. Och bär! Tomat är tekniskt sätt ett bär. Det kanske ni inte
          visste. Men nu vet ni det. Majs däremot räknas som en frukt. Och
          rabarber är egentligen en grönsak. Banan är också ett bär tillsammans
          med paprika. Om man nu ska vara teknisk.
        </Text>
      </WaveSection>
      <SpeechBubbleSection
        question='Men hallå eller, hur mycket jobb är det egentligen att vara med i ett kooperativ?'
        answer='I ett kooperativ så får en hjälpa till. Vi är samtidigt medvetna om att ingen tycker att det är det roligaste i världen att spendera en kväll med att städa på en förskola. Så vi gör vårt bästa för att hålla nere tiden man måste vara på plats. Men det finns en annan sida av samma mynt. Som medlem i kooperativet så får man möjlighet att påverka hur dagarna ser ut för barnen, samt att man lär känna sitt barns vänner och dess föräldrar på ett helt annat sätt.'
      ></SpeechBubbleSection>
      <ImageCarousel
        header='Vildrosen i bilder!'
        images={
          Array.from({ length: 12 })
            .fill('')
            .map(
              (_, i) => `https://source.unsplash.com/random/?kids,${i}`
            ) as string[]
        }
      />
      <InformationSection>
        <Header type={HeaderTypes.H2} mb fancy>
          Vår pedagogiska verksamhet
        </Header>
        <Text>
          Vi är en liten och trygg barngrupp i stora lokaler alldeles vid Gröna
          gatans park. Hos oss arbetar fyra fantastiska pedagoger med att skapa
          bästa tänkbara förskola. Här får omsorg, lek och lärande bilda en
          helhet som gör att varje barn får chans att utvecklas till sin fulla
          potential.
        </Text>
        <Text>
          Pedagogiken genomsyras av normkreativitet, vilket betyder att vi
          lyfter fram olika sätt att vara och leva. Barnen tar aktivt del i
          arbetet med hållbar utveckling, bland annat genom att vistas i
          skogsmiljö där barn och pedagoger tillsammans får chans att förundras
          över naturens växlingar. Genom att tillsammans reflektera kring det vi
          upplevt ser vi hur lärandet blir både roligt och meningsfullt,
          samtidigt som barnens samspel och empatiska förmågor utvecklas.
        </Text>
        <Text>
          Den pedagogiska verksamheten utgår från Läroplan för förskola (Lpfö
          18).
        </Text>
      </InformationSection>
      <EndingSection
        title='Hej igen'
        text='Tycker du det låter intressant så skicka iväg en ansökan.'
        button={{
          interaction: '/ansok',
          label: 'Ansök nu!',
          ariaLabel: 'Gå till ansökan',
        }}
      />
      {/* <div style={{ height: '400px', backgroundColor: 'red' }}>
        <button onClick={() => handleClick()}>click me</button>
      </div>
      <div style={{ height: '400px', backgroundColor: 'lightblue' }}></div>
      <div style={{ height: '400px', backgroundColor: 'cornflowerblue' }}></div>
      <div style={{ height: '400px', backgroundColor: 'olive' }}></div> */}
    </>
  );
}

export const Head: Gatsby.HeadFC = () => <title>Vildrosen</title>;
