const Express = require('express');
const Storage = require('./storage');
const Fs = require('fs');
const Path = require('path');
const BinaryFile = require('binary-file');
const Int64 = require('int64');

const router = Express.Router();

const history = {
  HISTORY_INITIAL							: 0,
  HISTORY_FIXEDSIZE_FRIENDLY_NAME			: 1,
  HISTORY_COMPRESSION						: 2,
  HISTORY_RECORDED_TIMESTAMP				: 3
};

const gunType = ['Storm', 'Fall', 'Pistol', 'Shotgun', 'AR', 'SMG', 'Sniper'];

const chunkType = {
  'Header': 0,
  'ReplayData': 1,
  'Checkpoint': 2,
  'Event': 3,
};

const koString = ['eliminates', 'knock out'];

router.post('/', Storage.upload.single('replay'), (req, res, next) => {

  if (req.file !== undefined) {
    const myPath = Path.resolve(req.file.path);
    const myBinaryFile = new BinaryFile(myPath, 'r', true);

    let fileInfo = {
      size: null,
      magicNumber: null,
      fileVersion: null,
      lengthInMs: null,
      networkVersion: null,
      changeList: null,
      friendlyName: null,
      isLive: null,
      timestamp: null,
      isCompressed: null,
    };

    let chunks = [];

    (async function () {
      try {
        await myBinaryFile.open();
        console.log('File opened');

        fileInfo.size = await myBinaryFile.size();
        fileInfo.magicNumber = await myBinaryFile.readUInt32();

        fileInfo.fileVersion = await myBinaryFile.readUInt32();

        if (fileInfo.magicNumber !== 0x1CA2E27F) {
          throw new Error('Not a .replay file');
        }

        fileInfo.lengthInMs = await myBinaryFile.readUInt32();
        fileInfo.networkVersion = await myBinaryFile.readUInt32();
        fileInfo.changeList = await myBinaryFile.readUInt32();

        fileInfo.friendlyName = await myBinaryFile.readFString();

        fileInfo.isLive = await myBinaryFile.readUInt32() !== 0;

        if (fileInfo.fileVersion >= history.HISTORY_RECORDED_TIMESTAMP) {
          const timestamp = await myBinaryFile.readUInt64();
          const unixDate = (timestamp - 621355968000000000) / 10000;
          fileInfo.timestamp = new Date(unixDate);
        }

        if (fileInfo.fileVersion >= history.HISTORY_COMPRESSION) {
          fileInfo.isCompressed = await myBinaryFile.readUInt32() !== 0;
        }

        //console.log(fileInfo);

        while (fileInfo.size > myBinaryFile.tell()) {
          let chunk = {
            type: null,
            sizeInBytes: null,
            offset: null,
            data: {},
            content: {},
          };

          chunk.type = await myBinaryFile.readUInt32();
          chunk.sizeInBytes = await myBinaryFile.readUInt32();

          chunk.offset = myBinaryFile.tell();

          if (chunk.type === chunkType["Event"]) {
            chunk.data.id = await myBinaryFile.readFString();
            chunk.data.group = await myBinaryFile.readFString();
            chunk.data.metadata = await myBinaryFile.readFString();
            chunk.data.time1 = await myBinaryFile.readUInt32();
            chunk.data.time2 = await myBinaryFile.readUInt32();
            chunk.data.sizeInBytes = await myBinaryFile.readUInt32();

            if (chunk.data.group === "playerElim\0") {
              myBinaryFile.skipBytes(45);
              chunk.content.eliminated = await myBinaryFile.readFString();
              chunk.content.eliminator = await myBinaryFile.readFString();
              chunk.content.gun = await myBinaryFile.readByte();
              chunk.content.ko = await myBinaryFile.readUInt32();

              //console.log(millisecondsToTime(chunk.data.time1) + " – " + chunk.content.eliminator + " " + koString[chunk.content.ko] + " " + chunk.content.eliminated + " with " + (gunType[chunk.content.gun] !== undefined ? gunType[chunk.content.gun] : chunk.content.gun));
            }

            if (chunk.data.metadata === "AthenaMatchStats") {
              myBinaryFile.skipBytes(12);
              chunk.content.eliminations = await myBinaryFile.readUInt32();
            }

            if (chunk.data.metadata === "AthenaMatchTeamStats") {
              myBinaryFile.skipBytes(4);
              chunk.content.position = await myBinaryFile.readUInt32();
              chunk.content.totalPlayers = await myBinaryFile.readUInt32();
            }
          }

          myBinaryFile.seek(chunk.offset + chunk.sizeInBytes);
          chunks.push(chunk);
        }

        await myBinaryFile.close();
        console.log('File closed');

        Fs.unlink(myPath, (err) => {
          if (err) throw err;
          console.log('deleted');
        });

        res.json(chunks);


      } catch (err) {
        console.log(`There was an error: ${err}`);
      }
    })();
  }
});

BinaryFile.prototype.readFString = function() {
  return new Promise((resolve, reject) => {
    this.readInt32()
      .then((length) => {
        const isUnicode = length < 0;
        let data = null;
        if (isUnicode) {
          length = -length;
        }
        this.read(length * (1 + isUnicode))
          .then((val) => {
            data = val;
            resolve(data.toString('utf8'));
          })
          .catch((err) => {
            console.log(err);
          })
      });
  });
};

BinaryFile.prototype.readUInt64 = function() {
  return new Promise((resolve, reject) => {
    this.read(8)
      .then((buffer) => {
        let res = JSON.parse(JSON.stringify(buffer)).data;
        for (let i = 0; i < res.length; i++) {
          res[i] = ("0" + res[i].toString(16)).slice(-2);
        }
        res = res.reverse();
        resolve(Int64.hex2dec(res.join('')));
      })
      .catch((err) => {
        console.log(err);
      })
  })
};

BinaryFile.prototype.skipBytes = function(value) {
  this.seek(this.tell() + value)
};

BinaryFile.prototype.readByte = function() {
  return new Promise((resolve, reject) => {
    this.read(1)
      .then((buffer) => {
        resolve(JSON.parse(JSON.stringify(buffer)).data[0]);
      })
      .catch((err) => {
        console.log(err);
      })
  });
};

millisecondsToTime = function(ms) {
  return new Date(ms).toISOString().slice(14, -5);
};

module.exports.router = router;
