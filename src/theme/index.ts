import { extendTheme } from "native-base";

export const theme = extendTheme({  
  fontConfig: {
    Inter: {
      100: {
        normal: "Inter-Thin",
      },
      200: {
        normal: "Inter-Light",
      },
      300: {
        normal: "Inter-Light",
      },
      400: {
        normal: "Inter-Regular"
      },
      500: {
        normal: "Inter-Medium",
      },
      600: {
        normal: "Inter-SemiBold"
      },
      700: {
        normal: "Inter-Bold"
      }
  }
},
  fonts : {
    header : 'Inter',
    medium : 'Inter',
    regular : 'Inter',
    body: "Inter",
    mono: "Inter",
  },
  colors : {
     primary: {
        200 : '#FEA971',
        300: 'rgba(204, 61, 0, .7)',
        500: 'rgba(204, 61, 0, .9)',
        800: 'rgba(204, 61, 0, 1)',
        600: '#FE6603',
      },
     secondary: {
        200 : '#FEA971',
        300: 'rgba(204, 61, 0, .7)',
        500: 'rgba(204, 61, 0, .9)',
        800: 'rgba(204, 61, 0, 1)',
        600: '#FE6603',
      },
    background: '#fff',
    accent: '#f1c40f',
    secondaryContainer : '#f5f5f5',
    
  },
  dark: false,
  config: {
    useSystemColorMode: false
  },

});