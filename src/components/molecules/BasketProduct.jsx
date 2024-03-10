import {useSelector} from "react-redux"
import Product from "./Product"

const BasketProduct = () => {
	const {products, total, amount} = useSelector(store => store.basket) 
	return (
		<div className="py-4">
			{amount > 1 ? (
			<>
						<div>
				{products.map((item) =>
				<Product key={new Date().getTime + Math.random()}
					name={item.name}
					price={item.price}
					image={item.image}
					amount={item.amount}
				/>
				) }
			</div>
			<div className="flex flex-row items-center py-8 justify-evenly">
				<p className="text-2xl font-medium">Total</p>
				<p className="text-2xl font-medium">Rp. {total}</p>
			</div>
			</>)
			:
			(
			<>
				<p>Produk di keranjang mu masih kosong</p>
			</>
			)
			}
	
		</div>
	)
}

export default BasketProduct