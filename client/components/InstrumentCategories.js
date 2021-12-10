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
      // justifyContent: "space-evenly",
      width: '60%',
      margin: "0 auto 5vh"
    }}
    >
      <h2>Shop Instruments By Category:</h2>
      <div style={{
        marginTop: "2vh",
        display: "flex",
        justifyContent: "space-between"
      }}>
      <a
          className=""
          href='/instruments/trumpets'
          style={{background: 'white' }}
        >
      <Card hoverable >
        <Card.Meta title="Trumpets" style={{textAlign: 'center'}} />
      </Card>
      </a>
      <a
          className=""
          href='/instruments/horns'
          style={{background: 'white' }}
        >
      <Card
        hoverable
      >
        <Card.Meta title="Horns" style={{textAlign: 'center'}} />
      </Card>
      </a>
      <a
          className=""
          href='/instruments/trombones'
          style={{background: 'white' }}
        >
      <Card
        hoverable
      >
        <Card.Meta title="Trombones" style={{textAlign: 'center'}} />
      </Card>
      </a>
      <a
          className=""
          href='/instruments/euphoniums'
          style={{background: 'white' }}
        >
      <Card
        hoverable
      >
        <Card.Meta title="Euphoniums" style={{textAlign: 'center'}} />
      </Card>
      </a>
      <a
          className=""
          href='/instruments/tubas'
          style={{background: 'white' }}
        >
      <Card
        hoverable
      >
        <Card.Meta title="Tubas" style={{textAlign: 'center'}} />
      </Card>
        </a>
        </div>
    </div>
  )
}