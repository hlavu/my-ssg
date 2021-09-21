# my-ssg
My Static Site Generator, is a command line tool, created to convert `.txt` into a `.html` file by using Node.js.

## Features
* Allows user to specify a URL to a `CSS stylesheet` if they hope to
* If users' input is a folder, an `index.html` file will be generated automatically and linked to other generated HTML files.
* All generated HTML files will be stored in `./dist` folder which is created by default

## Options
Option | Function
------------ | -------------
-i, --input <'path-to-txt'> `required` |  specifies an `input` file or folder to be processed
-v, --version | shows tool's name and the version number
-h, --help | displays all available options 
-s, --stylesheet <'link-to-css-stylesheet'> | applies css link to `<head>` of HTML file

## Usage
1. Convert `testing.txt` into `testing.html`

```
node index.js -i testing.txt 
```
2. Convert all `.txt` files in testing folder into `.html` files

```
node index.js -i testing
```
3. Convert `Silver Blaze.txt` into `Silver Blaze.html` which takes `https://cdn.jsdelivr.net/npm/water.css@2/out/water.css` as its style sheet

```
node index.js -i 'Silver Blaze.txt' -s 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css'
```
## Example 

testing.txt   -> command: `node index.js -i testing.txt -s https://cdn.jsdelivr.net/npm/water.css@2/out/water.css`
```
This is a sentence!

This is a paragraph: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
industry's standard dummy text ever since the 1500s.
```

Transfered into:

./dist/testing.html
```
<!doctype html>
<html lang="en" dir="ltr">
<head>
<title>testing</title>
<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">


</head>
<body>
<p>This is a sentence!</p>

<p>This is a paragraph: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
industry's standard dummy text ever since the 1500s.</p>

</body>
</html>
```

## Author
[Vivian Vu](https://dev.to/vivianvu)


