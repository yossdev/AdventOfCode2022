const { readFileSync } = require("fs");

const contents = readFileSync("./Day6/input.txt", "utf-8");

function detectMarker(streamBuf, bufPairs, marker) {
  if (streamBuf[streamBuf.length - 1] === 0) {
    streamBuf[bufPairs[0]] = bufPairs[1];
    return;
  }

  streamBuf.write(streamBuf.subarray(1).toString(), 0);
  streamBuf[streamBuf.length - 1] = bufPairs[1];

  const str = streamBuf.toString();
  const unique = new Set(str).size;

  if (unique == str.length) {
    marker.marker = bufPairs[0] + 1;
  }
}

// start-of-packet marker
function handheldDevice1() {
  const firstMarker = { marker: undefined };
  const signal = Buffer.alloc(4);
  const buf = Buffer.from(contents);

  for (const pairs of buf.entries()) {
    detectMarker(signal, pairs, firstMarker);

    if (firstMarker.marker) {
      return firstMarker.marker;
    }
  }
}

// start-of-message marker
function handheldDevice2() {
  const firstMarker = { marker: undefined };
  const signal = Buffer.alloc(14);
  const buf = Buffer.from(contents);

  for (const pairs of buf.entries()) {
    detectMarker(signal, pairs, firstMarker);

    if (firstMarker.marker) {
      return firstMarker.marker;
    }
  }
}

console.log(handheldDevice1());
console.log(handheldDevice2());
