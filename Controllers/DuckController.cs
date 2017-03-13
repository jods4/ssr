using Microsoft.AspNetCore.Mvc;

namespace AureliaDemo.Controllers
{
  [Route("/api/duck")]
  public class DuckController {

    private static object[] data = new[] {
      new { Id = 1, FirstName = "Scrooge", LastName = "McDuck" },
      new { Id = 2, FirstName = "Huey", LastName = "Duck" },
      new { Id = 3, FirstName = "Dewey", LastName = "Duck" },
      new { Id = 4, FirstName = "Louie", LastName = "Duck" },
      new { Id = 5, FirstName = "Webbigail", LastName = "Vanderquack" },
    };

    [HttpGet]
    public object Index() => data;

    [HttpGet("{id}")]
    public object Index(int id) => data[id - 1];
  }
}