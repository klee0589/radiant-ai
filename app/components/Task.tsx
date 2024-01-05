import { useState } from 'react';
import { TTask, removeTask, toggleFavorite, cloneTask, updateTitle } from '../../lib/features/task/taskSlice';
import { useAppDispatch } from '../../lib/hooks';

const Task = ({ task }: { task: TTask }) => {
    const dispatch = useAppDispatch();

    const { id, favorite, title } = task;
    const [newTitle, setNewTitle] = useState<string>(title);

    const clickHandler = ({ type, title }: { type: string, title?: string }) => {

        if (type === 'delete') {
            dispatch(removeTask(id));
        }
        if (type === 'favorite') {
            dispatch(toggleFavorite(id));
        }
        if (type === 'clone') {
            dispatch(cloneTask(id));
        }
        if (type === 'update') {
            dispatch(updateTitle({ id, updateTitle: newTitle }));
        }
    }

    return <div key={task.id} style={{ border: '1px solid white', background: favorite ? 'green' : 'gray', padding: '10px' }}>
        <div>{task.title}</div>
        <div>
            <input
                style={{ color: 'black' }}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={task.title}
            />
            <button onClick={() => clickHandler({ type: 'update', title: newTitle })}>
                Update
            </button></div>
        <div><button onClick={() => clickHandler({ type: 'delete' })}>Delete</button></div>
        <div><button onClick={() => clickHandler({ type: 'favorite' })}>Favorite</button></div>
        <div><button onClick={() => clickHandler({ type: 'clone' })}>Copy</button></div>
    </div>
}

export default Task;