import * as React from 'react';
import * as THREE from 'three';
import { useGetGap, useGetGapNumber } from 'helpers/style';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Plane, useTexture } from '@react-three/drei';
import { validatePerspectiveCamera } from 'lib/Three';
import { degToRad, lerp, mapLinear, radToDeg } from 'three/src/math/MathUtils';
import { cover } from 'helpers/three';
import Header, { HeaderTypes } from 'components/Header';

type ImageCarouselProps = {
  images: string[];
  header?: string;
};

const innerDimensions = (node: HTMLElement) => {
  var computedStyle = getComputedStyle(node);

  let width = node.clientWidth; // width with padding
  let height = node.clientHeight; // height with padding

  height -=
    parseFloat(computedStyle.paddingTop) +
    parseFloat(computedStyle.paddingBottom);
  width -=
    parseFloat(computedStyle.paddingLeft) +
    parseFloat(computedStyle.paddingRight);
  return { height, width };
};

const ImageCarouselCanvasContent: React.FC<ImageCarouselProps> = ({
  images,
}) => {
  const groupRef = React.useRef<THREE.Group>(null);
  const planeSize = React.useRef(5);
  /**
   * Find apothem (inradius) of a regular polygon
   * https://www.mathopenref.com/apothem.html
   */
  const inradius = React.useMemo(() => {
    const { current: ps } = planeSize;
    return ps / (2 * Math.tan(Math.PI / images.length));
  }, [planeSize, images]);
  const planesRef = React.useMemo(
    () =>
      Array.from({ length: images.length }).map(() =>
        React.createRef<
          THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
        >()
      ),
    [images]
  );
  const imageTextures = useTexture(
    images.map((i) => i),
    (texs) => {
      if (Array.isArray(texs)) {
        texs.forEach((t) => {
          t.matrixAutoUpdate = false;
          cover(t, 1);
        });
      } else {
        texs.matrixAutoUpdate = false;
        cover(texs, 1);
      }
    }
  );
  const { camera } = useThree();
  const fovNr = React.useMemo(() => {
    if (validatePerspectiveCamera(camera)) {
      const dist = camera.position.z;
      // convert vertical fov to radians
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      // visible height
      const height = 2 * Math.tan(vFOV / 2) * dist;
      // visible width
      const width = height * camera.aspect;
      return { width, height };
    }
    return { width: 0, height: 0 };
  }, [camera]);

  // --------- Effects
  React.useLayoutEffect(() => {
    if (groupRef.current) {
      const { current: g } = groupRef;
      g.position.z = -inradius;
    }
  });
  // React.useEffect(() => {
  //   imageTextures.forEach((tex, i) => {
  //     // tex.
  //     console.log(tex.matrix);
  //   });
  // }, [imageTextures, planesRef]);

  let a = 0;
  useFrame((state, delta) => {
    if (groupRef.current) {
      const { current: g } = groupRef;
      const rotY = state.mouse.x * Math.PI;
      g.rotation.y = rotY;

      // Half the angle between every image 2π/x*1/2 = π/x
      const angleAtEdge = Math.PI / images.length;
      // Map rotation to -1,1
      const mapped =
        mapLinear(
          rotY - angleAtEdge,
          -Math.PI - angleAtEdge,
          Math.PI - angleAtEdge,
          0,
          images.length
        ) + (images.length % 2 === 0 ? 0.5 : 0);
      const index =
        (images.length - Math.floor(mapped) + Math.floor(images.length / 2)) %
        images.length;

      planesRef.forEach((plane, i) => {
        if (plane.current) {
          const { current: pr } = plane;
          if (index !== i) {
            const sc = lerp(pr.scale.x, 0.6, 0.1);
            pr.scale.set(sc, sc, sc);
          }
        }
      });
      if (planesRef[index] && planesRef[index].current) {
        // Null check before
        const pri = planesRef[index].current!;
        const sc = lerp(pri.scale.x, 1.2, 0.1);
        pri.scale.set(sc, sc, sc);
      }

      // if (a % 240 === 0) {
      //   console.log({
      //     index,
      //     mapped,
      //     rotY: radToDeg(rotY),
      //     rotYSub: radToDeg(rotY - angleAtEdge),
      //     halfAngle: radToDeg(angleAtEdge),
      //   });
      // }

      a++;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {imageTextures.map((_, i) => {
        const imageProps = {
          position: [0, 0, 0] as [x: number, y: number, z: number],
          rotation: [0, 0, 0] as [x: number, y: number, z: number],
        };
        const angleRad = degToRad(360 / images.length) * i + Math.PI / 2;
        const x = inradius * -Math.cos(angleRad);
        // Name is z since it's a circle from above
        const z = inradius * Math.sin(angleRad);

        imageProps.position = [x, 0, z];
        imageProps.rotation = [0, angleRad + (3 * Math.PI) / 2, 0];

        return (
          <Plane
            ref={planesRef[i]}
            key={imageTextures[i].uuid}
            args={[planeSize.current, planeSize.current]}
            position={imageProps.position}
            rotation={imageProps.rotation}
          >
            <meshBasicMaterial map={imageTextures[i]} side={THREE.DoubleSide} />
          </Plane>
        );
      })}
    </group>
  );
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, header }) => {
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [showCanvas, setShowCanvas] = React.useState(false);

  React.useLayoutEffect(() => {
    if (wrapper.current) {
      setShowCanvas(true);
    }
  }, []);

  return (
    <StyledWrapper ref={wrapper}>
      <Header type={HeaderTypes.H3} mb>
        {header}
      </Header>
      {showCanvas && (
        <Canvas
          camera={{
            fov: 75,
            near: 0.1,
            far: 100,
            position: [0, 0, 5],
            aspect: wrapper.current
              ? innerDimensions(wrapper.current).width / 500
              : 0,
          }}
          style={{ height: '500px' }}
        >
          <ImageCarouselCanvasContent images={images} />
        </Canvas>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: ${() => useGetGap(16)} 0;
  background-color: ${({ theme }) =>
    transparentize(0.3, theme.colors.palette[2])};
  overflow: hidden;
`;

export default ImageCarousel;
