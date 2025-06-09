import { useState } from "react";
import explorer from "../../utils/folderData";
import useTraverseTree from "../../hooks/userTraverseTree";

const Folder = ({ explorerData, handleInsertNode = () => {} }) => {
  const [expend, setExpend] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpend(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorerData.isFolder) {
    return (
      <div>
        <div
          onClick={() => setExpend(!expend)}
          className="mt-2 bg-gray-300 flex items-center justify-between p-1 w-[300px] cursor-pointer"
        >
          <span>📁 {explorerData.name}</span>
          <div className="flex gap-3">
            <button
              className="border text-sm border-slate-900 bg-slate-600 text-white px-1 transition-colors duration-200 hover:bg-slate-900"
              onClick={(e) => handleNewFolder(e, true)}
            >
              Folder ➕
            </button>
            <button
              className="border text-sm border-slate-900 bg-slate-600 text-white px-1 transition-colors duration-200 hover:bg-slate-900"
              onClick={(e) => handleNewFolder(e, false)}
            >
              File ➕
            </button>
          </div>
        </div>
        <div className={`${expend ? "block" : "hidden"} pl-6`}>
          {showInput.visible && (
            <div className="flex items-center gap-2">
              <span className="mt-1.5">{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="flex justify-between items-center cursor-pointer  border border-gray-300 p-1.5 mt-1.5 mb-0"
                autoFocus
                onKeyDown={onAddFolder}
                placeholder={`Enter ${
                  showInput.isFolder ? "folder" : "file"
                } name...`}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorerData.items.map((exp) => {
            return (
              <Folder
                key={exp.id}
                explorerData={exp}
                handleInsertNode={handleInsertNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <span className="mt-2.5 pl-2.5 flex flex-col">
        📄 {explorerData.name}
      </span>
    );
  }
};

const FolderStructure = () => {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-sky-700 mb-10">
        File/Folder Explorer
      </h1>
      <Folder explorerData={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
};

export default FolderStructure;
