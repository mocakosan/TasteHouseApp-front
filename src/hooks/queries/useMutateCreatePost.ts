import {createPost} from '@/api';
import {UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
