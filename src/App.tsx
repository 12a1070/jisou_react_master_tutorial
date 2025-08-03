import { useEffect, useState } from 'react';
import './App.css'

type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
};

type MovieJson = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

function App() {
  const defaultMovieList= [
  {
      id: 1,
      name: "君の名は。",
      image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/yLglTwyFOUZt5fNKm0PWL1PK5gm.jpg",
      overview: "1,000年に1度のすい星来訪が、1か月後に迫る日本。山々に囲まれた田舎町に住む女子高生の三葉は、町長である父の選挙運動や、家系の神社の風習などに鬱屈（うっくつ）していた。それゆえに都会への憧れを強く持っていたが、ある日彼女は自分が都会に暮らしている少年になった夢を見る。夢では東京での生活を楽しみながらも、その不思議な感覚に困惑する三葉。一方、東京在住の男子高校生・瀧も自分が田舎町に生活する少女になった夢を見る。やがて、その奇妙な夢を通じて彼らは引き合うようになっていくが……。",
    },
    {
      id: 2,
      name: "ハウルの動く城",
      image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/v0K2e1t6ocUNnkZ9BeiFdcOT9LG.jpg",
      overview: "父親の帽子店で帽子を作って暮らしていた18歳のソフィーは、荒野の魔女の呪いで90歳の老婆の姿になってしまう。彼女はハンサムだが気弱な魔法使いハウルと出会って、彼の居城でいっしょに暮らすようになるが、その城は4本足で歩く動く城だった。",
    },
    {
      id: 3,
      name: "もののけ姫",
      image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/mVdz3vlmioKWZaHTGfu99zIuayZ.jpg",
      overview: "山里に住む若者アシタカは、怒りと憎しみにより“タタリ神”と化した猪神から呪いをかけられてしまう。呪いを解く術を求めて旅に出るアシタカはやがて、西方の地で“タタラ”の村にたどり着く。エボシ御前が率いるその村では、鉄を造り続けていたが、同時にそれは神々の住む森を破壊することでもあった。そして、そんなタタラ達に戦いを挑むサンの存在をアシタカは知る。人の子でありながら山犬に育てられた彼女は“もののけ姫”と呼ばれていた。",
    },
    {
      id: 4,
      name: "バック・トゥーザ・フューチャー",
      image: "https://media.themoviedb.org/t/p/w600_and_h900_bestv2/oHaxzQXWSvIsctZfAYSW0tn54gQ.jpg",
      overview: "スティーブン・スピルバーグとロバート・ゼメキスが贈るSFアドベンチャーシリーズ第1弾。高校生のマーティは、科学者・ドクの発明したタイムマシン・デロリアンで過去にタイムスリップしてしまう。",
    },
  ];

  const [keyword, setKeyword] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);


  const fetchMovieList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ja&page=1",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    setMovieList(data.results.map((movie: MovieJson) => ({
      id: movie.id,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
    })));
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  return (
    <div>
      <div>{keyword}</div>
      <input type="text" onChange={(e) => setKeyword(e.target.value)}/>
      {movieList
        .filter((movie) => movie.original_title.includes(keyword))
        .map((movie) => (
          <div key={movie.id} >
            <h2>{movie.original_title}</h2>
            <img
              src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
            />
            <p>{movie.overview}</p>
          </div>
      ))}
    </div>
  );
}

export default App;
