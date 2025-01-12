const fs = require("node:fs");
const path = require("node:path");

const mockPath = path.resolve(__dirname, "../styles/theme-mock.css");
const appThemePath = path.resolve(__dirname, "../styles/app.theme.css");

try {
  const mock = fs.readFileSync(mockPath, "utf-8");
  const refinedMock = mock.replaceAll("hsl(", "").replaceAll(")", "").replaceAll(",", "");

  // todo - add code to remove all comments
  fs.writeFileSync(appThemePath, refinedMock, "utf-8");
  console.log("App theme has been modified.");
} catch (ex) {
  console.log(ex.message);
}
