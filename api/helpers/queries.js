const queries = {
  user: {
    create: 'INSERT INTO public.app_user (fullname, username, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id',
    selectById: 'SELECT fullname, username, email, bio, profile_pic FROM public.app_user WHERE user_id=$1',
    selectByUsername: 'SELECT user_id, password FROM public.app_user WHERE username = $1',
    getTypeUser: 'SELECT * FROM public.type_user WHERE type_id=(SELECT type_id FROM public.app_user WHERE user_id=$1)',
    selectUsers: 'SELECT * FROM public.app_user',
    updateUserPic: 'UPDATE public.app_user SET fullname=$1, username=$2, bio=$3, email=$4, profile_pic=$5 WHERE user_id=$6',
    updateUser: 'UPDATE public.app_user SET fullname=$1, username=$2, bio=$3, email=$4 WHERE user_id=$5'
  },
  media: {
    create: 'INSERT INTO public.media (media_des, media_url, user_id) VALUES ($1, $2, $3)',
    selectByUserId: 'SELECT * FROM public.media WHERE user_id=$1',
    selectById: 'SELECT * FROM public.media WHERE media_id=$1',
    pagination: 'SELECT * FROM public.media ORDER BY created_at DESC LIMIT $1 OFFSET (($2 - 1) * $1)', /** ^1 */
    update: 'UPDATE public.media SET media_des = $1 WHERE media_id=$2 RETURNING media_des',
    delete: 'DELETE FROM public.media WHERE media_id=$1',
  }
}

/**
 * ^1
 *   parámetro $1: items a retornar, parámetro $2: conteo de páginas/infiniteScroll
 */

export default queries;