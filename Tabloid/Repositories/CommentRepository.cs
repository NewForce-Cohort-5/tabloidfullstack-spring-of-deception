using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Repositories;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {

        public CommentRepository(IConfiguration config) : base(config) { }
        public List<Comment> GetAllCommentsByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              
                       SELECT c.Id, c.PostId, c.UserProfileId, c.[Subject], c.Content, C.CreateDateTime,
                         p.Title, p.Content, p.Id AS PostId, p.ImageLocation AS PostImage,
                         p.CreateDateTime AS PostCreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId,
                         u.Id AS UserId, u.DisplayName, u.FirstName, u.LastName, u.Email, u.CreateDateTime AS UserCreateDateTime, u.ImageLocation AS AvatarImage, u.UserTypeId,
                         ut.Name AS UserTypeName
                        FROM Comment c
                        Left JOIN Post p on c.PostId = p.Id
                        LEFT JOIN UserProfile u ON c.UserProfileId = u.Id
                        LEFT JOIN UserType ut on u.UserTypeId = ut.Id
                        WHERE c.PostId = @id
                        ORDER BY C.CreateDateTime DESC
                        ";

                    //This is how you pass the id parameter into the sql query
                    cmd.Parameters.AddWithValue("id", id);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(NewCommentFromReader(reader));
                    }

                    reader.Close();

                    return comments;
                }
            }
        }



        public Comment GetUserCommentById(int id, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Comment p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE p.id = @id AND p.UserProfileId = @userProfileId";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    Comment comment = null;

                    if (reader.Read())
                    {
                        comment = NewCommentFromReader(reader);
                    }

                    reader.Close();

                    return comment;
                }
            }
        }


        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (
                            PostId, UserProfileId, Subject, Content, CreateDateTime )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @PostId, @UserProfileId, @Subject, @Content, SYSDATETIME())";
                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@Subject", DbUtils.ValueOrDBNull(comment.Subject));
                    cmd.Parameters.AddWithValue("@Content", DbUtils.ValueOrDBNull(comment.Content));

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                Subject = DbUtils.GetNullableString(reader, "Subject"),
                Content = DbUtils.GetNullableString(reader, "Content"),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                }
            };
        }
        public void UpdateComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Comment
                            SET 
                                PostId = @postId, 
                                UserProfileId = @userProfileId, 
                                Subject = @subject, 
                                Content = @content, 
                                CreateDateTime = @createDateTime
                                
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@postId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@userProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@content", comment.Content);
                    DbUtils.AddParameter(cmd, "@createDateTime", comment.CreateDateTime);

                    DbUtils.AddParameter(cmd, "@id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteComment(int commentId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Comment
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", commentId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
