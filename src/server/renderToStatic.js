const fs = require('fs');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { configureDatabase, defaultDbPath, defaultDbData } = require('./config/database');
const { StaticPage } = require('../client/components/StaticPage');

const db = configureDatabase(defaultDbPath, defaultDbData);
const { siteName } = db.get('settings').value();
const pages = db.get('pages').value();

console.log('Number of pages:', pages.length);

pages.forEach((page) => {
  const { id: pageId } = page;

  console.log(`rendering html for page ${pageId}`);

  const linkList = pages.map(({
    id: linkId,
    title: label,
  }) => ({
    url: `${linkId}.html`,
    label,
    current: linkId === pageId,
  }));

  const reactDom = renderToString(
    React.createElement(
      StaticPage,
      { siteName, linkList, page },
    )
  );

  if (pageId.match(/^\w+$/)) {
    const path = process.cwd() + `/STATIC/${pageId}.html`;
    const html = `<!DOCTYPE html>${reactDom}`;
    
    fs.writeFile(path, html, (err) => {
      if (err) throw err;
      console.log(`${pageId}.html saved!`);
    });
  }
});
