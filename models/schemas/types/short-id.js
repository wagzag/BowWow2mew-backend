async function getShortId() {
  const { nanoid } = await import('nanoid');
  return {
    type: String,
    default: () => nanoid(),
    require: true,
    index: true,
  };
}

module.exports = getShortId;
