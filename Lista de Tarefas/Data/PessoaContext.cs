
using Lista_de_Tarefas.Models;
using Microsoft.EntityFrameworkCore;

namespace Lista_de_Tarefas.Data

{
    public class PessoaContext : DbContext
    {
        public PessoaContext(DbContextOptions<PessoaContext> options) : base(options) { }

        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Tarefa> Tarefas { get; set; }
    }
}
