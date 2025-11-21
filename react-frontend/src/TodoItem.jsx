import React from "react";
import { Typography, Button } from "@mui/material";
import { Circle, CircleOutlined } from "@mui/icons-material";

function TodoItem(props) {
  return (
    <div className="todo-item">
      <Typography variant="body1" color="textSecondary">
        {props.isDone ? (
          <Circle
            style={{ color: "black" }}
            onClick={() => props.onToggle(props.id)}
          />
        ) : (
          <CircleOutlined
            style={{ color: "gray" }}
            onClick={() => props.onToggle(props.id)}
          />
        )}
      </Typography>
      <p
        className="todo-text"
        style={
          props.isDone
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
        onClick={() => props.onToggle(props.id)}
      >
        {props.title}
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.deleteTodo(props.id)}
        style={{}}
      >
        Delete
      </Button>
    </div>
  );
}

export default TodoItem;
