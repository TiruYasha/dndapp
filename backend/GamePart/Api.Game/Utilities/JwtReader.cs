using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace GamePart.Api.Utilities
{
    public class JwtReader : IJwtReader
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public JwtReader(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public Guid GetGameId()
        {
            httpContextAccessor.HttpContext.Request.Headers.TryGetValue("GameId", out var gameId);
            return new Guid(gameId);
        }

        public PlayerJwt GetPlayerDetails()
        {
            var userId = httpContextAccessor?.HttpContext?.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var playerId = httpContextAccessor?.HttpContext?.User?.Claims.FirstOrDefault(c => c.Type == "playerId")?.Value;
            var gameId = httpContextAccessor?.HttpContext?.User?.Claims.FirstOrDefault(c => c.Type == "game")?.Value;
            var gm = httpContextAccessor?.HttpContext?.User?.Claims.FirstOrDefault(c => c.Type == "gm")?.Value;

            var playerDetails = new PlayerJwt
            {
                GameId = new Guid(gameId),
                PlayerId = new Guid(playerId),
                IsGm = bool.Parse(gm),
                UserId = new Guid(userId)
            };

            return playerDetails;
        }

        public Guid GetUserId()
        {
            var id = httpContextAccessor?.HttpContext?.User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            return new Guid(id);
        }
    }
}
