import React, { useState, ChangeEvent, Fragment } from 'react';
import * as OS from 'opensubtitles-api';

import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import { downloadFile } from '../utils/progress';

const OpenSubtitles = new OS({ useragent: 'UserAgent', ssl: true });

export default function Home(): JSX.Element {
  const [selecedFile, setSelectedFile] = useState<File | null>(null);
  const [searchResp, setSearchResp] = useState<any>(null);

  const onProgress = (received: any, total: any) => {
    const percentage = (received * 100) / total;
    console.log(`${percentage}% | ${received} bytes out of ${total} bytes.`);
  };

  const onSelection = (selectedItem: any) => {
    if (!selecedFile) return;
    const destinationpath = selecedFile.path.replace(
      selecedFile.name,
      `${selecedFile.name.split('.').slice(0, -1).join('.')}.srt`
    );
    // console.log(selectedItem.url, 'XX');
    downloadFile(selectedItem.url, destinationpath, onProgress);
  };

  const onFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files && e.target.files[0];
    try {
      if (file) {
        setSelectedFile(file);
        const searchObj: any = {
          // sublanguageid: 'en', // Can be an array.join, 'all', or be omitted.
          // // hash: '8e245d9679d31e12', // Size + 64bit checksum of the first and last 64k
          // filesize: `${file.size}`, // Total size, in bytes.
          // path: file.path, // Complete path to the video file, it allows to automatically calculate 'hash'.
          // filename: file.name, // The video file name. Better if extension is included.
          // season: '2',
          // episode: '3',
          // extensions: ['srt', 'vtt'], // Accepted extensions, defaults to 'srt'.
          limit: 'all', // Can be 'best', 'all' or an arbitrary nb. Defaults to 'best'
          // imdbid: '528809', // 'tt528809' is fine too.
          // fps: '23.96', // Number of frames per sec in the video.
          query: file.name, // Text-based query, this is not recommended.
          gzip: false, // returns url to gzipped subtitles, defaults to false
        };

        const resp = await OpenSubtitles.search(searchObj);
        setSearchResp(resp);

        // const newFile = fs.createWriteStream(selectedItem.filename);
        // const request = http.get(selectedItem.url, function (response) {
        //   response.pipe(newFile);
        // });
        console.log(resp);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Home</h2>
      <input
        type="file"
        accept="video/mp4,video/x-m4v,video/*"
        multiple={false}
        onChange={onFileSelect}
      />
      <br />
      {console.log(selecedFile)}
      <div style={{ overflow: 'scroll', height: '100vh' }}>
        {searchResp &&
          Object.keys(searchResp).map((lang: any) => (
            <Fragment key={lang}>
              <h5>{`Language: ${lang}`}</h5>
              <br />
              {searchResp[lang].map((obj: any) => (
                <Fragment key={obj.url}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <span>{`Name: ${obj.filename}`}</span>
                      <br />
                      <span>{`Downloads: ${obj.downloads}`}</span>
                      <br />
                      <span>{`Score: ${obj.score}`}</span>
                      <br />
                    </div>
                    <div>
                      <Button
                        variant="primary"
                        onClick={() => onSelection(obj)}
                        size="sm"
                        className="m-3"
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                  <hr className="bg-white" />
                </Fragment>
              ))}
            </Fragment>
          ))}
      </div>
    </div>
  );
}
