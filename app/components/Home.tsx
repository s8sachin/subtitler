/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import * as OS from 'opensubtitles-api';
import Dropzone from 'react-dropzone';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { shell } from 'electron';

import routes from '../constants/routes.json';
import { downloadFile } from '../utils/progress';
import SubsTable from './SubsTable';
import Logo from './Icons/Logo';

const OpenSubtitles = new OS({ useragent: 'UserAgent', ssl: true });

const gotoImdb = (imdbid: string) =>
  shell.openExternal(`https://www.imdb.com/title/${imdbid}`);

export default function Home(): JSX.Element {
  const [selecedFile, setSelectedFile] = useState<File | null>(null);
  const [searchResp, setSearchResp] = useState<any>(null);
  const [titleInfo, setTitleDetails] = useState<any>({});

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

  /* e: ChangeEvent<HTMLInputElement> */
  const onFileSelect = async (files: File[]) => {
    // const file: File | null = e.target.files && e.target.files[0];
    const file: File | null = files && files[0];
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
        const movieInfo = await OpenSubtitles.identify({
          path: file.path,
          extend: true,
        });
        setTitleDetails(movieInfo);
        console.log(movieInfo, 'XXX');
        const modifiedResp: any[] = [];
        Object.keys(resp).forEach((lang) => {
          modifiedResp.push(...resp[lang]);
        });
        setSearchResp(modifiedResp);

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
      <Dropzone
        multiple={false}
        onDrop={onFileSelect}
        accept="video/mp4,video/x-m4v,video/*"
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section>
            <div
              {...getRootProps()}
              className="p-3 mt-3 w-100 cursor-pointer outline-0"
            >
              <input {...getInputProps()} />
              {console.log(isDragActive, 'XXX')}
              <div className="d-flex">
                <div className="mr-3">
                  <Logo color="#8090b380" />
                </div>
                <div className="my-1 h3 justify-content-center align-items-center d-flex px-5 dnd-area w-100">
                  {isDragActive ? (
                    <>Yup! Drop it like its hot 🔥</>
                  ) : (
                    <>
                      Drag and drop your video file here or
                      <Button
                        className="ml-3 outline-0"
                        variant="customDarkBlue"
                      >
                        + Pick a file
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      <div>
        {searchResp && selecedFile && (
          <>
            <Row>
              <Col xs={9}>
                <h4 className="text-truncate mb-3" title={selecedFile.name}>
                  {selecedFile.name}
                </h4>
                <SubsTable listData={searchResp} onSelection={onSelection} />
              </Col>
              <Col xs={3} style={{ height: '70vh', overflowY: 'auto' }}>
                <div style={{ width: 180 }} className="mx-auto overflow-scroll">
                  <img
                    className="img-fluid rounded-top cursor-pointer"
                    src={titleInfo.metadata.cover}
                    role="presentation"
                    onClick={() => gotoImdb(titleInfo.metadata.imdbid)}
                    alt=""
                  />
                  <br />
                  <div
                    className="py-1 rounded-bottom text-center w-100 bg-customLightBlue cursor-pointer"
                    role="presentation"
                    onClick={() => gotoImdb(titleInfo.metadata.imdbid)}
                  >
                    {`IMDb Rating: ${titleInfo.metadata.rating}/10`}
                  </div>
                  <div className="text-center my-1">
                    {`${titleInfo.metadata.title} (${titleInfo.metadata.year})`}
                  </div>
                  <div style={{ fontSize: 13 }} className="my-1">
                    <div>{`${titleInfo.metadata.duration}`}</div>
                    <div>{`${titleInfo.metadata.tagline}`}</div>
                    <div>
                      <b className="">Starring:</b>
                      <br />
                      <span className="font-weight-light text-light">
                        {Object.values(titleInfo.metadata.cast)
                          .slice(0, 5)
                          .join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
}
