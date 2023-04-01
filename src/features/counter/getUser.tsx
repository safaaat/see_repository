import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// jest.mock('axios', () => ({
//     post: jest.fn(),
//     get: jest.fn()
// }))

// const mockedAxios = axios as jest.Mocked<typeof axios>

// mockedAxios.post.mockResolvedValue({})

export interface filterUsers {
    id: number;
    users: string;
    repositorie: any;
    avatar_url: string;
}

export interface UsersState {
    users: filterUsers[] | undefined;
    isLoading: boolean;
    isSuccess: boolean;
    error: any;
}

const initialState: UsersState = {
    users: [],
    isLoading: false,
    isSuccess: false,
    error: []
}

const getRepositories = async (link: string) => {
    const response = await axios.get(`${link}`);
    return response.data
}

const getUserByUsername = async (username: string) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}${username}`);
        const resRepo = await getRepositories(response.data.repos_url)
        const result: filterUsers = {
            id: response.data.id,
            users: response.data.login,
            repositorie: resRepo,
            avatar_url: response.data.avatar_url
        }
        return result
    } catch (error: any) {
        if (error.response) {
            const message = error.response
            return message
        }
    }

}

export const callGetUsers = createAsyncThunk("user/callGetUsers", async (user: string, thunkAPI) => {
    let randomString: string = Math.random().toString(30).slice(3);
    let result: filterUsers[] = []
    let error: any

    for (let i = 0; i < randomString.length; i++) {
        if (result.length < 5) {
            if (i === 0) {
                let response = await getUserByUsername(user);
                if (response.status !== 404 && response.status !== 403) result.push(response);
            }
            if (i > 0) {
                let response = await getUserByUsername(`${user}${randomString[i]}`);
                if (response.status !== 404 && response.status !== 403) {
                    // Check Data Users is there the same?
                    const filterResult = result.filter((result) => {
                        return result.id === response.id;
                    })
                    // if not, push response to result
                    if (filterResult.length === 0) result.push(response);
                }
                if (response.status === 404 || response.status === 403) {
                    const message = response
                    error = message
                }
            }
        }
    }

    if (result.length === 0) return thunkAPI.rejectWithValue(error)
    return result
})

export const getUser = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetLoadingAndSuccess: state => {
            state.isLoading = false
            state.isSuccess = false
            state.error = []
        },
        resetUsers: state => {
            state.users = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(callGetUsers.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(callGetUsers.fulfilled, (state, action) => {
                state.users = action.payload
                state.isLoading = false
            })
            .addCase(callGetUsers.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
    }
})

export const { resetLoadingAndSuccess, resetUsers } = getUser.actions
export default getUser.reducer;