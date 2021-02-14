using Api.Game.Models;
using GamePart.Api.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GamePart.Api.Readers
{
    public interface IPlaygroundReader
    {
        Task<PlaygroundModel> GetPlaygroundById(Guid playgroundId);
        Task<List<PlaygroundListItem>> GetPlaygroundsForGame(Guid gameId);
    }
}
