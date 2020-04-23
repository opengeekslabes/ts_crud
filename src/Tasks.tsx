import React, { useState } from "react";
import EditButton from './EditButton';

interface arrType {
    key: number,
    value: string
}

function Tasks (props: { errorMessage: string }): JSX.Element {
    const [value, setValue] = useState<string>("");
    const [arr, setArr] = useState<arrType[]>([]);
    const [editAreaValue, setAreaValue] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number>(-1);
    const [doneIndexArr, setDoneIndexArr] = useState<number[]>([]);

    const handleAdd = (): void => {
        if (!value) {
          alert(props.errorMessage);
          return;
        }
        setArr(arr => [...arr, {key: Date.now(), value: value}])
        setValue("")
      };

    const handleRemove = (ind: number): void => {
    let id: number = arr[ind].key;

    if (doneIndexArr.includes(id)) {
        let del: number = doneIndexArr.indexOf(id);
        doneIndexArr.splice(del, 1);
    }

    let result: arrType[] = arr.filter((_item, index) => {
    return ind !== index
    });

    setArr(result)
    setDoneIndexArr(doneIndexArr);
    };

    const handleEdit = (_item: string, index: React.SetStateAction<number>): void => {
     setEditIndex(index);
    };

    const handleSave = (item: string, index: number): void => {
        let value: string = !editAreaValue ? item : editAreaValue;
        arr[index].value = value;
        setEditIndex(-1);
    };

    const handleDone = (index: number): void => {
        let id: number = arr[index].key;
        let newArr: number[] = doneIndexArr.slice();
    
        let del: number = newArr.indexOf(id);
        newArr.includes(id)
          ? newArr.splice(del, 1)
          : newArr.push(id);
        setDoneIndexArr(newArr)
    };

    let arrValues: string[] = [];
    let arrKeys: number[] = [];
  
    for (let item of arr) {
      arrValues.push(item.value);
      arrKeys.push(item.key);
    }

    return (
        <div className="form-group">
            <div className="h6">Add new tasks</div>
            <textarea
            className="form-control"
            value={value}
            name="value"
            // rows="2"
            onChange={(e) => { setValue(e.target.value)} }
            />
            <button
            type="button"
            className="btn btn-light"
            onClick={handleAdd}
            >
            Add
            </button>
            <ul>
            {arrValues.map((item: string, index: number) => (
                <div key={arrKeys[index]} className="p-2 mt-2 border border-light">
                {editIndex !== index ? (
                    <li className="h6">
                    {doneIndexArr.includes(arrKeys[index])
                        ? `${item} ${String.fromCharCode(9745)} is done`
                        : item}
                    </li>
                ) : (
                    <textarea
                    className="h6"
                    name="editArea"
                    id="editArea"
                    // rows="2"
                    defaultValue={item}
                    onChange={(e) => { setAreaValue(e.target.value)} } 
                    />
                )}
                <hr />
                <button
                    type="button"
                    className="btn btn-light mr-4"
                    onClick={() => handleDone(index)}
                >
                    {String.fromCharCode(10004)}
                </button>
                <EditButton
                    handleEdit={() => handleEdit(item, index)}
                    handleSave={() => handleSave(item, index)}
                    isEditing={editIndex !== index}
                />
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => handleRemove(index)}
                >
                    {String.fromCharCode(10007)}
                </button>
                </div>
            ))}
            </ul>
        </div>
    );
};

export default Tasks;