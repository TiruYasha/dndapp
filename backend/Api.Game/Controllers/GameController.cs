using GamePart.Api.Commands;
using GamePart.Api.Readers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Controllers
{
    [Route("games")]
    public class GameController : ControllerBase
    {
        private readonly IPlayerReader _playerReader;
        Guid ownerId = new Guid("f0a2c7d8-68cf-4c73-bca7-642784531005");
        //Guid playerId = new Guid("16a29c8f-2952-4b5d-9408-a765b2982239");

        public GameController(IPlayerReader playerReader)
        {
            _playerReader = playerReader;
        }

        [HttpPost]
        [Route("{gameId}/join")]
        public async Task<ActionResult<string>> JoinGame(Guid gameId, [FromBody] JoinGame model)
        {
            var playerId = await _playerReader.GetPlayerByAccountAndGame(model.PlayerId, gameId);
            var token = BuildToken(gameId, model, playerId);

            return Ok(new JoinGameResponse
            {
                Token = token
            });
        }

        private string BuildToken(Guid gameId, JoinGame model, Guid playerId)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, model.PlayerId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("game", gameId.ToString()),
                new Claim("gm", model.PlayerId == ownerId ? "true" : "false" ),
                new Claim("playerId", playerId.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("dfsafdsafdsafadsfkjadshfkjahdkjfhadskjdasfjkdshfkjdaslhfkasf"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken("tiruyasha",
                "tiruyasha",
                expires: DateTime.Now.AddDays(20),
                signingCredentials: creds,
                claims: claims);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
