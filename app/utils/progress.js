import request from 'request';
import fs from 'fs';

export const downloadFile = (file_url, targetPath, onProgress) => {
  // Save variable to know progress
  let receivedBytes = 0;
  let totalBytes = 0;

  const req = request({
    method: 'GET',
    uri: file_url,
  });

  const out = fs.createWriteStream(targetPath);
  req.pipe(out);

  req.on('response', function (data) {
    // Change the total bytes value to get progress later.
    totalBytes = parseInt(data.headers['content-length'], 10);
  });

  req.on('data', function (chunk) {
    // Update the received bytes
    receivedBytes += chunk.length;

    onProgress(receivedBytes, totalBytes);
  });

  req.on('end', function () {
    alert('Subtitle succesfully downloaded');
  });
};

export const f2 = {};
