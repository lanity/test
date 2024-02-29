import post from "../models/post.model.js";
import slugify from "slugify";
import redisClient from "../db/redis.js";
import Comment from "../models/comment.js";

/*
export const gettHomePosts = async (req,res) => {
    const { page } = req.query
    const limit = 2
    const skip = Number(page - 1) * limit
    try {
        const posts = await post.find().limit(limit).skip(skip)
        console.log("posts:",posts);
        res.status(200).render('partials/main/section', {
            posts,
        })
    } catch (error) {
        console.log(error.message);
    }

}
*/

export const gettAllPost = async (req,res) => {

    try {
        const posts = await post.find({})
        res.status(200).render('post-list', {
            layout: 'layouts/admin-layout',
            posts
        })
    } catch (error) {
        console.log(error.message);
    }

}

export const addGetPost = (req,res) => {
    res.render('post-add', {
        layout: 'layouts/admin-layout',
    })
}

export const addPostPost = async (req, res) => {
    try {
        const { title, body, categories } = req.body;

        // res.locals.user kontrolü ekleniyor
        if (res.locals.user && res.locals.user._id) {
            let postImage = "images/default_image.png";

            // Check if a file is uploaded
            if (req.file) {
                postImage = req.file.filename;
            }

            const newPost = new post({
                title,
                postImage,
                body,
                categories,
                author: res.locals.user._id,
                slug: slugify(title, { lower: true })
            });

            await newPost.save();
            res.status(201).json({ message: "Post oluşturuldu." });
        } else {
            // Eğer res.locals.user veya res.locals.user._id yoksa hata durumu
            res.status(400).json({ error: "Kullanıcı bilgisi eksik veya hatalı." });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



export const getDetailsPost = async (req,res) => {
    try {
        let slug = req.params.slug;
        const data = await post.findOne({ slug: slug }).populate('author', 'name');
        
        // Sayfa görüntüleme sayısını Redis'te artırın
        await redisClient.incr("post:views:" + slug);
        const views = await redisClient.get("post:views:" + slug);

        const commentList = await Comment.find({ postId: data._id });

        res.render('single',{
            data,
            views,
            slug,
            commentList
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteGetPost = async (req,res) => {
    try {
        const deletedPost = await post.findOneAndRemove({ _id: req.params.id });
        return res.status(200).redirect("/admin/posts")
    } catch (error) {
        
    }
}

export const addPost1 = (req,res) => {
    res.render('add-post1', {
        layout: 'layouts/test',
    })
}


export const like = async (req, res) => {
    const { postId } = req.params;
    
    try {
      let postLike = await post.findById(postId);
  
      if (!postLike) {
        return res.status(404).json({
          success: false,
          error: "Post not found",
        });
      }
  
      const userIndex = postLike.likes.indexOf(res.locals.user._id);
  
      if (userIndex === -1) {
        postLike.likes.push(res.locals.user._id);
      } else {
        postLike.likes.splice(userIndex, 1);
      }
  
      await postLike.save();
  
      // Beğeni sayısını al
      const likeCount = postLike.likes.length;
  
      console.log(`Beğeni sayisi: ${likeCount}`);
  
      res.status(200).redirect("/");
    } catch (error) {
        return res.status(500).json({
        success: false,
        error,
      });
    }
  };

  export const addComment = async (req,res) => {
    try {

        let slug = req.params.slug;
        const postId = await post.findOne({ slug: slug })


        const{ name, email, website, comment} = req.body


        const comments = new Comment({
            postId,
            name,
            email,
            website,
            comment
        })

       let commentSave = await comments.save();
        res.status(201).redirect('/')
    } catch (error) {
        return res.status(500).json(error)
    }    
  }

  export const searchPost = async (req,res) => {
    try {
        const {search} = req.query.search;
        
        const posts = await post.find({
            "$or": [
                {title:{$regex:search,$options:"i"}}
            ]
        })

        return res.redirect("/posts/searchResults?search=" + posts);
    } catch (error) {
        return res.status(500).json(error.message)
    }
  }