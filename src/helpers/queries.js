const queries = {
  user: {
    create: 'INSERT INTO public.app_user (fullname, username, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id',
    selectById: 'SELECT fullname, username, email, bio, profile_pic FROM public.app_user WHERE user_id=$1',
    selectByUsername: 'SELECT fullname, username, email, password, type_id FROM public.app_user WHERE username = $1',
    getTypeUser: 'SELECT * FROM public.type_user WHERE type_id=(SELECT type_id FROM public.app_user WHERE user_id=$1)',
    selectUsers: 'SELECT * FROM public.app_user',
  }
}

export default queries;