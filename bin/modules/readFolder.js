const fs = require("fs");
const fileModule = require("./readFile");
const { readMDFile } = require("./readMDFile");
const html = require("./generateHTML");
const path = require("path");
let body = "";

module.exports.readFolder = function (inputPath, cssLink, outputContainer) {
    fs.readdir(inputPath, function (err, files) {
        if (err) {
            return console.log(err);
        }

        const sortedFile = files.filter(
            (file) => path.extname(`${inputPath}/${file}`) === ".txt"
        );

        sortedFile.forEach(function (file) {
            const fileName = fileModule.readFile(
                `${inputPath}/${file}`,
                cssLink,
                outputContainer
            );

            const url = `./${encodeURI(fileName)}.html`;

            // index.html body
            body += `<h5><a href=\"${url}\">${fileName}</h5>\n`;
        });

        // Sorted the array of directory's content and filter only ".md" files
        const sortedMDFile = files.filter(
            (file) => path.extname(`${inputPath}/${file}`) === ".md"
        );

        sortedMDFile.forEach(function (file) {
            const fileName = readMDFile(
                `${inputPath}/${file}`,
                cssLink,
                outputContainer
            );

            const url = `./${encodeURI(fileName)}.html`;

            // Add links of the generated HTML files to index.html body
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
