using System;
using System.Collections.Generic;

namespace GamePart.Domain
{
    public class Playground
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsPlayerView { get; set; }
        public ICollection<Layer> Layers { get; set; }
        public Game Game { get; set; }
        public Guid GameId { get; set; }

        public Playground()
        {
            Id = Guid.NewGuid();
            Layers = new List<Layer>();
        }
    }
}
