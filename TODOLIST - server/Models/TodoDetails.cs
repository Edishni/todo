using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication11.Models
{
    public class TodoDetails
    {
        [Key]
        public int id { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string taskName { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string description { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public string data { get; set; }
    }
}