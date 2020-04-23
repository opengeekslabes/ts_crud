import React from 'react';
import './App.css';
import CreateProjectForm from './CreateProjectForm';

function App(): JSX.Element {
  return (
    <div className="container mt-5">
      <div className="display-4 mb-5">Create new project</div>
      <CreateProjectForm />
    </div>
  );
}

export default App;
