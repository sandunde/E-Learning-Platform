using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Backend.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; } 

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Email")]
        public string? Email { get; set; }

        [BsonElement("ContactNumber")]
        public string? ContactNumber { get; set; }  

        [BsonElement("Address")]
        public string? Address { get; set; }       

        [BsonElement("DOB")]
        public DateTime? DOB { get; set; }  

        [BsonElement("Age")]
        public int? Age { get; set; }         

        [BsonElement("Password")]
        public string Password { get; set; }       

        [BsonElement("Role")]
        public string Role { get; set; } = "student";

        [BsonElement("Gender")]
        public string Gender { get; set; }

        [BsonElement("Degree")]
        public string Degree { get; set; }
    }
}
