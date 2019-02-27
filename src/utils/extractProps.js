import reduce from 'lodash.reduce';

const primitiveTypes = ['boolean', 'number', 'string'];

export function extractProps(json, allowedProps) {
  const obj = typeof json === 'string' ? JSON.parse(json) : json; 

  const extracted = reduce(obj, (acc, value, key) => {
    if (allowedProps.includes(key)
    && primitiveTypes.includes(typeof value)) {
      return { ...acc, [key]: value };
    }

    return acc;
  }, {});

  console.debug('Extracted props for saving:', extracted);

  return extracted;
}
