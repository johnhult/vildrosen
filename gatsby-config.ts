import type { GatsbyConfig } from 'gatsby';
import path from 'path';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: 'https://gatsbydatocmshomepage.gatsbyjs.io/',
    title: 'Vildrosen',
    author: `John Hult`,
    description: 'Page for Vildrosen kindergarten',
  },
  graphqlTypegen: true,
  trailingSlash: 'never',
  plugins: [
    `gatsby-plugin-glslify`,
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: process.env.DATOCMS_API_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        root: path.join(__dirname, 'src'),
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Poppins`,
            file: `https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700;900&display=swap`,
          },
          {
            name: 'DynaPuff',
            file: 'https://fonts.googleapis.com/css2?family=DynaPuff:wght@400;500&display=swap',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /gfx/,
        },
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
  ],
};

export default config;
