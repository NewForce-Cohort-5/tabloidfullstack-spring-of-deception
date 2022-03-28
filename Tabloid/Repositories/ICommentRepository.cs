using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void DeleteComment(int commentId);
        List<Comment> GetAllCommentsByPostId(int id);
        Comment GetUserCommentById(int id, int userProfileId);
        void UpdateComment(Comment comment);
    }
}