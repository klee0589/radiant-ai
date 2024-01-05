"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { useAppDispatch } from '../../lib/hooks';
import { addTodo, toggleTodo, removeTodo, fetchTasks } from '../../lib/features/task/taskSlice';

const Tasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useSelector((state: RootState) => state.tasks.list);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [])

  console.log('todos ', todos)

//   dispatch(toggleTodo(123)); 
//   dispatch(removeTodo(456));

  return (
    <div>Hello</div>
  );
};

export default Tasks;
