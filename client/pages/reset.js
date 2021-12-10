import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  console.log(query)
  if (!query?.token) {
    return (
      <div>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
}