const queries = {
  user: {
    create: 'INSERT INTO public.app_user (fullname, username, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id',
    selectById: 'SELECT user_id, fullname, username, email, bio, profile_pic FROM public.app_user WHERE user_id=$1',
    //selectWithOtherId: 'SELECT U.user_id, fullname, username, email, bio, profile_pic, CASE WHEN($1 = F.user_id) THEN true ELSE false END AS has_follow FROM public.app_user AS U FULL OUTER JOIN public.follow AS F ON F.user_id = U.user_id WHERE U.user_id=$2',
    selectByUsername: 'SELECT user_id, password FROM public.app_user WHERE username = $1',
    getTypeUser: 'SELECT * FROM public.type_user WHERE type_id=(SELECT type_id FROM public.app_user WHERE user_id=$1)',
    selectUsers: 'SELECT * FROM public.app_user',
    updateUserPic: 'UPDATE public.app_user SET fullname=$1, username=$2, bio=$3, email=$4, profile_pic=$5 WHERE user_id=$6',
    updateUser: 'UPDATE public.app_user SET fullname=$1, username=$2, bio=$3, email=$4 WHERE user_id=$5'
  },
  media: {
    create: 'INSERT INTO public.media (media_des, media_url, user_id) VALUES ($1, $2, $3)',
    selectByGuestId: 'SELECT M.*, U.username, U.profile_pic, COUNT( * ) FILTER(WHERE C.media_id = M.media_id) AS comments, COUNT( * )FILTER(WHERE L.likes_state) AS likes, CASE WHEN(L.user_id = $1 AND L.likes_state) THEN true ELSE false END AS has_like, CASE WHEN(C.media_id = M.media_id) THEN true ELSE false END AS has_comment FROM media as M INNER JOIN app_user AS U ON U.user_id = M.user_id FULL OUTER JOIN likes AS L ON L.media_id = M.media_id FULL OUTER JOIN comments AS C ON C.media_id = M.media_id FULL OUTER JOIN public.follow AS F ON F.user_id = U.user_id WHERE M.user_id=$2 GROUP BY M.media_id, U.username, U.profile_pic, L.user_id, L.likes_state, C.media_id, F.user_id ORDER BY M.created_at DESC',
    selectByUserId: 'SELECT M.*, U.username, U.profile_pic, COUNT( * ) FILTER(WHERE C.media_id = M.media_id) AS comments, COUNT( * ) FILTER(WHERE L.likes_state) AS likes, CASE WHEN(L.user_id = $1 AND L.likes_state) THEN true ELSE false END AS has_like, CASE WHEN(C.media_id = M.media_id) THEN true ELSE false END AS has_comment FROM media as M INNER JOIN app_user AS U ON U.user_id = M.user_id FULL OUTER JOIN likes AS L ON L.media_id = M.media_id FULL OUTER JOIN comments AS C ON C.media_id = M.media_id WHERE M.user_id=$2 GROUP BY M.media_id, U.username, U.profile_pic, L.user_id, L.likes_state, C.media_id ORDER BY M.created_at DESC',
    selectById: 'SELECT M.*, U.username, U.profile_pic, COUNT( * ) FILTER(WHERE C.media_id = M.media_id) AS comments, COUNT( * ) FILTER(WHERE L.likes_state) AS likes, CASE WHEN(L.user_id = $1 AND L.likes_state) THEN true ELSE false END AS has_like, CASE WHEN(C.media_id = M.media_id) THEN true ELSE false END AS has_comment FROM media as M INNER JOIN app_user AS U ON U.user_id = M.user_id FULL OUTER JOIN likes AS L ON L.media_id = M.media_id FULL OUTER JOIN comments AS C ON C.media_id = M.media_id WHERE M.media_id = $2 GROUP BY M.media_id, U.username, U.profile_pic, L.user_id, L.likes_state, C.media_id',
    pagination: 'SELECT M.*, U.username, U.profile_pic, COUNT( * ) FILTER(WHERE C.media_id = M.media_id) AS comments, COUNT( * ) FILTER(WHERE L.likes_state) AS likes, CASE WHEN(L.user_id = $1 AND L.likes_state) THEN true ELSE false END AS has_like, CASE WHEN(C.media_id = M.media_id) THEN true ELSE false END AS has_comment FROM media as M INNER JOIN app_user AS U ON U.user_id = M.user_id FULL OUTER JOIN likes AS L ON L.media_id = M.media_id FULL OUTER JOIN comments AS C ON C.media_id = M.media_id GROUP BY M.media_id, U.username, U.profile_pic, L.user_id, L.likes_state, C.media_id ORDER BY created_at DESC LIMIT $2 OFFSET(($3 - 1) * $2)',
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
    create: 'INSERT INTO public.follow (follow_id, user_id) VALUES ($1, $2) RETURNING true',
    delete: 'DELETE FROM public.follow WHERE follow_id=$1 AND user_id=$2'
  },
  comments: {
    create: 'INSERT INTO public.comments (comment_text, media_id, user_id) VALUES ($1, $2, $3) RETURNING comment_id',
    update: 'UPDATE public.comments SET comment_text=$1, created_at=NOW() WHERE comment_id=$2 AND user_id=$3 RETURNING comment_text, created_at',
    delete: 'DELETE FROM public.comments WHERE comment_id=$1',
    select: 'SELECT C.*, username, profile_pic, (C.user_id=$1) AS allow FROM public.comments as C INNER JOIN public.app_user as U on U.user_id = C.user_id INNER JOIN public.media as M on M.media_id = C.media_id WHERE M.media_id=$2',
    selectComment: 'SELECT C.*, username, profile_pic, (C.user_id=$1) AS allow FROM public.comments as C INNER JOIN public.app_user as U on U.user_id = C.user_id INNER JOIN public.media as M on M.media_id = C.media_id WHERE C.comment_id=$2',
    commentsCount: 'SELECT COUNT(*) as comment_total FROM public.comments as C INNER JOIN public.media as M on M.media_id = C.media_id WHERE M.media_id = $1',
  }
}

/**
 * ^1
 *   parámetro $1: items a retornar, parámetro $2: contador de páginas o infiniteScroll
 */

export default queries;