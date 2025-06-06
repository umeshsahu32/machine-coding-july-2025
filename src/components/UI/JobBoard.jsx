import { useState, useEffect } from "react";

const JobBoard = () => {
  const [postIDs, setPostIDs] = useState([]);
  const [postMetadata, setPostMetadata] = useState([]);

  const getData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const getFormattedDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  const getJobTitle = (text) => {
    const arr = text.split(/\((YC [^)]+)\)/);
    if (arr.length > 1) {
      const part1 = arr[0];
      const part2 = arr[1];
      return `${part1} ${part2}`;
    }
    return "N/A";
  };

  const getJobInfo = (text) => {
    const arr = text.split(/\((YC [^)]+)\)/);
    if (arr.length > 2) {
      return arr[2];
    }
    return "N/A";
  };

  const fetchPostMetadata = async (ids) => {
    const apiCalls = ids.map((id) => {
      const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
      return getData(url);
    });
    const results = await Promise.all(apiCalls);
    if (results.length) {
      const newArr = results.map((item) => {
        const obj = {
          jobTitle: getJobTitle(item.title),
          jobInfo: getJobInfo(item.title),
          date: getFormattedDate(item.time),
          url: item.url
            ? item.url
            : `https://news.ycombinator.com/item?id=${item.id}`,
        };
        return obj;
      });

      let copyPostMetadata = [...postMetadata];
      copyPostMetadata = [...copyPostMetadata, ...newArr];
      setPostMetadata(copyPostMetadata);
    }
  };

  const fetchPostIDs = async () => {
    const url = "https://hacker-news.firebaseio.com/v0/jobstories.json";
    const data = await getData(url);
    const ids = data.splice(0, 9);
    setPostIDs(data);
    fetchPostMetadata(ids);
  };

  useEffect(() => {
    fetchPostIDs();
  }, []);

  const handleLoadMore = () => {
    const copyIds = [...postIDs];
    if (copyIds.length > 0) {
      const ids = copyIds.splice(0, 6);
      fetchPostMetadata(ids);
      setPostIDs(copyIds);
    }
  };

  const btnClass =
    "bg-cyan-700 hover:bg-cyan-800 transition-colors duration-300 px-3 py-2 text-white rounded-lg text-xl cursor-pointer";

  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full">
      <h1 className="text-4xl font-bold text-cyan-700">Job Board</h1>
      <div className="grid grid-cols-3 w-[70%] gap-4">
        {postMetadata?.length === 0 ? (
          <div className="col-span-3 text-2xl font-bold text-center">
            Loading...
          </div>
        ) : (
          postMetadata.map((post, index) => (
            <a
              className="flex flex-col justify-center items-center transition-all duration-200 bg-white hover:bg-gray-200 border border-gray-200 p-3 cursor-pointer no-underline rounded-sm text-[#303030]"
              href={post.url}
              target="_blank"
              key={index}
            >
              <div className="text-2xl font-bold">{post.jobTitle}</div>
              <div className="mx-5 my-0 text-center">{post.jobInfo}</div>
              <div className="font-bold text-cyan-700">{post.date}</div>
            </a>
          ))
        )}
      </div>
      {postIDs.length !== 0 && (
        <button className={btnClass} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default JobBoard;
