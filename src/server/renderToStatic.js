const fs = require('fs');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { configureDatabase, defaultDbPath, defaultDbData } = require('./config/database');
const { StaticWrapper } = require('../client/components/StaticWrapper');
const { PageTemplate } = require('../client/modules/page/PageTemplate');

const db = configureDatabase(defaultDbPath, defaultDbData);
const { siteName } = db.get('settings').value();
const pages = db.get('pages').value();

console.log('Number of pages:', pages.length);

pages.forEach(({ id, title }) => {
  console.log(`rendering html for page ${id}`);

  const linkList = pages.map(({
    id: linkId,
    title: label,
  }) => ({
    url: `${linkId}.html`,
    label,
    current: linkId === id,
  }));

  const reactDom = renderToString(
    React.createElement(
      StaticWrapper,
      { siteName, pageTitle: title, linkList },
      React.createElement(
        PageTemplate, 
        { title },
      )
    )
  );

  if (id.match(/^\w+$/)) {
    const path = process.cwd() + `/STATIC/${id}.html`;
    const html = `<!DOCTYPE html>${reactDom}`;
    
    fs.writeFile(path, html, (err) => {
      if (err) throw err;
      console.log(`${id}.html saved!`);
    });
  }
});
