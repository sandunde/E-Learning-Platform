using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using Newtonsoft.Json;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SampleController : ControllerBase
    {
        private readonly MongoDBService _mongoDBService;

        public SampleController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpPost("addStudent")]
        public IActionResult AddUser([FromBody] User user)
        {
            try
            {
                user.Role ??= "student"; // set default role if not provided
                Console.WriteLine($"Received user data: {user.Name}, {user.Email}, Age: {user.Age}, Role: {user.Role}, Password: {user.Password}");

                var collection = _mongoDBService.GetUserCollection();
                collection.InsertOne(user);
                return Ok(new { message = "Student added successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding student: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            try
            {
                var collection = _mongoDBService.GetUserCollection();
                var users = collection.Find(_ => true).ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching users: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                var collection = _mongoDBService.GetUserCollection();
                var user = collection.Find(u => u.Email == loginRequest.Email).FirstOrDefault();

                if (user == null || user.Password != loginRequest.Password)
                {
                    return Unauthorized(new { message = "Invalid email or password" });
                }

                return Ok(new
                {
                    message = "Login successful",
                    userId = user.Id.ToString(),
                    role = user.Role
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error logging in: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("user/{id}")]
        public IActionResult GetUserById(string id)
        {
            try
            {
                var collection = _mongoDBService.GetUserCollection();
                var objectId = ObjectId.Parse(id);
                var user = collection.Find(u => u.Id == objectId).FirstOrDefault();

                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(user);
            }
            catch (FormatException)
            {
                return BadRequest(new { message = "Invalid user ID format" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching user by ID: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpPut("updateUser/{id}")]
        public IActionResult UpdateUser(string id, [FromBody] User updatedUser)
        {
            try
            {
                var collection = _mongoDBService.GetUserCollection();
                var objectId = ObjectId.Parse(id);

                var updateDefinition = Builders<User>.Update
                    .Set(u => u.Name, updatedUser.Name)
                    .Set(u => u.Email, updatedUser.Email)
                    .Set(u => u.ContactNumber, updatedUser.ContactNumber)
                    .Set(u => u.Address, updatedUser.Address)
                    .Set(u => u.DOB, updatedUser.DOB)
                    .Set(u => u.Age, updatedUser.Age)
                    .Set(u => u.Password, updatedUser.Password)
                    .Set(u => u.Role, updatedUser.Role);

                var result = collection.UpdateOne(u => u.Id == objectId, updateDefinition);

                if (result.MatchedCount == 0)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(new { message = "User updated successfully" });
            }
            catch (FormatException)
            {
                return BadRequest(new { message = "Invalid user ID format" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating user: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpDelete("deleteUser/{id}")]
        public IActionResult DeleteUser(string id)
        {
            try
            {
                var collection = _mongoDBService.GetUserCollection();
                var objectId = ObjectId.Parse(id);
                var result = collection.DeleteOne(u => u.Id == objectId);

                if (result.DeletedCount == 0)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(new { message = "User deleted successfully" });
            }
            catch (FormatException)
            {
                return BadRequest(new { message = "Invalid user ID format" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting user: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
    }
}
