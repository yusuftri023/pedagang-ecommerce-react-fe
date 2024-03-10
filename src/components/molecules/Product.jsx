import { useDispatch } from "react-redux";
import { increaseAmount, decreaseAmount, removeItem } from "../../../redux-toolkit/slices/basketSlice";


const Product = ({name,price, image, amount, }) => {

	const dispatch = useDispatch()
	return (
		<div className="flex flex-row items-center gap-8 px-10">
			<img src={image} alt={name} className="w-10"/>
			<div className="w-1/2 px-10">
				<p className="text-xl font-medium">{name}</p>
				<p className="text-lg tracking-wide">Rp. {price}</p>
			<button className="pt-1 pb-3 tracking-wide text-red-500"
					onClick={dispatch(removeItem({name}))}
			>Remove</button>
			</div>
			<div className="flex flex-col items-center">
				<p className="text-lg font-medium">amount</p>
				<div className="flex flex-row items-center gap-4 text-gray-600">
					<button className="text-xl"
						onClick={dispatch(increaseAmount({name}))}
					>-</button>
						<p>{amount}</p>
					<button className="text-xl"
					onClick={
						() => {
							if (amount == 1) {
								dispatch(removeItem({name}))
								return;
							}
							dispatch(decreaseAmount({name}))}
						}
					>+</button>
				</div>
			</div>
			
		</div>
	)
}

export default Product;