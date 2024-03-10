import { createSlice } from "@reduxjs/toolkit";
import DataProduct from "../../../dataDummy"


const initialState = ({
	products: DataProduct,
	amount: 0,
	total: 0,
})

const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		increaseAmount: (state, { payload }) => {
			const item = state.products.find(item => item.name == payload.name);
			item.amount++
		},
		decreaseAmount: (state, { payload }) => {
			const item = state.products.filter(item => item.name == payload.name);
			item.amount--
		},
		removeItem: (state, { payload }) => {
			state.products = state.products.filter(item => item.name !== payload.name);
		},
		updateTotal: (state) => {
			let amount = 0;
			let total = 0;
			state.products.forEach(item => {
				state.amount += item.amount
				state.total += item.total
			})
			state.amount = amount
			state.total = total
		}
	}
})

export const { increaseAmount, decreaseAmount, removeItem, updateTotal } = basketSlice.actions

export default basketSlice.reducer