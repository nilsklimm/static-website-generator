# Static Website Generator

## Installation

This project is written in [node](https://nodejs.org), so please install it now, if you haven't already done so...

Download the project from GitHub:

```bash
git clone https://github.com/nilsklimm/static-website-generator.git
```

When the download is done, move into the project folder and install all necessary software dependenies:

```bash
cd static-website-generator;
npm install
```

The postinstall script will automatically build the application afterwards.

## Edit settings and pages

The following command will start the application and opens the admin ui in your default browser:

```bash
npm start
```

## Generate static website files

```bash
npm run renderToStatic
```

The generated files can be found under: `/STATIC_WEBSITE`
