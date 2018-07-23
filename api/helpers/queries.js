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
    selectByUserId: 'SELECT * FROM public.media WHERE user_id=$1 ORDER BY created_at DESC',
    selectById: 'SELECT media_id, media_des, media_url, created_at, U.user_id, U.username, U.profile_pic FROM public.media as M INNER JOIN app_user U ON U.user_id = M.user_id WHERE media_id=$1',
    pagination: 'SELECT media_id, media_des, media_url, created_at, U.user_id, U.username, U.profile_pic FROM public.media as M INNER JOIN app_user U ON U.user_id = M.user_id ORDER BY created_at DESC LIMIT $1 OFFSET(($2 - 1) * $1)', /** ^1 */
    update: 'UPDATE public.media SET media_des = $1 WHERE media_id=$2 RETURNING media_des',
    delete: 'DELETE FROM public.media WHERE media_id=$1',
  },
  likes: {
    create: 'INSERT INTO public.likes (user_id, media_id, likes_state) VALUES ($1, $2, true)',
    update: 'UPDATE public.likes SET likes_state=(NOT likes_state) WHERE user_id=$1 AND media_id=$2',
    likesCount: 'SELECT COUNT(*) FILTER(WHERE likes_state) AS likes FROM public.likes WHERE media_id=$1',
    select: 'SELECT * FROM public.likes WHERE user_id=$1 AND media_id=$2'
  },
  follows: {
    followers: 'SELECT COUNT(*) AS followers FROM public.follow AS F INNER JOIN public.app_user AS U ON U.user_id = F.follow_id WHERE U.user_id=$1',
    followings: 'SELECT COUNT(*) AS followings FROM public.follow AS F INNER JOIN public.app_user AS U ON U.user_id = F.user_id WHERE U.user_id=$1',
    postsCount: 'SELECT COUNT(*) AS posts FROM public.media AS M INNER JOIN public.app_user AS U ON U.user_id = M.user_id WHERE U.user_id=$1',
    create: 'INSERT INTO public.follow (follow_id, user_id) VALUES ($1, $2) RETURNING follow_id',
    delete: 'DELETE FROM public.follow WHERE follow_id=$1 AND user_id=$2'
  },
  comments: {
    create: 'INSERT INTO public.comments (comment_text, media_id, user_id) VALUES ($1, $2, $3)',
    update: 'UPDATE public.comments SET comment_text=$1, created_at=NOW() WHERE comment_id=$2 AND user_id=$3',
    delete: 'DELETE FROM public.comments WHERE comment_id=$1',
    select: 'SELECT C.*, username, profile_pic FROM public.comments as C INNER JOIN public.app_user as U on U.user_id = C.user_id INNER JOIN public.media as M on M.media_id = C.media_id WHERE M.media_id=$1',
    commentsCount: 'SELECT COUNT(*) as comment_total FROM public.comments as C INNER JOIN public.media as M on M.media_id = C.media_id WHERE M.media_id = $1',
  }
}

/**
 * ^1
 *   parámetro $1: items a retornar, parámetro $2: contador de páginas o infiniteScroll
 */

export default queries;