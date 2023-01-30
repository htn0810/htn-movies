/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      xs: "360px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        overlay: `rgba(25, 25, 25, 0.1)`,
        signUpbg: `#191919`,
        mainColor: "#FEFEFE",
        grayColorText: "rgba(186, 186, 186, 0.7);",
        grayDarkText: "#BABABA",
        blackText: "#191919",
        primaryColorBg: "#191919",
        secondaryColorBg: "#212121",
        primarySidebarText: "#3DD2CC",
        secondarySidebarText: "#666666",
        hoverColorText: "rgb(61,210,204)",
        hoverColorBg: "rgba(61,210,204,0.4)",
        hoverColorBorder: "rgba(61,210,204,0.75)",
        textHomePage: "#E8E8E8",
        categoryOverlay: "rgba(232, 232, 232, 0.25)",
        overlayApp: "rgba(11, 12, 23, 0.48)",
      },
      backgroundImage: {
        signInPhoto: "url('/public/Sign-In.jpg')",
        signUpPhoto: "url('/public/Sign-Up.jpg')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    // ...
  ],
};
