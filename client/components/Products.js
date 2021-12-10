import { Space } from "antd";
import ProductCard from "./ProductCard"

export default function Products({ products }) {

  return (
    <Space
      className='products-div'
      style={{
        margin: '0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(43vh, .5fr))'
      }}
    >
      {products.map((product) =>
        <ProductCard
          key={product.id}
          product={product}
        />
      )}
    </Space>
  );
}