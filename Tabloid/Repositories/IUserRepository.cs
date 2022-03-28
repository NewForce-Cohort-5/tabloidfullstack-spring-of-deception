using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        public List<UserProfile> GetAll();
        public UserProfile GetById(int id);
        public void Deactivate(int id);
        public void Reactivate(int id);
        public void UpdateProfileType(UserProfile userProfile);
        public List<UserType> GetUserTypes();
    }
}