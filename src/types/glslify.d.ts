declare module 'glslify' {
  interface GlslifyOption {
    basedir?: string;
    transform?: any;
  }
  interface Glslify {
    (template: TemplateStringsArray, ...args: any[]): string;
    (file: any, option?: GlslifyOption);
    compile(src: string, option?: GlslifyOption): string;
    filename(filename: string, option?: GlslifyOption): string;
  }

  const glsl: Glslify;
  export default glsl;
}
declare module 'babel-plugin-glsl/macro' {
  interface GlslifyOption {
    basedir?: string;
    transform?: any;
  }
  interface Glslify {
    (template: TemplateStringsArray, ...args: any[]): string;
    (file: any, option?: GlslifyOption);
    compile(src: string, option?: GlslifyOption): string;
    filename(filename: string, option?: GlslifyOption): string;
  }

  const glsl: Glslify;
  export default glsl;
}

declare module '*.glsl' {
  const value: string;
  export default value;
}
declare module '*.vert' {
  const value: string;
  export default value;
}
declare module '*.frag' {
  const value: string;
  export default value;
}
