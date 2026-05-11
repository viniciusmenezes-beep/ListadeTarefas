
using Lista_de_Tarefas.Data;
using Lista_de_Tarefas.Models;
using Microsoft.AspNetCore.Mvc;
namespace Lista_de_Tarefas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly PessoaContext _context;

        public PessoaController(PessoaContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login(Pessoa dadosLogin)
        {
            var loginU = _context.Pessoas.Where(u => u.Email.Equals(dadosLogin.Email) && u.Senha.Equals(dadosLogin.Senha)).ToList();


            if (loginU.Count == 0)

                return Unauthorized("Email ou Senha Incorretas");
            HttpContext.Session.SetString("email", dadosLogin.Email);
            Response.Cookies.Append("Idusado", loginU[0].Id.ToString(),

            new CookieOptions
            {
                Expires = DateTime.Now.AddMinutes(30),
                Secure = true,
                HttpOnly = true
            });


            return Ok("Login realizado com sucesso!");
        }

        [HttpPost]
        public IActionResult CadastraCliente(Pessoa pessoa)
        {
            _context.Add(pessoa);
            _context.SaveChanges();
            return Created("", pessoa);
        }

        [HttpPut("Atualizar/{id}")]
        public IActionResult AtualizarPessoas(int id, Pessoa pessoa)
        {
            var pessoaDoBanco = _context.Pessoas.Find(id);

            if (pessoaDoBanco == null)
                return NotFound("Pessoa não encontrada.");

            pessoaDoBanco.Nome = pessoa.Nome;
            pessoaDoBanco.Senha = pessoa.Senha;
            pessoaDoBanco.Email = pessoa.Email;
            _context.SaveChanges();

            return Ok("Atualizado");
        }



        [HttpGet]
        public IActionResult ConsultaPessoas()
        {
            return Ok(_context.Pessoas.ToList());
        }


        [HttpGet("{id}")]
        public IActionResult ConsultarPessoas(int id)
        {
            var pessoaDoBanco = _context.Pessoas.Find(id);

            if (pessoaDoBanco == null)
                return NotFound("Não encontrado");

            return Ok("Vou consultar uma pessoa");
        }


        [HttpDelete("Deletar/{id}")]
        public IActionResult DeletarPessoas(int id)
        {
            var pessoa = _context.Pessoas.Find(id);

            if (pessoa == null)
                return NotFound("Pessoa não encontarda");

            _context.Pessoas.Remove(pessoa);
            _context.SaveChanges();


            return Ok("Deletado");
        }
    }
}
