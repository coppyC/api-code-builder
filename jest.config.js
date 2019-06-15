module.exports = {
  "roots": [
    "<rootDir>/src",
    "<rootDir>/test",
  ],
  "transform": {
    "\\.hbs$": "handlebars-jest"
  },
  "globals": {
    "handlebars-jest": {
      "helperDirs": [
        "<rootDir>/src/helpers"
      ],
      "partialDirs": [
        "<rootDir>/src/partials"
      ]
    }
  },
  "moduleNameMapper": {
    "^([^\\/]*)\\.hbs$": "<rootDir>/src/template/$1.hbs",
  }
}
