
export const LightTheme = {
  dark: false,
  roundness: 4,
  toolbar: {minHeight: 56},
  colors: {
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: 'white',
    error: '#B00020',
    text: 'black',
    onBackground: '#000000',
    onSurface: '#000000',
  },
  // transitions: {
  //   easing: {
  //     easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  //     easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  //     easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  //     sharp: "cubic-bezier(0.4, 0, 0.6, 1)"},
  //   duration: {
  //     shortest: 150,
  //     shorter: 200,
  //     short: 250,
  //     standard: 300,
  //     complex: 375,
  //     enteringScreen: 225,
  //     leavingScreen: 195,
  //   },
  // },
  // zIndex: {
  //   mobileStepper: 1000,
  //   speedDial: 1050,
  //   appBar: 1100,
  //   drawer: 1200,
  //   modal: 1300,
  //   snackbar: 1400,
  //   tooltip: 1500
  // }
};

export const DarkTheme = {
  ...LightTheme,
  dark: true,
  mode: 'adaptive',
  toolbar: {minHeight: 56},
  colors: {
    ...LightTheme.colors,
    primary: '#BB86FC',
    accent: '#03dac6',
    background: '#121212',
    surface: '#121212',
    error: '#CF6679',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    text: 'white',
}
}
