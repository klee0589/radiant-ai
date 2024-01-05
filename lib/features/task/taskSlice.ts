import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Task {
    userId: number;
    id: number;
    title: string,
    completed: boolean;
}

interface FetchTasksResponse {
    tasks: Task[];
}

const initialState: { list: Task[] } = {
    list: [],
};

export const fetchTasks = createAsyncThunk<FetchTasksResponse, void>(
    'todos/fetchTasks',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
        const data = await response.json();
        return { tasks: data };
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        getTasks: (state, action: PayloadAction<Task[]>) => {
            state.list.push(...action.payload);
        },
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const todo = state.list.find(item => item.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(item => item.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.list = action.payload;
            });
    }
});

export const { getTasks, toggleFavorite, removeTask } = todoSlice.actions;

export default todoSlice.reducer;
