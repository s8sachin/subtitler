import React from 'react';
import { shell } from 'electron';

const gotoImdb = (imdbid: string) =>
  shell.openExternal(`https://www.imdb.com/title/${imdbid}`);

const MovieInfo = ({ titleInfo }: { titleInfo: any }) => {
  return (
    <div style={{ width: 180 }} className="overflow-y-scroll">
      <img
        className="img-fluid rounded-top cursor-pointer"
        src={titleInfo.metadata.cover}
        role="presentation"
        onClick={() => gotoImdb(titleInfo.metadata.imdbid)}
        alt=""
      />
      <br />
      <div
        className="py-1 rounded-bottom text-center w-100 text-white bg-customDarkBlue cursor-pointer"
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
        {titleInfo.metadata.tagline && (
          <div>{`${titleInfo.metadata.tagline}`}</div>
        )}
        <div>
          <b className="">Starring:</b>
          <br />
          <span className="font-weight-light text-inherit">
            {Object.values(titleInfo.metadata.cast).slice(0, 5).join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
