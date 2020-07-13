using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication11.Models;

namespace WebApplication11.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoDetailsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoDetailsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/TodoDetails
        [HttpGet]
        public IEnumerable<TodoDetails> Gettodo()
        {
            return _context.todo;
        }

        // GET: api/TodoDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoDetails([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todoDetails = await _context.todo.FindAsync(id);

            if (todoDetails == null)
            {
                return NotFound();
            }

            return Ok(todoDetails);
        }

        // PUT: api/TodoDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoDetails([FromRoute] int id, [FromBody] TodoDetails todoDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != todoDetails.id)
            {
                return BadRequest();
            }

            _context.Entry(todoDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoDetailsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TodoDetails
        [HttpPost]
        public async Task<IActionResult> PostTodoDetails([FromBody] TodoDetails todoDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.todo.Add(todoDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoDetails", new { id = todoDetails.id }, todoDetails);
        }

        // DELETE: api/TodoDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoDetails([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todoDetails = await _context.todo.FindAsync(id);
            if (todoDetails == null)
            {
                return NotFound();
            }

            _context.todo.Remove(todoDetails);
            await _context.SaveChangesAsync();

            return Ok(todoDetails);
        }

        private bool TodoDetailsExists(int id)
        {
            return _context.todo.Any(e => e.id == id);
        }
    }
}