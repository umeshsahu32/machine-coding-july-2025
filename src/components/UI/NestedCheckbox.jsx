import { useState } from "react";
import { checkboxData } from "../../utils/checkboxData";

const Checkbox = ({ checkboxData: data, checkedNode, setCheckedNode }) => {
  console.log(data);

  const handleChange = (isChecked, node) => {
    console.log(isChecked, node);
    setCheckedNode((prev) => {
      const newState = { ...prev, [node.id]: isChecked };

      const updateChildren = (node) => {
        node?.children?.forEach((child) => {
          newState[child.id] = isChecked;
          child.children && updateChildren(child);
        });
      };
      updateChildren(node);

      const verifyChecked = (node) => {
        if (!node.children) return newState[node.id] || false;
        const allChildrenChecked = node?.children?.every((child) =>
          verifyChecked(child)
        );
        newState[node.id] = allChildrenChecked;
        return allChildrenChecked;
      };
      checkboxData.forEach((node) => verifyChecked(node));
      return newState;
    });
  };

  console.log("checkedNode", checkedNode);

  return (
    <div>
      {data.map((node) => {
        return (
          <div key={node.id} className="pl-5">
            <input
              id={node.name}
              type="checkbox"
              checked={checkedNode[node.id] || false}
              onChange={(e) => handleChange(e.target.checked, node)}
            />
            <label htmlFor={node.name}>{node.name}</label>
            {node?.children && (
              <Checkbox
                checkboxData={node.children}
                checkedNode={checkedNode}
                setCheckedNode={setCheckedNode}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const NestedCheckbox = () => {
  const [checkedNode, setCheckedNode] = useState({});
  return (
    <div>
      <h1 className="text-4xl font-bold text-sky-700 mb-10">Nested Checkbox</h1>
      <Checkbox
        checkboxData={checkboxData}
        checkedNode={checkedNode}
        setCheckedNode={setCheckedNode}
      />
    </div>
  );
};

export default NestedCheckbox;
