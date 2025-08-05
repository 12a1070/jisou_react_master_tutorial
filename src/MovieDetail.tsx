import { useParams } from "react-router";

function MovieDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Movie Detail</h1>
      <div>{ id }</div>
    </div >
  );
}

export default MovieDetail;
