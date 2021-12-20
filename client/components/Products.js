import { Pagination, List } from "antd";
import ProductCard from "./ProductCard"

export default function Products({ products }) {

  return (
      <List
        dataSource={products}
        renderItem={product => (
          <List.Item>
            <ProductCard key={product.id} product={product}/>
          </List.Item>
        )}
      pagination={{
        pageSize: 8,
      }}
        >

      </List>
  );
}