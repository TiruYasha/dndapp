using System;
using System.Collections.Generic;
using System.Text;

namespace GamePart.Domain
{
    public class Player
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public bool IsGameMaster { get; set; }
        public Game Game { get; set; }
        public Guid GameId { get; set; }


        public Player()
        {
            Id = Guid.NewGuid();
        }
    }
}
