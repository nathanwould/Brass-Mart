import { Card, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import formatMoney from '../lib/formatMoney';

export default function ProductCarousel({ products }) {
  console.log(products)
  return (
    <div style={{
      textAlign: 'center'
    }}>
      <h2 style={{marginRight: '10vh'}}>Recently Added Instruments:</h2>
      <Carousel
        autoplay
        arrows
        prevArrow={<LeftOutlined id="left-arrow"/>}
        nextArrow={<RightOutlined id="right-arrow"/>}
        autoplaySpeed="60"
        align="center"
        style={{
          width: '50vh',
          margin: "0 auto",
        }}
      >
        {products.map((product) => {
          const { id, name, photos, price } = product;
          return (
            <a href={`/instrument/${id}`}>
            <Card
              key={id}
              cover={
                <img
                  alt={name}
                  src={photos[0].image.publicUrlTransformed}
                  style={{
                    width: '100%',
                    height: '30vh',
                    objectFit: 'cover'
                  }}
                />
            }>
              <h2>{name}</h2>
              <p style={{
                textDecoration: 'none',
                color: 'black'
              }}
              >{formatMoney(price)}</p>
            </Card>
              </a>
            
          )
        }
        )}
      </Carousel>
    </div>
  )
}