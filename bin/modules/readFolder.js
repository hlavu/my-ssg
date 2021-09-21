const fs = require("fs");
const fileModule = require("./readFile");
const html = require("./generateHTML");
const path = require("path");
var body = "";

module.exports.readFolder = function (inputPath, cssLink, outputContainer) {
    fs.readdir(inputPath, function (err, files) {
        if (err) {
            return console.log(err);
        }

        var sortedFile = files.filter(
            (file) => path.extname(`${inputPath}/${file}`) === ".txt"
        );

        sortedFile.forEach(function (file) {
            var fileName = fileModule.readFile(
                `${inputPath}/${file}`,
                cssLink,
                outputContainer
            );

            var url = `./${encodeURI(fileName)}.html`;

            // index.html body
            body += `<h5><a href=\"${url}\">${fileName}</h5>\n`;
        });

        // create index.html
        html.generateHTML(
            "index",
            cssLink,
            `<h4>Generated Sites</h4>\n${body}`,
            outputContainer
        );
    });
};
