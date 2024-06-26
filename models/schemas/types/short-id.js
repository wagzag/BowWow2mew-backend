const { nanoid } = require('nanoid');

const shortId = {
  type: String,
  default: () => {
    return nanoid();
  },
  require: true,
  index: true,
};

exports.shortId = shortId;