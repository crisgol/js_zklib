const ZKLib = require('./zklib/zklib');
const attParserV660 = require('./zklib/att_parser_v6.60');
const attParserV640 = require('./zklib/att_parser_v6.40');
const async = require('async');

const ip = '192.168.1.133';
const port = 4370;
const inport = 5200;

const zk = new ZKLib({ip, port, inport, attendanceParser: attParserV640.name});

async.series(
  [
    next => {
      zk.connect((err, ret) => {
        next(err, ret);
      });
    },
    (next, err, ret) => {
      zk.serialNumber((err, ret) => {
        console.log(err, ret);
        next(err, ret);
      });
    },
    (next, err, ret) => {
      zk.version((err, ret) => {
        console.log(err, ret);
        next(err, ret);
      });
    },
    (next, err, ret) => {
      zk.gettime((err, ret) => {
        console.log(err, ret);
        next(err, ret);
      });
    },
    (next, err, ret) => {
      zk.getattendance((err, ret) => {
        console.log(err, ret);
        next();
      });
    },
    (next, err, ret) => {
      /* zk.getuser((err, ret) => {
        console.log(err, ret);
        next(err, ret);
      });
      */
      zk.setuser(56, '', 'Leh Sun', '56', (err, ret) => {
        console.log(err, ret);
        next();
      });
    },
    (next, err, ret) => {
      zk.enrolluser('56', (err, ret) => {
        console.log(err, ret);
        next();
      });
    },
    (next, err, ret) => {
      zk.setuser(56, '', 'Leh Sun', '56', (err, ret) => {
        console.log(err, ret);
        next();
      });
    },
  ],
  err => {
    console.log('done!');
  }
);
