const fs = require("fs");
const html = require("./generateHTML");
const path = require("path");
var body = "";

module.exports.readMDFile = function (inputPath, cssLink, outputContainer) {
    try {
        const data = fs.readFileSync(inputPath, "utf8");
        body = data
            // Search for all occurences of Markdown links and replace them with the corresponding <a> tags.
            .replace(/(?<!!)\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
            .split(/\r?\n\r?\n/)
            .map((para) => {
                // For each "paragraph", search for any occurence of Markdown heading (# [string] or ## [string]) and replace them with the corresponding HTML header tag (h1 or h2). If heading not found, replace the "paragraph" with <p> tag.
                if (para.startsWith("# ")) {
                    return `<h1>${para.replace(/# /, "")}</h1>\n\n`;
                } else if (para.startsWith("## ")) {
                    return `<h2>${para.replace(/# /, "")}</h2>\n\n`;
                }
                return `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`;
            })
            .join(" ");
    } catch (err) {
        console.error(err);
    }

    const title = path.basename(inputPath, ".txt");

    html.generateHTML(title, cssLink, body, outputContainer);
    return title;
};
