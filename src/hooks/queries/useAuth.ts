import {useMutation, useQuery} from '@tanstack/react-query';
import {getAccessToken, postLogin, postSignup} from '../../api/auth';
import {UseMutationCustomOptions} from '../../types/common';
import {removeEncryptStorage, setEncryptStorage} from '../../utils';
import {removeHeader, setHeader} from '../../utils/header';
import {useEffect} from 'react';

function useSignup(mutaionOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutaionOptions,
  });
}

function useLogin(mutaionOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage('refreshToken', refreshToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      //
    },
    ...mutaionOptions,
  });
}

function useGetRefreshToken() {
  const {isSuccess, data, isError} = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3,
    //시간 주기에 따라 다시 refech 할 수 있는 기능
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    //앱을 종료하지 않고 다른 작업을 했다가 와도 계속 할 수 있는 기능
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage('refreshToken', data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    }
  }, [isError]);

  return {isSuccess, isError};
}
