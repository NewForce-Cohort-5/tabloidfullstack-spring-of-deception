using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        //private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserRepository _userRepository;
        public UserProfileController( IUserRepository userRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);

                if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET: UserProfileController
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }

        // GET: UserProfileController
        [HttpGet("GetAdmins")]
        public ActionResult GetAdmins()
        {
            return Ok(_userRepository.GetAdminProfiles());
        }


        // GET: UserProfileController
        [HttpGet("userTypes")]
        public ActionResult GetUserTypes()
        {
            return Ok(_userRepository.GetUserTypes());
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userRepository.Add(userProfile);
            return CreatedAtAction(
                "GetByEmail",
                new { email = userProfile.Email },
                userProfile);
        }

        //userprofile/id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {

            var user = _userRepository.GetById(id);

            if (user.ImageLocation == null)
            {
                user.ImageLocation = "https://avatars.dicebear.com/api/bottts/.svg";
            }
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // Patch /userprofilecontroller/deactivate/id
        [HttpPatch("deactivate/{id}")]
        public void Deactivate(int id)
        {
            _userRepository.Deactivate(id);
            
        }

        // Patch /userprofilecontroller/deactivate/id
        [HttpPatch("reactivate/{id}")]
        public void Reactivate(int id)
        {
            _userRepository.Reactivate(id);

        }

        //Update /userprofilecontroller/id
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {

            _userRepository.UpdateProfileType(userProfile);
            return NoContent();

        }


    }
}
