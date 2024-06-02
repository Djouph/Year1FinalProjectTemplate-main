using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using static Project.Utils;

namespace Project;

class Program
{
  static void Main()
  {
    /*───────────────────────────╮
    │ Creating the server object │
    ╰───────────────────────────*/
    var server = new HttpListener();
    server.Prefixes.Add("http://*:5000/");
    server.Start();

    Console.WriteLine("Server started. Listening for requests...");
    Console.WriteLine("Main page on http://localhost:5000/website/index.html");

    /*─────────────────────────╮
    │ Processing HTTP requests │
    ╰─────────────────────────*/
    while (true)
    {
      /*─────────────────────────────────────╮
      │ Creating the database context object │
      ╰─────────────────────────────────────*/
      var databaseContext = new DatabaseContext();

      /*────────────────────────────╮
      │ Waiting for an HTTP request │
      ╰────────────────────────────*/
      var serverContext = server.GetContext();
      var response = serverContext.Response;

      try
      {
        /*────────────────────────╮
        │ Handeling file requests │
        ╰────────────────────────*/
        serverContext.ServeFiles();

        /*───────────────────────────╮
        │ Handeling custome requests │
        ╰───────────────────────────*/
        HandleRequests(serverContext, databaseContext);

        /*───────────────────────────────╮
        │ Saving changes to the database │
        ╰───────────────────────────────*/
        databaseContext.SaveChanges();

      }
      catch (Exception e)
      {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine(e);
        Console.ResetColor();
      }

      /*───────────────────────────────────╮
      │ Sending the response to the client │
      ╰───────────────────────────────────*/
      response.Close();
    }
  }

  static void HandleRequests(HttpListenerContext serverContext, DatabaseContext databaseContext)
  {
    var request = serverContext.Request;
    var response = serverContext.Response;

    string absPath = request.Url!.AbsolutePath;


    if (absPath == "/logIn")
    {
      (string username, string password) = request.GetBody<(string, string)>();

      User user = databaseContext.Users.First(
        user => user.Username == username && user.Password == password
      );

      response.Write(user.Id);
    }
    else if (absPath == "/signIn")
    {

      (string username, string password) = request.GetBody<(string, string)>();

      User user = new User(username, password);

      var userA = databaseContext.Users.Add(user);

      response.Write(userA!.Entity.Id);

    }
    else if (absPath == "/Add")
    {
      (string date, string text, int userId) = request.GetBody<(string, string, int)>();

      Page page = new Page(date, text, userId);

      databaseContext.Pages.Add(page);
    }
    else if (absPath == "/getPreviews")
    {
      int userId = request.GetBody<int>();
      var previews = databaseContext.Pages.Where(
        page => page.UserId == userId
      ).Select(
        page => new
        {
          id = page.Id,
          date = page.Date,
          text = page.Text,
        }
      ).ToArray();

      response.Write(previews);
    }
    else if(absPath == "/getPage"){
      int pageId = request.GetBody<int>();

      Page page = databaseContext.Pages.Find(pageId)!;

      var data = new
      {
        Date = page.Date,
        text = page.Text,
      };

      // Console.WriteLine("data: ");
      Console.WriteLine(data);

      response.Write(data);
    }
  }
}

class DatabaseContext : DbContextWrapper
{
  public DbSet<User> Users { get; set; }
  public DbSet<Page> Pages { get; set; }
  public DatabaseContext() : base("Database") { }

}

class User(string username, string password)
{
  [Key]
  public int Id { get; set; }
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Page(string date, string text, int userId)
{
  [Key]
  public int Id { get; set; }
  public string Date { get; set; } = date;
  public string Text { get; set; } = text;

  public int UserId { get; set; } = userId;

  [ForeignKey("UserId")]
  public User? User { get; set; }
}