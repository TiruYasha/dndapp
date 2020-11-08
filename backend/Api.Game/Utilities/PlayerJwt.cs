using System;
using System.Collections.Generic;
using System.Text;

namespace GamePart.Api.Utilities
{
    public class PlayerJwt
    {
        public Guid GameId { get; set; }
        public Guid UserId { get; set; }
        public Guid PlayerId { get; set; }
        public bool IsGm { get; set; }

    }
}
