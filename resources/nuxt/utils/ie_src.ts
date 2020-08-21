const getIESrc = (srcset, size) : string => {
  let ie_src = '';
  if (srcset !== undefined) {
    const urls = srcset.split(/,\s|,/);
    const url_arr = [];
    for (let i = 0; i < urls.length; i++) {
      const url_elements = urls[i].split(' ');
      if (url_elements[1] !== undefined) {
        const width = url_elements[1].slice(0, -1);
        if (width >= size && width <= 1.5 * size) {
          ie_src = url_elements[0];
        }
        if (width < size && ie_src === '') {
          ie_src = url_elements[0];
        }
      }
    }
  }
  return ie_src;
};
export { getIESrc };
