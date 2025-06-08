import { useState } from "react";
import jsonData from "../../utils/folderStructure.json";
import { FaFolderPlus } from "react-icons/fa";

const List = ({ list, addNodeToList, deleteNodeFromList }) => {
  const [isExpended, setIsExpended] = useState({});

  return (
    <div className="text-left pl-5 cursor-pointer">
      {list.map((node) => {
        return (
          <div>
            {node.isFolder && (
              <span
                onClick={() =>
                  setIsExpended((prev) => ({
                    ...prev,
                    [node.name]: !prev[node.name],
                  }))
                }
              >
                {isExpended?.[node.name] ? "- " : "+ "}
              </span>
            )}
            <span>{node.name}</span>
            {node.isFolder && (
              <button
                onClick={() => addNodeToList(node.id)}
                className="px-1 py-1 ml-3 text-xs bg-gray-700 text-white"
              >
                Add
              </button>
            )}

            <button
              onClick={() => deleteNodeFromList(node.id)}
              className="px-1 py-1 ml-3 text-xs bg-gray-700 text-white"
            >
              Delete
            </button>

            {isExpended?.[node.name] && node?.children && (
              <List
                list={node.children}
                addNodeToList={addNodeToList}
                deleteNodeFromList={deleteNodeFromList}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const FolderStructure = () => {
  const [folderData, setFolderData] = useState(jsonData);
  // RENDER LIST OF OBJECT

  const addNodeToList = (parentId) => {
    const name = prompt("Enter Name");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now(),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setFolderData((prev) => updateTree(prev));
  };

  const deleteNodeFromList = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id === itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };
    setFolderData((prev) => updateTree(prev));
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-sky-700 mb-10">
        File/Folder Explorer
      </h1>
      <List
        list={folderData}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
      />
    </div>
  );
};

export default FolderStructure;
