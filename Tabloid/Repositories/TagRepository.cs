using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;


namespace Tabloid.Repositories
{
    public class TagRepository: BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration config) : base(config) { }

        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT id, name FROM Tag";
                    var reader = cmd.ExecuteReader();

                    var tags = new List<Tag>();

                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                        });
                    }
                    reader.Close();
                    return tags;
                }
            }
        }

        public void AddTag(Tag tag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                INSERT INTO Tag (Name)
                            OUTPUT INSERTED.ID
                                    VALUES (@name)";

                    DbUtils.AddParameter(cmd, "@Name", tag.Name);

                    tag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //public void DeleteTag (int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"DELETE FROM Tag WHERE Id = @Id";
        //            DbUtils.AddParameter(cmd, "@id", id);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        //public void UpdateTag(Tag tag)
        //{
        //    Connection.Open();
        //    using (var cmd = Connection.CreateCommand())
        //    {
        //        cmd.CommandText = @"
        //                    UPDATE Tag
        //                      SET Name = @name
        //                    WHERE Id = @id";

        //        DbUtils.AddParameter(cmd, "@name", tag.Name);
        //        DbUtils.AddParameter(cmd, "@id", tag.Id);

        //        cmd.ExecuteNonQuery();
        //    }
        //}

        //public Tag GetById(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                        SELECT Tag.Name
        //                        FROM Tag
        //                        LEFT JOIN Post on Post.TagId = Tag.Id
        //                        WHERE Tag.Id = @Id";

        //            DbUtils.AddParameter(cmd, "@Id," id);

        //            var reader = cmd.ExecuteReader();

        //            Tag tag = null;
        //            while (reader.Read())
        //            {
        //                if (tag == null)
        //                {
        //                    tag = new Tag()
        //                    {
        //                        Id = id,
        //                        Name = DbUtils.GetString(reader, "Name")
        //                    };
        //                }
        //            }
        //            reader.Close();
        //            return tag;
        //        }
        //    }
        //}

    }
}
