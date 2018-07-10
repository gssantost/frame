const queries = {
  user: {
    create: 'INSERT INTO public.app_user (fullname, username, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id',
    selectById: 'SELECT fullname, username, email, bio, profile_pic FROM public.app_user WHERE user_id=$1',
    selectByUsername: 'SELECT user_id, password FROM public.app_user WHERE username = $1',
    getTypeUser: 'SELECT * FROM public.type_user WHERE type_id=(SELECT type_id FROM public.app_user WHERE user_id=$1)',
    selectUsers: 'SELECT * FROM public.app_user',
    updateUserPic: 'UPDATE public.app_user SET profile_pic=$1 WHERE user_id=$2',
    updateUser: 'UPDATE public.app_user SET fullname=$1, username=$2, bio=$3, email=$4 WHERE user_id=$5'
  }
}

export default queries;