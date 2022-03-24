using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Repositories;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
    
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAllCategories());
        }

        //    // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{
        //    var category = _categoryRepository.GetById(id);
        //    if (category == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(category);
        //}

        //    // POST api/<ValuesController>
        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.AddCategory(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //    return CreatedAtAction("Get", new { id = category.Id }, category);

        //}

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        
        {
            try
            {
                _categoryRepository.DeleteCategory(id);
                return NoContent();
            } 
            catch (Exception ex)    
            {
                return NotFound();
            }
        }
    }

}
