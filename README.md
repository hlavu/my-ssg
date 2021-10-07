# my-ssg

My Static Site Generator is a command line tool created to convert `.txt` or `.md` file into a `.html` file by using Node.js.

## Features

-   Allows user to specify a URL to a `CSS stylesheet` or a language used in the created HTML files if they hope to
-   If users' input is a folder, an `index.html` file will be generated automatically and linked to other generated HTML files.
-   All generated HTML files will be stored in `./dist` folder which is created by default
-   If the input is a markdown file, all Markdown's `Heading1`, `Heading2`, `Link`, `inline code` and `horizontal rule` will be converted into their corresponding HTML element.

## Options

| Option                                      | Function                                            |
| ------------------------------------------- | --------------------------------------------------- |
| -i, --input <'path-to-txt'> `required`      | specifies an `input` file or folder to be processed |
| -v, --version                               | shows tool's name and the version number            |
| -h, --help                                  | displays all available options                      |
| -s, --stylesheet <'link-to-css-stylesheet'> | applies css link to `<head>` of HTML file           |
| -l, --lang <'lang code'> Default value is `en-CA`| applies specified lang code to `<html>` of HTML file|
| -c, --config <'config file'>                | use to store `input` or `output` or `lang` to be processed |

## Usage

1. For converting a single text file:

```
node index.js -i testing.txt
```

2. For converting a single markdown file:

```
node index.js -i testing.md
```

3. For converting a folder with multiple text/markdown files:

```
node index.js -i testing
```

4. For converting a single text file and adding a CSS stylesheet:

```
node index.js -i 'Silver Blaze.txt' -s 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css'

```

5. For converting a single text file and specifying a language:

```
node index.js -i 'Silver Blaze.txt' -l vi

```

6. For using config file:
```
node index.js -c filename.json
```

## Example

1. testing.txt -> command: `node index.js -i testing.txt -s https://cdn.jsdelivr.net/npm/water.css@2/out/water.css -l en`

testing.txt
```
This is a sentence!

This is a paragraph: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s.
```

Transfered into:

./dist/testing.html

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>      
        <title>testing</title>
        <meta charset="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
        />
    </head>
    <body>
        <p>This is a sentence!</p>

        <p>
            This is a paragraph: Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s.
        </p>
    </body>
</html>
```

2. testing.md -> command: `node index.js -i testing.md`

```
# MY-SSG

My Static Site Generator is a command line tool created to convert `.txt` or `.md` file into a `.html` file by using Node.js.

## Features:

-   Automatically parse title from input. (A title is defined by being the first line followed by 2 blank lines)
-   All generated HTML files will be placed into a `./dist` folder
-   All generated HTML files comes with [Water.css](https://github.com/kognise/water.css) by default.
-   Users can specify a URL to a CSS stylesheet.
```

Transfered into:
./dist/testing.html

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <title>testing</title>
        <meta charset="utf-8" />

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
        />
    </head>
    <body>
        <h1>MY-SSG</h1>

        <p>
            My Static Site Generator, is a command line tool, created to convert
            <code>.txt</code> or <code>.md</code> file into a <code>.html</code> file by using Node.js.
        </p>

        <h2>Features:</h2>

        <p>
            - Automatically parse title from input. (A title is defined by being
            the first line followed by 2 blank lines) - All generated HTML files
            will be placed into a <code>./dist</code> folder - All generated HTML files
            comes with
            <a href="https://github.com/kognise/water.css">Water.css</a> by
            default. - Users can specify a URL to a CSS stylesheet.
        </p>
    </body>
</html>
```

## Author

[Vivian Vu](https://dev.to/vivianvu)
