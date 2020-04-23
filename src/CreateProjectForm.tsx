import React, { useState } from 'react'
import Tasks from './Tasks';

interface arrType {
  key: number,
  value: string
}

function CreateProjectForm(): JSX.Element {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [arrProjInfo, setArrProjInfo] = useState<arrType[]>([]);
    let [id, setId] = useState<number>(1);
    const errorMessage: string = "Empty fields!";

    const handleAdd = (): void => {
        if(!(title && description)) {
          alert(errorMessage)
          return
        }
    
        let value: string = `Project: ${title} Description: ${description}`;
        let newItem: {
            key: number;
            value: string;
        } = {key: Date.now(), value: `id: ${id} ${value}`};
        setArrProjInfo(arrProjInfo => [...arrProjInfo, newItem])
        setId(id + 1)
        setTitle("");
        setDescription("")
      };

    const handleRemove = (ind: number): void => {

    let result: arrType[] = arrProjInfo.filter((_item, index) => {
    return ind !== index
    });

    setArrProjInfo(result)
    };

    let arrValues: string[] = [];
    let arrKeys: number[] = [];
    for (let item of arrProjInfo) {
      arrValues.push(item.value);
      arrKeys.push(item.key);
    }

    return (
        <div className="container mt-5 border border-light rounded p-4">
          <form id="infoForm" className="form-group">
            <label htmlFor="title">Title of your Project</label>
            <input
              required
              name="title"
              id="title"
              type="text"
              value={title}
              className="form-control mb-3"
              placeholder="title"
              onChange={(e) => { setTitle(e.target.value)}}
            />
            <label htmlFor="title">Description of your Project</label>
            <input
              required
              name="description"
              id="description"
              type="text"
              value={description}
              className="form-control mb-3"
              placeholder="description"
              onChange={(e) => { setDescription(e.target.value) }}
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={handleAdd}
            >
              Add
            </button>
          </form>
          <ul>
            {arrValues.map((item, index) => (
              <div key={arrKeys[index]} className="p-2 mt-2 border border-light">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5">{item}</span>
                  <button type="button" className="btn btn-light" onClick={() => handleRemove(index)}>Remove</button>
                </div>
                <Tasks errorMessage = {errorMessage}/>
              </div>
            ))}
          </ul>
        </div>
      );
}

export default CreateProjectForm;