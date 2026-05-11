
using Lista_de_Tarefas.Data;
using Lista_de_Tarefas.Models;
using Microsoft.AspNetCore.Mvc;
namespace Lista_de_Tarefas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TarefaController : ControllerBase
    {
        private readonly PessoaContext _context;

        public TarefaController(PessoaContext context)
        {
            _context = context;
        }

        [HttpGet("reservas/{idPessoa}")]
        public IActionResult ReservasCliente(int idPessoa)
        {
            var resultado =
                from p in _context.Pessoas
                join t in _context.Tarefas
                on p.Id equals t.IdPessoa
                where p.Id == idPessoa

                select new
                {
                    Pessoa = p.Nome, p.Email,

                    Tarefa = t.Descricao, t.Statuss,
                   
                };

            return Ok(resultado.ToList());
        }


        [HttpGet("{Id}")]
        public IActionResult ConsultarPessoaId(int id, Tarefa tarefa)
        {

            var idPessoa = HttpContext.Session.GetString("email");
            if (idPessoa == null) return Unauthorized("não autorizado");

            var tarefaDoBanco = _context.Tarefas.Where(t => t.Id.Equals(id)).ToList();
            if (!tarefaDoBanco.Any())
                return NotFound("Não encontrada");
            return Ok(tarefaDoBanco);
        }


        [HttpPost("Cadastrar")]
        public IActionResult CriarTarefas(Tarefa tarefa)
        {

            var idPessoa = HttpContext.Session.GetString("email");
            if (idPessoa == null) return Unauthorized("não autorizado");

            var sessao = Request.Cookies["Idusado"];

            if (sessao != null) 
            {
                tarefa.IdPessoas = int.Parse(sessao);
            }
            _context.Add(tarefa);
            _context.SaveChanges();
            return Created("Teste", tarefa);
        }




        [HttpPut("Atualizar/{id}")]
        public IActionResult AtualizarTarefa(int id, Tarefa tarefa)
        {
            var idPessoa = HttpContext.Session.GetString("email");
            if (idPessoa == null) return Unauthorized("não autorizado");

            var TarefaDoBanco = _context.Tarefas.Find(id);

            if (TarefaDoBanco == null)
                return NotFound("Tarefa não encontrada.");

           TarefaDoBanco.Descricao = tarefa.Descricao;
           TarefaDoBanco.Statuss = tarefa.Statuss;
       
            _context.SaveChanges();

            return Ok("Atualizado");
        }


        [HttpDelete("Deletar/{id}")]
        public IActionResult DeletarPessoas(int id)
        {
            var idPessoa = HttpContext.Session.GetString("email");
            if (idPessoa == null) return Unauthorized("não autorizado");

            var tarefa = _context.Pessoas.Find(id);

            if (tarefa == null)
                return NotFound("Tarefa não encontarda");

            _context.Pessoas.Remove(tarefa);
            _context.SaveChanges();


            return Ok("Deletado");
        }
    }
}
