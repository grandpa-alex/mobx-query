// import { createAtom } from 'mobx';
// import { QueryClient, QueryObserver } from '@tanstack/react-query';

// // Создаём клиент React Query
// const queryClient = new QueryClient();

// export function createMobXQuery(queryOptions: any) {
//   // Создаём атом MobX
//   const atom = createAtom(
//     'ReactQueryAtom', // Имя атома
//     () => {
//       // Регистрируем реактивное поведение, когда кто-то начинает следить за атомом
//       observer.setEnabled(true);
//     },
//     () => {
//       // Отключаем реакцию, если никто не наблюдает за атомом
//       observer.setEnabled(false);
//     }
//   );

//   // Состояние, которое будем хранить в MobX атоме
//   const queryState = {
//     data: null,
//     isLoading: true,
//     error: null,
//   };

//   // Создаём наблюдателя QueryObserver для управления запросами
//   const observer = new QueryObserver(queryClient, queryOptions);

//   // Подписываемся на изменения состояния запроса
//   const unsubscribe = observer.subscribe(result => {
//     queryState.data = result.data;
//     queryState.isLoading = result.isLoading;
//     queryState.error = result.error;

//     // Говорим MobX, что данные изменились
//     atom.reportChanged();
//   });

//   // Возвращаем объект, который включает реактивное состояние
//   return {
//     get data() {
//       atom.reportObserved(); // Сообщаем MobX, что значение используется
//       return queryState.data;
//     },
//     get isLoading() {
//       atom.reportObserved();
//       return queryState.isLoading;
//     },
//     get error() {
//       atom.reportObserved();
//       return queryState.error;
//     },
//     refetch: () => observer.refetch(),
//     unsubscribe,
//   };
// }

export {}