import { Api } from '@/config/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const GetData = createAsyncThunk('data/GetData', async () => {
	try {
		const { data } = await axios.get(Api)
		return data
	} catch (error) {
		console.error(error)
	}
})

export const Ddelete = createAsyncThunk(
	'data/Ddelete',
	async (id, { dispatch }) => {
		try {
			await axios.delete(`${Api}?id=${id}`)
			dispatch(GetData())
		} catch (error) {
			console.error(error)
		}
	}
)

export const addData = createAsyncThunk(
	'data/addData',
	async (obj, { dispatch }) => {
		try {
			await axios.post(Api, obj)
			dispatch(GetData())
		} catch (error) {
			console.log(error)
		}
	}
)

export const editData = createAsyncThunk(
	'data/editData',
	async (obj, { dispatch }) => {
		try {
			await axios.put(Api, obj)
			dispatch(GetData())
		} catch (error) {}
	}
)

export const StEdit = createAsyncThunk(
	'data/StEdit',
	async (id, { dispatch }) => {
		try {
			await axios.put(`http://37.27.29.18:8001/completed?id=${id}`)
			dispatch(GetData())
		} catch (error) {}
	}
)



interface daVaInf {
	id: number
	name: string
	isCompleted: boolean
	description: string
	images: string
}
interface dataInf {
	data: daVaInf[]
}
const initialState: dataInf = {
	data: [],
}

export const counterSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(GetData.fulfilled, (state, action) => {
			state.data = action.payload.data
		})
	},
})

export default counterSlice.reducer
