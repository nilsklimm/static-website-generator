const primitiveTypes = ['boolean', 'number', 'string'];

module.exports = function extractProps(json, allowedProps) {
  const obj = typeof json === 'string' ? JSON.parse(json) : json; 

  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    const value = obj[key];

    if (allowedProps.includes(key)
    && primitiveTypes.includes(typeof value)) {
      return { ...acc, [key]: value };
    }

    return acc;
  }, {});
};
