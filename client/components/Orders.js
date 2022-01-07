import { Table } from 'antd';
import formatMoney from '../lib/formatMoney';

export default function Orders({ user }) {
  const orders = user?.orders;
  const dataSource = orders;
  const columns = [
    {
      title: 'Order #',
      dataIndex: 'id',
      key: '',
      render: id => <a href={`/order/${id}`}>{id}</a>
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: items => (
        <ul>
          {items.map((item) => (
            <li>{item.name}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: total => formatMoney(total)
    },
    {
      title: 'View Details',
      dataIndex: 'id',
      key: '',
      render: id => <a href={`/order/${id}`}>Details</a>
    },
  ]
  console.log(dataSource)
  return (
    <>
      <Table columns={columns} dataSource={dataSource}/>
    </>
  )
}