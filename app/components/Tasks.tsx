"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { useAppDispatch } from '../../lib/hooks';
import { TTask, fetchTasks } from '../../lib/features/task/taskSlice';
import Task from './Task';

const Tasks: React.FC = () => {
    const dispatch = useAppDispatch();
    const todos = useSelector((state: RootState) => state.tasks.list);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTasks());
        };

        fetchData();
    }, [dispatch]);

    if (!todos) {
        return <div>No Tasks Here</div>;
    }

    return (
        <div style={{ height: '600px', overflowY: 'scroll' }}>
            {todos.map((task: TTask) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
};

export default Tasks;
