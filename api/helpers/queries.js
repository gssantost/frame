const queries = {
  user: {
    create: 'INSERT INTO public.app_user (fullname, username, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id',
    
    selectById: 'SELECT user_id, fullname, username, email, bio, profile_pic FROM public.app_user WHERE user_id=$1',
    
    selectByUsername: 'SELECT user_id, password FROM public.app_user WHERE username = $1',
    
    getTypeUser: 'SELECT * FROM public.type_user WHERE type_id=(SELECT type_id FROM public.app_user WHERE user_id=$1)',
    
    selectUsers: 'SELECT * FROM public.app_user',
    
    updateUserPic: 'UPDATE public.app_user SET fullname=$1, username=$2, bio=$3, email=$4, profile_pic=$5 WHERE user_id=$6',
    
    updateUser: 'UPDATE public.app_user SET fullname=$1, username=$2, bio=$3, email=$4 WHERE user_id=$5'
  },
  media: {
    create: 'INSERT INTO public.media (media_des, media_url, user_id) VALUES ($1, $2, $3) RETURNING media_id',

    selectByUserId: 'SELECT M.*, U.username, U.profile_pic, COUNT( * ) FILTER(where C.media_id = M.media_id) as comments, (SELECT COUNT( * ) FILTER(where likes_state) from likes WHERE media_id = M.media_id) as likes, CASE WHEN(L.likes_state) THEN true ELSE false END AS has_like, CASE WHEN(C.media_id = M.media_id) THEN true ELSE false END AS has_comment FROM media AS M LEFT JOIN(SELECT * from likes WHERE user_id = $1) as L on L.media_id = M.media_id LEFT JOIN app_user as U on U.user_id = M.user_id LEFT JOIN comments as C on C.media_id = M.media_id WHERE U.user_id = $2 GROUP BY M.media_id, C.media_id, L.media_id, L.user_id, L.likes_state, U.username, U.profile_pic ORDER BY M.created_at DESC',

    selectById: 'SELECT M.*, U.username, U.profile_pic, COUNT( * ) FILTER(where C.media_id = M.media_id) as comments, (SELECT COUNT( * ) FILTER(where likes_state) from likes WHERE media_id = M.media_id) as likes, CASE WHEN(L.likes_state) THEN true ELSE false END AS has_like, CASE WHEN(C.media_id = M.media_id) THEN true ELSE false END AS has_comment FROM media AS M LEFT JOIN(SELECT * from likes WHERE user_id = $1) as L on L.media_id = M.media_id LEFT JOIN app_user as U on U.user_id = M.user_id LEFT JOIN comments as C on C.media_id = M.media_id WHERE M.media_id = $2 GROUP BY M.media_id, C.media_id, L.media_id, L.user_id, L.likes_state, U.username, U.profile_pic ',

    pagination: 'SELECT M.*, U.username, U.profile_pic, COUNT(*) FILTER(where C.media_id = M.media_id) as comments, (SELECT COUNT(*) FILTER(where likes_state) from likes WHERE media_id = M.media_id) as likes, CASE WHEN(L.likes_state) THEN true ELSE false END AS has_like, CASE WHEN(C.media_id = M.media_id) THEN true ELSE false END AS has_comment FROM media AS M LEFT JOIN (SELECT * from likes WHERE user_id = $1) as L on L.media_id = M.media_id LEFT JOIN app_user as U on U.user_id = M.user_id LEFT JOIN comments as C on C.media_id = M.media_id GROUP BY M.media_id, C.media_id, L.media_id, L.user_id, L.likes_state, U.username, U.profile_pic ORDER BY M.created_at DESC LIMIT $2 OFFSET(($3 - 1) * $2)',
    
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
    
    delete: 'DELETE FROM public.follow WHERE follow_id=$1 AND user_id=$2',

    check: 'SELECT * FROM public.follow WHERE follow_id=$1 AND user_id=$2'
  },
  comments: {
    create: 'INSERT INTO public.comments (comment_text, media_id, user_id) VALUES ($1, $2, $3) RETURNING comment_id',
    
    update: 'UPDATE public.comments SET comment_text=$1, created_at=NOW() WHERE comment_id=$2 AND user_id=$3 RETURNING comment_text, created_at',
    
    delete: 'DELETE FROM public.comments WHERE comment_id=$1',
    
    select: 'SELECT C.*, username, profile_pic, (C.user_id=$1) AS allow FROM public.comments as C INNER JOIN public.app_user as U on U.user_id = C.user_id INNER JOIN public.media as M on M.media_id = C.media_id WHERE M.media_id=$2',
    
    selectComment: 'SELECT C.*, username, profile_pic, (C.user_id=$1) AS allow FROM public.comments as C INNER JOIN public.app_user as U on U.user_id = C.user_id INNER JOIN public.media as M on M.media_id = C.media_id WHERE C.comment_id=$2',
    
    commentsCount: 'SELECT COUNT(*) as comment_total FROM public.comments as C INNER JOIN public.media as M on M.media_id = C.media_id WHERE M.media_id = $1',
  },
  search: {
    select: 'SELECT MT.tag_id, T.tag_des, M.media_id, M.media_url FROM media_tags as MT INNER JOIN media as M on M.media_id = MT.media_id INNER JOIN tags as T on T.tag_id = MT.tag_id WHERE T.tag_id = $1 ORDER BY M.created_at DESC',
    
    byUsername: "SELECT * FROM app_user WHERE username LIKE '%$1:value%'",
    
    byTag: "SELECT * FROM tags WHERE lower(tag_des) LIKE '%#$1:value%' OR upper(tag_des) LIKE '#$1:value%' ORDER BY tag_des"
  },
  tags: {
    createTag: 'INSERT INTO tags (tag_id, tag_des) VALUES ((SELECT tag_id + 1 FROM tags ORDER BY tag_id DESC LIMIT 1), $1) RETURNING tag_id',

    createMediaTag: 'INSERT INTO media_tags (media_id, tag_id) VALUES ($1, $2)',

    exists: 'SELECT * FROM tags WHERE tag_des=$1',
  }
}

/**
 * ^1
 *   parámetro $1: items a retornar, parámetro $2: contador de páginas o infiniteScroll
 */

export default queries;