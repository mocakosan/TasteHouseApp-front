import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  //리액크 쿼리는 요청을 실패하면 기본적으로
  //재요청을 3번하게 되어있는데 그것을 하지않게 바꿈
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
