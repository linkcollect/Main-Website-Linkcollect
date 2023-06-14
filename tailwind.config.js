/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx}'
  ],
  theme: {
    extend: {},
    colors:{
      bgPrimary:"#ffffff",
      bgSecondary:"#f9f9f9",
      primary:"#6166f1",
      secondary:"#ebecfd",
      textPrimary:"#232438",
      textSecondary:"#a9a9b8",
      danger:"#ff0000",
      gradientEnd:"#9092FF",
      gradinetInitial:"rgba(144, 146, 255, 0)",
      grey:"#E4E4F2",
      textDark: "#080024", 
      borderPrimary:"#ededed",
      inputBackground: "rgba(234,234,234,0.5)",
      inputBorder: "rgba(75, 78, 252, 0.08)",
      editBackground: "rgba(125, 125, 125, 0.6)",
      editOptionBackground: "#E6E6FF",
      bookmarkItemBG: "#E8E8FC",
      lightGrey: "#6B6C80",
      lightGrey2: "#F3F3F6",
     
      
    }
  },
  plugins: [],
}