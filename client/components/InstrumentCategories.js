import { Card } from "antd";


const categoryImageStyles = {
  width: '20vh',
  height: '15vh',
  marginBottom: '2vh',
  objectFit: 'cover'
};

export default function InstrumentCategories() {
  return (
    <div
      className='category-container'
      style={{
      display: 'flex',
      flexDirection: "column",
    }}
    >
      <h2>Shop Instruments By Category:</h2>
      <div
        className="category-buttons"
        style={{
        marginTop: "2vh",
        display: "flex",
        margin: "1rem 0 2rem"
      }}>
      <a
          className=""
          href='/instruments/trumpets'
        >
          <Card
            hoverable
            className="category-card">
        <Card.Meta title="Trumpets" style={{textAlign: 'center'}} />
      </Card>
      </a>
      <a
          className=""
          href='/instruments/horns'
      >
        <Card
          hoverable
          className="category-card"
        >
          <Card.Meta title="Horns" style={{textAlign: 'center'}} />
        </Card>
      </a>
      <a
          className=""
          href='/instruments/trombones'
      >
        <Card
          hoverable
          className="category-card"
        >
          <Card.Meta title="Trombones" style={{textAlign: 'center'}} />
        </Card>
      </a>
      <a
          className=""
          href='/instruments/euphoniums'
      >
        <Card
          hoverable
          className="category-card"
        >
          <Card.Meta title="Euphoniums" style={{textAlign: 'center'}} />
        </Card>
      </a>
      <a
          className=""
          href='/instruments/tubas'
      >
        <Card
            hoverable
            className="category-card"
        >
          <Card.Meta title="Tubas" style={{textAlign: 'center'}} />
        </Card>
        </a>
        </div>
    </div>
  )
}