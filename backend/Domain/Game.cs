using System;
using System.Collections.Generic;
using System.Text;

namespace GamePart.Domain
{
    public class Game
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Playground> Playgrounds { get; set; }
        public ICollection<Player> Players { get; set; }
        //public List<Player> Players { get; set; }

        public Game()
        {
            Id = Guid.NewGuid();
            Playgrounds = new List<Playground>();
        }
    }
}
