// put in seperate file to keep main sequelize-auto clean
"use strict";

var Sequelize = require("sequelize");
var _ = Sequelize.Utils._;

function generateTableModels(
  tableNames,
  isSpaces,
  indentation,
  isCamelCase,
  isCamelCaseForFile
) {
  var spaces = "";
  for (var i = 0; i < indentation; ++i) {
    spaces += isSpaces === true ? " " : "\t";
  }

  return generateImports() + generateTableMapper();

  function generateImports() {
    var fileTextOutput = "// eslint:disable\n";
    fileTextOutput += "const path=require('path');\n\n";
    return fileTextOutput;
  }

  function generateTableMapper() {
    var fileTextOutput = "module.exports= function(seq){\n";
    fileTextOutput += spaces + "const tables = {\n";
    for (var i = 0; i < tableNames.length; i++) {
      var tableForClass = isCamelCase
        ? _.camelCase(tableNames[i])
        : tableNames[i];
      var tableForFile = isCamelCaseForFile
        ? _.camelCase(tableNames[i])
        : tableNames[i];

      fileTextOutput +=
        spaces +
        spaces +
        tableForClass +
        ": seq.import(path.join(__dirname, './" +
        tableForFile +
        "')),\n";
    }
    fileTextOutput += spaces + "};\n";
    fileTextOutput += spaces + "return tables;\n";
    fileTextOutput += "};\n";
    return fileTextOutput;
  }
}

exports.model = {
  generateTableModels
};
