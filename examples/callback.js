import fs from 'fs';

fs.readdir('.', (err, filenames) => {
  if (err) throw err;
  console.log(`Number of Directory Entries: ${filenames.length}`);
  filenames.forEach((name) => {
    fs.stat(name, (err, stats) => {
      if (err) throw err;
      let result = stats.isFile() ? 'file' : 'directory';
      console.log(name, 'is a', result);
    });
  });
});