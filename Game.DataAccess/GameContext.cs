using GamePart.Domain;
using GamePart.Domain.CanvasObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GamePart.Repository
{
    public class GameContext : DbContext
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Playground> Playgrounds { get; set; }
        public DbSet<Layer> Layers { get; set; }
        public DbSet<CanvasObject> CanvasObject { get; set; }
        public DbSet<Rectangle> Rectangles { get; set; }

        public GameContext(DbContextOptions<GameContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
