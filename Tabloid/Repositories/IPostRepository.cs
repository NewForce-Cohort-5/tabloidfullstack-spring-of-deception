using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        Post GetPostById(int id);
        List<Post> GetAllPostsByUser(int userProfileId);
        void DeletePost(int id);
        void Add(Post post);

    }
}
