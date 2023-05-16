declare module '*.svg' {
  import React = require('react');
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.png' {
  const content: string;
  export default string;
}
declare module '*.jpg' {
  const content: string;
  export default string;
}
declare module '*.jpeg' {
  const content: string;
  export default string;
}
