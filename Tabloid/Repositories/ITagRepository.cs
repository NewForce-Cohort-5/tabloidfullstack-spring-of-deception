using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{

    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        void AddTag(Tag tag);
        public void DeleteTag(int id);
        Tag GetById(int id);
        public void UpdateTag(Tag tag); 
    }
}
