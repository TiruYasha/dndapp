using System;
using System.Threading.Tasks;

namespace GamePart.Api.Readers
{
    public interface IPlayerReader
    {
        public Task<Guid> GetPlayerByAccountAndGame(Guid accountId, Guid gameId);
    }
}
