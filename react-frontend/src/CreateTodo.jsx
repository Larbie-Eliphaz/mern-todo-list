import React from "react";
import { TextField, Button } from "@mui/material";

function CreateTodo(props) {
  const [todo, setTodo] = React.useState("");
  const handleClick = () => {
    props.addTodo({ task: todo });
    setTodo("");
    props.getTodos();
  };

  return (
    <div className="create-todo">
      <TextField
        label="Enter Todo"
        variant="outlined"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        value={todo}
        style={{width:'80%'}}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleClick()}
        style={{marginLeft : '10px'}}
      >
        Add Todo
      </Button>
    </div>
  );
}

export default CreateTodo;
