using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration config) : base(config) { }
        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT id, name FROM Category";
                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                        });
                    }

                    reader.Close();

                    return categories;
                }
            }
        }

        public void AddCategory(Category category)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    INSERT INTO Category (Name)
                                    OUTPUT INSERTED.ID
                                    VALUES (@name)";

                    DbUtils.AddParameter(cmd, "@Name", category.Name);


                    category.Id = (int)cmd.ExecuteScalar();

                    
                }
            }
        }

        public void DeleteCategory(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Category WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                
                        cmd.ExecuteNonQuery();
              
                     

                  
                }
            }
        }

        public void UpdateCategory(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                UPDATE Category
                                SET Name = @name
                                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@name", category.Name);
                    DbUtils.AddParameter(cmd, "@id",category.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
   
        public Category GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT Category.Name
                                FROM Category
                            LEFT JOIN Post on Post.CategoryId = Category.Id
                                WHERE Category.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Category category = null;
                    while (reader.Read())
                    {
                        if (category == null)
                        {
                            category = new Category()
                            {
                                Id = id,
                                Name = DbUtils.GetString(reader, "Name")
                            };
                        }

                    }
                    reader.Close();
                    return category;
                }
            }
        }
    }
}
