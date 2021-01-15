using GamePart.Api.Readers;
using GamePart.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace GamePart.Read
{
    public class PlayerReader : IPlayerReader
    {
        private readonly GameContext _context;

        public PlayerReader(GameContext context)
        {
            _context = context;
        }

        public async Task<Guid> GetPlayerByAccountAndGame(Guid accountId, Guid gameId)
        {
            var player = await _context.Players.FirstOrDefaultAsync(p => p.GameId == gameId && p.UserId == accountId);

            return player.Id;
        }
    }
}
