import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';

import { configureDatabase, defaultDBPath, defaultDBData } from './config/database';
import { StaticPage } from '../client/components/StaticPage';

const db = configureDatabase(defaultDBPath, defaultDBData);
const { siteName } = db.get('settings').value();
const pages = db.get('pages').value();

console.log('Number of pages:', pages.length);

pages.forEach((page) => {
  const { id: pageId, slug } = page;

  console.log(`rendering html for page ${slug}`);

  const linkList = pages.map(({
    id: linkId,
    slug,
    title: label,
  }) => ({
    url: `${slug}.html`,
    label,
    current: linkId === pageId,
  }));

  const reactDom = renderStylesToString(renderToString(
    <StaticPage {...{ siteName, linkList, page }} />
  ));

  if (slug.match(/^\w+$/)) {
    const path = process.cwd() + `/STATIC_WEBSITE/${slug}.html`;
    const html = `<!DOCTYPE html>${reactDom}`;
    
    fs.writeFile(path, html, (err) => {
      if (err) throw err;
      console.log(`${slug}.html saved!`);
    });
  }
});
