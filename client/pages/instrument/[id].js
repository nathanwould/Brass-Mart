import SingleProduct from "../../components/SingleProduct";

export default function SingleInstrumentPage({ query }) {
  return (
        <SingleProduct id={query.id}/>
  )
}