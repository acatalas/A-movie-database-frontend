import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: Movie[] = [
    {
      id: 1034541,
      title: 'Terrifier 3',
      genres: [
        {
          id: 27,
          name: 'Terror',
        },
        {
          id: 53,
          name: 'Suspense',
        },
      ],
      overview:
        'El payaso Art desata el caos entre los desprevenidos habitantes del condado de Miles mientras duermen plácidamente en Nochebuena. Tras sobrevivir a la masacre de Halloween perpetrada por el peor asesino en serie desde Jack el Destripador, Sienna y su hermano se esfuerzan por reconstruir sus vidas destrozadas. A medida que se acercan las fiestas de Navidad, intentan abrazar el espíritu navideño y dejar atrás los horrores del pasado. Pero justo cuando creen que están a salvo, el payaso Art regresa, decidido a convertir su alegría navideña en una nueva pesadilla. La temporada festiva se desmorona rápidamente mientras el payaso Art desata su retorcido terror marca de la casa, demostrando que ninguna festividad es segura.',
      runtime: 125,
      popularity: 1273.862,
      voteAverage: 6.9,
      voteCount: 1163,
      backdropPath: '/18TSJF1WLA4CkymvVUcKDBwUJ9F.jpg',
      posterPath: '/iaGfB2itLC8exBvfLUoadS0Q6tP.jpg',
      releaseDate: '2024-10-09',
      status: 'Released',
    },
    {
      id: 912649,
      title: 'Venom: El último baile',
      genres: [
        {
          id: 878,
          name: 'Ciencia ficción',
        },
        {
          id: 28,
          name: 'Acción',
        },
        {
          id: 12,
          name: 'Aventura',
        },
      ],
      overview:
        'Eddie y Venom están a la fuga. Perseguidos por sus sendos mundos y cada vez más cercados, el dúo se ve abocado a tomar una decisión devastadora que hará que caiga el telón sobre el último baile de Venom y Eddie.',
      runtime: 109,
      popularity: 6905.968,
      voteAverage: 6.425,
      voteCount: 992,
      backdropPath: '/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg',
      posterPath: '/b0obWWCLRVRqRzlSK1LSGtADkLM.jpg',
      releaseDate: '2024-10-22',
      status: 'Released',
    },
    {
      backdropPath: '/mQZJoIhTEkNhCYAqcHrQqhENLdu.jpg',
      genres: [
        {
          id: 16,
          name: 'Animación',
        },
        {
          id: 878,
          name: 'Ciencia ficción',
        },
        {
          id: 10751,
          name: 'Familia',
        },
      ],

      id: 1184918,
      overview:
        "El épico viaje de un robot -la unidad 7134 de Roz,'Roz' para abreviar- que naufraga en una isla deshabitada y debe aprender a adaptarse al duro entorno, entablando gradualmente relaciones con los animales de la isla y convirtiéndose en padre adoptivo de un pequeño ganso huérfano.",
      popularity: 1139.606,
      posterPath: '/a0a7RC01aTa7pOnskgJb3mCD2Ba.jpg',
      releaseDate: '2024-09-12',
      runtime: 102,
      status: 'Released',
      title: 'Robot salvaje',
      voteAverage: 8.402,
      voteCount: 3322,
    },
    {
      backdropPath: '/uVlUu174iiKhsUGqnOSy46eIIMU.jpg',
      genres: [
        {
          id: 18,
          name: 'Drama',
        },
        {
          id: 14,
          name: 'Fantasía',
        },
        {
          id: 10749,
          name: 'Romance',
        },
      ],
      id: 402431,
      overview:
        'Ambientada en la Tierra de Oz, mucho antes de la llegada de Dorothy Gale desde Kansas, la trama abarca los acontecimientos del primer acto del musical de Broadway. Elphaba es una joven incomprendida por su inusual color verde que aún no ha descubierto su verdadero poder. Glinda es una popular joven marcada por sus privilegios y su ambición que aún no ha descubierto su verdadera pasión. Las dos se conocen como estudiantes de la Universidad Shiz, en la fantástica Tierra de Oz, y forjan una insólita pero profunda amistad.',
      popularity: 1059.738,
      posterPath: '/q1czoLwMaiUO1bznWuETCP5ueZj.jpg',
      releaseDate: '2024-11-20',
      runtime: 160,
      status: 'Released',
      title: 'Wicked',
      voteAverage: 7.569,
      voteCount: 418,
    },
    {
      backdropPath: '/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg',
      genres: [
        {
          id: 16,
          name: 'Animación',
        },
        {
          id: 12,
          name: 'Aventura',
        },
        {
          id: 35,
          name: 'Comedia',
        },
        {
          id: 18,
          name: 'Drama',
        },
        {
          id: 10751,
          name: 'Familia',
        },
      ],
      id: 1022789,
      overview:
        "Riley entra en la adolescencia y el Cuartel General de su cabeza sufre una repentina reforma para hacerle hueco a algo totalmente inesperado propio de la pubertad: ¡nuevas emociones! Alegría, Tristeza, Ira, Miedo y Asco, con años de impecable gestión a sus espaldas (según ellos...) no saben muy bien qué sentir cuando aparece con enorme ímpetu Ansiedad. Y no viene sola: le acompañan envidia, vergüenza y aburrimiento. Secuela de 'Inside Out'.",
      popularity: 1017.497,
      posterPath: '/aQnbNiadeGzGSjWLaXyeNxpAUIx.jpg',
      releaseDate: '2024-06-11',
      runtime: 96,
      status: 'Released',
      title: 'Del revés 2 (Inside Out 2)',
      voteAverage: 7.576,
      voteCount: 4916,
    },
  ];
  getMovies(): Movie[] {
    return this.movies;
  }
  getMovie(id: number): Movie {
    return this.movies.filter(movie => movie.id === id)[0];
  }
}
