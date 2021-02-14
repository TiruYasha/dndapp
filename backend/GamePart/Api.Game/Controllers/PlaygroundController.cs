using Api.Game.Models;
using GamePart.Api.Models;
using GamePart.Api.Readers;
using GamePart.Api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Controllers
{
    [ApiController]
    [Route("playground")]
    public class PlaygroundController : ControllerBase
    {
        private readonly IPlaygroundReader _playgroundReader;
        private readonly IJwtReader _jwtReader;

        public PlaygroundController(IPlaygroundReader playgroundReader, IJwtReader jwtReader)
        {
            _playgroundReader = playgroundReader;
            _jwtReader = jwtReader;
        }

        [HttpGet]
        [Route("{playgroundId}")]
        [Authorize]
        public async Task<ActionResult<PlaygroundModel>> Get(Guid playgroundId)
        {
            var playground = await _playgroundReader.GetPlaygroundById(playgroundId);

            return Ok(playground);
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<PlaygroundListItem>>> GetList()
        {
            var gameId = _jwtReader.GetGameId();

            var playgrounds = await _playgroundReader.GetPlaygroundsForGame(gameId);

            return Ok(playgrounds);
        }

    }
}
