const stubLanguage = language => {
  return {
    onBeforeLoad(win) { 
      Object.defineProperty(
        win.navigator, 
        'language', { 
          value: language[0]
        }
      );
      Object.defineProperty(
        win.navigator, 
        "languages", {
          value: [language[0], language[1]]
        }
      );
    }
  }
}
export default stubLanguage;