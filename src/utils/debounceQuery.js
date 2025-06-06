const fetchItems = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const debounce = (fetchFn, delay) => {
  if (typeof fetchFn !== "function") {
    throw new Error("Invalid Function");
  }

  if (typeof delay !== "number" || delay < 0) {
    throw new Error("Invalid delay value");
  }

  let timeout;
  return (...args) => {
    return new Promise((resolve) => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(async () => {
        const data = await fetchFn(...args);
        resolve(data);
      }, delay);
    });
  };
};

const debounceQuery = debounce(fetchItems, 1000);

export default debounceQuery;
