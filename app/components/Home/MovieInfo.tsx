/* eslint-disable @typescript-eslint/naming-convention */
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
  const {
    title = '',
    cover = '',
    rating = 0,
    year = '',
    imdbid = '',
    show_imdbid = '',
    episode_title = '',
    season = 0,
    episode = 0,
    duration = '',
    cast,
  } = metadata;
  const imdbId = metadata && (show_imdbid || imdbid);
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
                src={cover}
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
                {`IMDb Rating: ${rating}/10`}
              </div>
              <div className="text-center my-1">
                <Button
                  variant="link"
                  onClick={() => gotoImdb(imdbId)}
                  className="outline-0 box-shadow-none text-inherit p-0"
                >
                  {`${title} (${year})`}
                </Button>
              </div>
              {episode_title && (
                <div className="text-center my-1">
                  <Button
                    variant="link"
                    onClick={() => gotoImdb(imdbid)}
                    className="outline-0 box-shadow-none text-inherit p-0"
                  >
                    {`${episode_title} - S${season} E${episode}`}
                  </Button>
                </div>
              )}
              <div style={{ fontSize: 13 }} className="my-1">
                {duration && (
                  <div>
                    <b>
                      <u>Duration: </u>
                    </b>
                    {`${duration}`}
                  </div>
                )}
                {/* <div>
                  <b>
                    <u>Votes: </u>
                  </b>
                  {`${metadata.votes}`}
                </div> */}
                {cast && (
                  <div>
                    <b>
                      <u>Starring:</u>
                    </b>
                    <br />
                    <span className="font-weight-light text-inherit">
                      {Object.values(cast).slice(0, 5).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MovieInfo;
