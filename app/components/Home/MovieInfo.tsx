import React from 'react';
import { shell } from 'electron';
import { Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const gotoImdb = (imdbid: string) =>
  shell.openExternal(`https://www.imdb.com/title/${imdbid}`);

const MovieInfo = ({
  titleInfo,
  isLoading,
}: {
  titleInfo: any;
  isLoading: boolean;
}) => {
  const { metadata = {}, fileInfo } = titleInfo;
  const imdbId = metadata && (metadata.show_imdbid || metadata.imdbid);
  return (
    <div style={{ width: 180 }} className="overflow-y-scroll">
      {isLoading ? (
        <>
          <Skeleton
            duration={2}
            style={{ height: 280 }}
            className="img-fluid rounded-top cursor-pointer"
          />
          <br />
          <div className="my-1 h5">
            <Skeleton duration={2} />
          </div>
          <div style={{ fontSize: 13 }} className="my-1">
            <Skeleton duration={2} count={3} />
          </div>
        </>
      ) : (
        <>
          {fileInfo ? (
            <div className="text-center w-100">
              {`${
                fileInfo === 'Corrupted'
                  ? "Couldn't obtain info about selected file OR Your file maybe corrupted"
                  : ''
              }`}
            </div>
          ) : (
            <>
              <img
                className="img-fluid rounded-top cursor-pointer border-customDarkBlue"
                src={metadata.cover}
                role="presentation"
                onClick={() => gotoImdb(imdbId)}
                alt=""
              />
              <br />
              <div
                className="py-1 rounded-bottom text-center w-100 text-white bg-customDarkBlue cursor-pointer"
                role="presentation"
                onClick={() => gotoImdb(imdbId)}
              >
                {`IMDb Rating: ${metadata.rating}/10`}
              </div>
              <div className="text-center my-1">
                <Button
                  variant="link"
                  onClick={() => gotoImdb(imdbId)}
                  className="outline-0 box-shadow-none text-inherit p-0"
                >
                  {`${metadata.title} (${metadata.year})`}
                </Button>
              </div>
              {metadata.episode_title && (
                <div className="text-center my-1">
                  <Button
                    variant="link"
                    onClick={() => gotoImdb(metadata.imdbid)}
                    className="outline-0 box-shadow-none text-inherit p-0"
                  >
                    {`${metadata.episode_title} - S${metadata.season} E${metadata.episode}`}
                  </Button>
                </div>
              )}
              <div style={{ fontSize: 13 }} className="my-1">
                <div>
                  <b>
                    <u>Duration: </u>
                  </b>
                  {`${metadata.duration}`}
                </div>
                {/* <div>
          <b>
            <u>Votes: </u>
          </b>
          {`${metadata.votes}`}
        </div> */}
                <div>
                  <b>
                    <u>Starring:</u>
                  </b>
                  <br />
                  {metadata.cast && (
                    <span className="font-weight-light text-inherit">
                      {Object.values(metadata.cast).slice(0, 5).join(', ')}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MovieInfo;
